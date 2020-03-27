<template>
  <q-page class="q-pt-lg">
    <page-title title="Admin"></page-title>

    <div class="q-mt-md q-pa-sm">
      <!-- Search Field -->
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Programs and Projects"
          v-model="searchField"
          clearable
          ref="searchBox"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <sort-menu></sort-menu>

      <!-- Loading -->
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" :color="avatarColor" />
      </q-inner-loading>

      <!-- User List -->
      <div class="col">
        <q-list separator bordered>
          <template v-for="(user, key) in usersSorted">
            <user :key="key" :user="user"></user>
          </template>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import User from '../components/Users/User';
import PageTitle from '../components/PageTitle';
import SortMenu from '../components/Users/SortMenu';

export default {
  components: { SortMenu, PageTitle, User },
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
    ...mapState('users', ['search', 'loading', 'sort', 'direction']),
    ...mapState('settings', ['dark']),
    ...mapGetters('users', ['users']),
    usersSorted() {
      const sort = this.sort;
      const direction = this.direction;
      const users = this.users;

      let usersSorted = {};

      if (!sort && !direction) {
        usersSorted = users;
      } else {
        let keysOrdered = Object.keys(this.users);

        keysOrdered.sort((a, b) => {
          let userAProp = '',
            userBProp = '';
          if (sort == 'name') {
            userAProp = users[a][sort].toLowerCase();
            userBProp = users[b][sort].toLowerCase();
          } else {
            userAProp = users[a][sort]
              ? users[a][sort]['name'].toLowerCase()
              : '';
            userBProp = users[b][sort]
              ? users[b][sort]['name'].toLowerCase()
              : '';
          }

          if (direction == 'asc') {
            if (userAProp > userBProp) return 1;
            else if (userAProp < userBProp) return -1;
            else return 0;
          } else {
            if (userAProp > userBProp) return -1;
            else if (userAProp < userBProp) return 1;
            else return 0;
          }
        });

        keysOrdered.forEach(key => {
          usersSorted[key] = users[key];
        });

        return usersSorted;
      }

      return usersSorted;
    },
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

    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.keyCode === 70) {
        e.preventDefault();
        this.$refs.searchBox.$el.focus();
      }
    });
  }
};
</script>
