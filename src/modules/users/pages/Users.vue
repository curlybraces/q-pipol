<template>
  <page-container>
    <page-title title="Manage Users"></page-title>

    <!-- Search Field -->
    <search-component v-model="searchField" placeholder="Filter Users"></search-component>

    <div class="q-pa-sm">
      <!-- Loading -->
      <template v-if="$apollo.loading">
        <q-inner-loading :showing="$apollo.loading">
          <q-spinner-tail size="50px" color="primary" />
        </q-inner-loading>
      </template>

      <template v-else>
        <!-- User List -->
        <template v-if="!groupedUsers">
          <no-item message="No users to show"></no-item>
        </template>
        <template v-else>
          <div class="col">
            <template v-for="(users, key) in groupedUsers">
              <q-list separator bordered :key="key" class="q-mt-md">
                <q-item-label
                  header
                  class="text-uppercase bg-primary text-white text-weight-bolder text-center"
                  >{{ key + 's' }}</q-item-label
                >
                <template v-for="user in users">
                  <user :key="user.id" :user="user"></user>
                </template>
              </q-list>
            </template>
          </div>
        </template>
      </template>
    </div>
  </page-container>
</template>

<script>
import { mapState } from 'vuex'
import { ALL_USERS } from '../../../graphql/queries'
const User = () => import('../components/User')
const PageTitle = () => import('../../ui/page/PageTitle')
const PageContainer = () =>import('../../ui/page/PageContainer')
const SearchComponent = () => import('../../shared/components/SearchComponent')
import NoItem from '../../shared/components/NoItem'

export default {
  components: { PageContainer, PageTitle, User, SearchComponent, NoItem },
  name: 'PageUsers',
  apollo: {
    users: {
      query: ALL_USERS
    }
  },
  data() {
    return {
      users: [],
      assignRoleDialog: false,
      searchField: ''
    };
  },
  computed: {
    ...mapState('settings', ['dark']),
    filteredUsers() {
      let filteredUsers = [];

      const users = this.users;

      const search = this.searchField.trim().toLowerCase();

      if (search) {
        console.log(search);

        filteredUsers = users.filter(user =>
          user.name.toLowerCase().includes(search)
        );

        return filteredUsers;
      }

      filteredUsers = users;

      return filteredUsers;
    },
    groupedUsers() {
      let groupedUsers = [];
      const users = this.filteredUsers;

      groupedUsers = users.reduce((acc, val) => {
        const roleName = val.role ? val.role.name : 'No Role';
        (acc[roleName] = acc[roleName] || []).push(val);
        return acc;
      }, {});

      return groupedUsers;

      // return lodash.groupBy(this.users,'role.name')
    },
    avatarColor() {
      return this.dark ? 'pink-13' : 'primary';
    }
  },
  methods: {},
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.keyCode === 70) {
        e.preventDefault();
        this.$refs.searchBox.$el.focus();
      }
    });
  }
};
</script>
