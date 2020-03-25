<template>
  <q-page>
    <q-toolbar class="q-mt-lg">
      <q-item-label header class="q-pl-none">Admin</q-item-label>
    </q-toolbar>

    <div class="q-mt-md q-pa-sm">
      <!-- Search Field -->
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Programs and Projects"
          v-model="searchField"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Loading -->
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" :color="avatarColor" />
      </q-inner-loading>

      <!-- User List -->
      <div class="row item-start q-col-gutter-sm">
        <template v-for="user in users">
          <user v-model="selectedUsers" :key="user.id" :user="user"></user>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import User from '../components/Users/User';

export default {
  components: { User },
  name: 'PageAdmin',
  data() {
    return {
      selectedUsers: [],
      assignRoleDialog: false,
      selectedRoles: []
    };
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'setSearch'])
  },
  computed: {
    ...mapState('users', ['search', 'loading']),
    ...mapState('settings', ['dark']),
    ...mapGetters('users', ['users']),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    },
    avatarColor() {
      return this.dark ? 'pink-13' : 'primary';
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
