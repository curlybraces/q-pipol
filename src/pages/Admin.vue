<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <q-card>
      <q-card-section>
        <q-toolbar>
          <q-avatar color="primary" icon="people" class="text-white">
          </q-avatar>
          <q-toolbar-title>
            Users
          </q-toolbar-title>
          <q-input
            outlined
            dense
            rounded
            class="col-6"
            placeholder="Search in users..."
            v-model="searchField"
          >
            <template v-slot:append>
              <q-icon name="search" class="cursor-pointer"></q-icon>
            </template>
          </q-input>
        </q-toolbar>
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

import { mapState, mapActions, mapGetters } from "vuex";

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
    ...mapActions("users", ["fetchUsers", "setSearch"]),
    selectAllUsers() {
      //
    }
  },
  computed: {
    ...mapState("users", ["search"]),
    ...mapGetters("users", ["users"]),
    allUsersSelected: {
      get() {
        return false;
      },
      set(val) {
        console.log(val);
      }
    },
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
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
