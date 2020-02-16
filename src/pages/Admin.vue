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
              <q-item v-for="user in data.users.data" :key="user.id">
                <q-item-section avatar>
                  <q-checkbox
                    v-model="selectedUsers"
                    :val="user.id"
                  ></q-checkbox>
                </q-item-section>
                <q-item-section avatar>
                  <q-avatar
                    class="text-white text-uppercase"
                    :color="user.active ? 'primary' : 'grey'"
                  >
                    {{ user.name.charAt(0) }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-uppercase"
                    >{{ user.name }}
                  </q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-badge v-for="role in user.roles" :key="role.id">
                      {{ role.name }}
                    </q-badge>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    round
                    flat
                    dense
                    icon="verified_user"
                    color="green"
                    @click="activateUser(user.id,user.active)"
                    v-if="!user.active"
                  >
                    <q-tooltip>Activate User</q-tooltip>
                  </q-btn>
                  <q-btn
                    round
                    flat
                    dense
                    icon="person_add_disabled"
                    color="red"
                    @click="deactivateUser(user.id)"
                    v-else
                  >
                    <q-tooltip>Deactivate User</q-tooltip>
                  </q-btn>
                  <q-btn
                    round
                    flat
                    dense
                    icon="settings"
                    @click="assignRoles(user.id)"
                  >
                    <q-tooltip>Assign Roles</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </template>
          </template>
        </ApolloQuery>
      </q-list>
      <q-card-actions align="right">
        <q-pagination
          v-model="currentPage"
          :max="lastPage"
          :max-pages="5"
          boundary-links
          boundary-numbers
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import { ACTIVATE_USER } from "../constants/graphql.js";

import { date } from "quasar";

import { ROLES } from "../data/roles";

export default {
  components: { PageBreadcrumbs },
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
      selectedUsers: [],
      ROLES_OPTIONS: ROLES,
      users: [],
      loading: false,
      currentPage: 1,
      lastPage: 1,
      total: null,
      assignRoleDialog: false,
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
    activateUser(id, active) {
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
          this.$apollo.mutate({
            mutation: ACTIVATE_USER,
            variables: {
              id: id,
              active: !active
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
        });
    },
    selectAllUsers() {
      //
    }
  },
  computed: {
    allUsersSelected: {
      get() {
        return false;
      },
      set(val) {
        console.log(val);
      }
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
