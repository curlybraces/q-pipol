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
                  round
                  :icon="active ? 'block' : 'how_to_reg'"
                  flat
                  :color="active ? 'red' : 'green'"
                  @click.stop="showActivateDialog(id, active)"
                >
                  <q-tooltip>
                    {{ active ? "Deactivate" : "Activate" }}
                  </q-tooltip>
                </q-btn>
                <q-btn
                  round
                  icon="settings"
                  flat
                  color="grey-7"
                  @click="showDialogAssignRoles(id)"
                />
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
          @input="loadUsers"
        />
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
            type="checkbox"
            v-model="selectedRoles"
            :options="ROLES"
          ></q-option-group>
          <q-btn
            type="submit"
            class="full-width"
            color="primary"
            label="ADD USER"
            @click="addUser"
          />
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import TextInput from "../components/FormInputs/TextInput";
import { createUser } from "../functions/function-create-user";
import { loadUsers } from "../functions/function-load-users";
import { showErrorMessage } from "../functions/function-show-error-message";
import { activateUser } from "../functions/function-activate-user";

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
          title: active ? "Deactivate user" : "Activate user",
          message: "You are about to toggle activation status of user #" + id,
          persistent: true,
          cancel: true,
          transitionShow: "fade",
          transitionHide: "fade"
        })
        .onOk(() => {
          this.loading = true;
          activateUser({
            id: id,
            active: !active
          }).then(() => {
            this.loadUsers(this.currentPage);
            this.loading = false;
          });
        });
    },
    showDialogAssignRoles(id) {
      console.log("id:", id);
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
    },
    loadUsers(page) {
      this.loading = true;
      loadUsers(page).then(res => {
        if (res.errors) {
          showErrorMessage(res.errors);
        } else {
          this.users = res.users.data;
        }
        this.loading = false;
      });
    }
  },
  created() {
    this.loadUsers(1);
  }
};
</script>
