<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="row">
      <q-card>Users</q-card>
      <q-card>Directory</q-card>
    </div>

    <q-card>
      <q-card-section>
        <div class="row align-center">
          Manage Users
          <q-space />
        </div>
      </q-card-section>
      <q-separator />
      <q-list separator>
        <template v-if="$apollo.loading">
          <user-skeleton></user-skeleton>
        </template>
        <template v-else>
          <template v-for="user in users.data">
            <user v-model="selectedUsers" :key="user.id" :user="user"></user>
          </template>
        </template>
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
import User from "../components/Users/User";
import UserSkeleton from "../components/Users/UserSkeleton";
import { ALL_USERS, ACTIVATE_USER } from "../constants/graphql.js";

import { date } from "quasar";

import { ROLES } from "../data/roles";

export default {
  components: { PageBreadcrumbs, User, UserSkeleton },
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
  apollo: {
    users: {
      query: ALL_USERS,
      variables() {
        return {
          page: this.page
        };
      }
    }
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
          this.$apollo
            .mutate({
              mutation: ACTIVATE_USER,
              variables: {
                id: id,
                active: !active
              },
              update: (store, { data: { activateUser } }) => {
                if (activateUser.status == "SUCCESS") {
                  const data = store.readQuery({
                    query: ALL_USERS,
                    variables: {
                      page: this.page
                    }
                  });

                  const user = data.users.data.find(user => user.id === id);

                  user.active = true;

                  store.writeQuery({
                    query: ALL_USERS,
                    data
                  });
                }
              },
              optimisticResponse: {
                __typename: "Mutation",
                activateUser: {
                  __typename: "ActivatePayload",
                  user: {
                    id: id,
                    active: true,
                    __typename: "User"
                  },
                  status: "SUCCESS",
                  message: "Successfully activated user"
                }
              }
            })
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
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
