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
        <template v-if="!filteredUsers">
          <no-item message="No users to show"></no-item>
        </template>
        <template v-else>
          <div class="col">
            <q-list separator bordered>
              <template v-for="(user, index) in filteredUsers">
                <user :key="index" :user="user"></user>
              </template> 
            </q-list>
          </div>
        </template>
      </template>
    </div>
  </page-container>
</template>

<script>
import { mapState } from 'vuex'
import { ALL_USERS } from '@/graphql/queries'
const User = () => import('../components/User')
const PageTitle = () => import('@/modules/ui/page/PageTitle')
const PageContainer = () =>import('@/modules/ui/page/PageContainer')
const SearchComponent = () => import('@/modules/shared/components/SearchComponent')
import NoItem from '@/modules/shared/components/NoItem'

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
          user.name.toLowerCase().includes(search) || (user.role.name.toLowerCase() === (search))
        );

        return filteredUsers;
      }

      filteredUsers = users;

      return filteredUsers;
    },
    avatarColor() {
      return this.dark ? 'pink-13' : 'primary';
    }
  }
};
</script>
