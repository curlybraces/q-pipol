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
          <template v-for="user in users">
            <user v-model="selectedUsers" :key="user.id" :user="user"></user>
          </template>
        </template>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import User from "../components/Users/User";
import UserSkeleton from "../components/Users/UserSkeleton";

import { date } from "quasar";

import { ROLES } from "../data/roles";

import { mapState, mapActions } from "vuex";

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
    ...mapActions("users", ["fetchUsers"]),
    selectAllUsers() {
      //
    }
  },
  computed: {
    ...mapState("users", ["users"]),
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
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
