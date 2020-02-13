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
        <ApolloQuery
          :query="require('src/graphql/queries/users.gql')"
          :variables="{ page: page }"
        >
          <template v-slot="{ result: { data, error }, isLoading }">
            <template v-if="isLoading">
              <q-item v-for="i in 5" :key="i">
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-else>
              <q-item
                v-for="{ id, name, email, roles, created_at, active } in data
                  .users.data"
                :key="id"
              >
                <q-item-section avatar>
                  <q-avatar
                    class="text-white text-uppercase"
                    :color="active ? 'primary' : 'grey'"
                  >
                    {{ name.charAt(0) }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-uppercase"
                    >{{ name }}
                  </q-item-label>
                  <q-item-label caption>{{ email }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  {{ roles }}
                </q-item-section>
                <q-item-section side>
                  {{ created_at | memberSince }}
                </q-item-section>
              </q-item>
            </template>
          </template>
        </ApolloQuery>
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

import { date } from "quasar";

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
      },
      page: 1
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
        });
    },
    showDialogAssignRoles(id) {
      console.log("id:", id);
    }
  },
  filters: {
    memberSince(val) {
      if (!val) {
        return "";
      } else {
        var today = new Date();
        return "Member since " + date.getDateDiff(today, val, "days") + " days";
      }
    }
  }
};
</script>
