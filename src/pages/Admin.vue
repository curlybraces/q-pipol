<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card>
      <q-card-section>
        <div class="row align-center">
          Manage Users
          <q-space />
          <q-btn
            outline
            label="Add User"
            color="primary"
            @click="addUserDialog = true"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-list separator>
        <q-item v-if="loading">
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="25px" color="primary" />
          </q-inner-loading>
        </q-item>
        <template v-else>
          <q-item v-for="{ id, name, email, active } in users" :key="id">
            <q-item-section avatar>
              <q-avatar
                class="text-white text-uppercase"
                :color="active ? 'primary' : 'grey'"
              >
                {{ name.charAt(0) }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-uppercase">{{ name }} </q-item-label>
              <q-item-label caption>{{ email }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row q-gutter-sm">
                <q-btn
                  :label="active ? 'Deactivate' : 'Activate'"
                  :color="active ? 'red-9' : 'primary'"
                  @click.stop="showActivateDialog(id, active)"
                />
                <q-btn label="Assign Roles" color="blue" />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          v-model="currentPage"
          :max="lastPage"
          :input="true"
          @input="loadPage"
        ></q-pagination>
      </q-card-actions>
    </q-card>

    <q-dialog
      v-model="addUserDialog"
      transition-hide="fade"
      transition-show="fade"
      persistent
    >
      <q-card class="q-pa-sm" style="width: 360px;">
        <div class="row">
          <div class="text-uppercase text-h6">ADD USER</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
        <q-separator />
        <q-form ref="addUser" class="q-mt-sm q-gutter-y-sm" @submit="addUser">
          <text-input
            v-model="name"
            label="Full Name"
            lazy-rules
            :rules="rules.required"
          />
          <text-input
            v-model="email"
            label="Email"
            lazy-rules
            :rules="rules.required"
          />
          <text-input
            v-model="password"
            label="Password"
            lazy-rules
            :rules="rules.required"
          />
          <q-item-label>Roles</q-item-label>
          <q-option-group
            v-model="selectedRoles"
            type="checkbox"
            :options="ROLES"
          ></q-option-group>
          <q-btn
            class="full-width"
            color="primary"
            label="ADD USER"
            @click="addUser"
            type="submit"
          />
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { axiosInstance } from "boot/axios";
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import TextInput from "../components/FormInputs/TextInput";
import { createUser } from "../functions/function-create-user";

import { ROLES } from "../data/roles";

export default {
  components: { PageBreadcrumbs, TextInput },
  name: "PageAdmin",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Admin"
        }
      ],
      ROLES,
      users: null,
      loading: false,
      currentPage: 1,
      lastPage: 1,
      total: null,
      addUserDialog: false,
      name: "",
      email: "",
      password: "password",
      selectedRoles: [],
      rules: {
        required: [val => (val && val.length > 0) || "Please type something"]
      }
    };
  },
  methods: {
    showActivateDialog(id, active) {
      this.$q
        .dialog({
          title: "Toggle User Activation",
          message: "You are about to toggle activation status of user #" + id,
          persistent: true,
          cancel: true,
          transitionShow: "fade",
          transitionHide: "fade"
        })
        .onOk(() => {
          // Todo: call user activation here
          axiosInstance
            .post("graphql", {
              query: `mutation activateUser(
                $id:ID!
                $active:Boolean!) {
                activateUser(
                  id: $id
                  active: $active
                  )
              }`,
              variables: {
                id: id,
                active: !active
              }
            })
            .then(() => {
              this.loadUsers({ page: this.currentPage });
            });
        });
    },
    loadUsers({ page = 1 }) {
      this.loading = true;

      axiosInstance
        .post("graphql", {
          query: `query users($page:Int!){
            users (page:$page) {
              data {
                id
                name
                email
                active
              }
              paginatorInfo {
                currentPage
                lastPage
                total
              }
            }
          }`,
          variables: {
            page: page
          }
        })
        .then(res => {
          this.users = res.data.data.users.data;
          const {
            currentPage,
            lastPage,
            total
          } = res.data.data.users.paginatorInfo;
          this.currentPage = currentPage;
          this.lastPage = lastPage;
          this.total = total;
          this.loading = false;
        });
    },
    loadPage() {
      this.loadUsers({ page: this.currentPage });
    },
    addUser() {
      this.$refs.addUser.validate().then(success => {
        if (success) {
          createUser({
            name: this.name,
            password: this.password,
            email: this.email,
            selectedRoles: this.selectedRoles
          });
        }
      });
    }
  },
  created() {
    this.loadUsers({ page: 1 });
  }
};
</script>
