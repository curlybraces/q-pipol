<template>
  <div>
    <q-toolbar>
      <q-avatar>
        <q-img
          src="~assets/app-logo-128x128.png"
          @click="$router.push({ name: 'home' })"
          class="cursor-pointer"
        />
      </q-avatar>

      <q-toolbar-title class="text-white">
        I<span class="gt-md">nvestment </span>P<span class="gt-md"
          >rogramming and </span
        >M<span class="gt-md">anagement </span>S<span class="gt-md">ystem</span>
      </q-toolbar-title>
      <q-space />

      <q-btn flat round icon="shopping_cart" class="text-grey-6">
        <q-badge floating color="red">
          {{ selectedProjects.length }}
        </q-badge>
        <q-menu max-width="400px">
          <q-list>
            <q-item v-for="project in selectedProjects" :key="project.id">
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-item-label :lines="2">{{ project.title }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              class="text-center text-weight-bold"
              clickable
              to="/projects/endorse"
            >
              <q-item-section>
                <q-item-label>Endorse</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <notification-button></notification-button>

      <q-btn flat round>
        <user-avatar :src="getCurrentUser.avatar"></user-avatar>

        <dropdown-menu />
      </q-btn>
    </q-toolbar>

    <q-separator color="primary" class="header-separator" />

    <route-tabs></route-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropdownMenu from './Dropdown';
import RouteTabs from './RouteTabs';
import UserAvatar from './UserAvatar';
import NotificationButton from './NotificationButton';
import { GET_CURRENT_USER } from '@/graphql/queries';

export default {
  components: { RouteTabs, DropdownMenu, NotificationButton, UserAvatar },
  name: 'AppHeader',
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapState('projects', ['selectedProjects'])
  },
  apollo: {
    /**
     * Load data for unread notifications
     */
    getCurrentUser: {
      query: GET_CURRENT_USER
    }
  },
  data() {
    return {
      menu: false,
      notificationsDropdown: false,
      markingAllAsRead: false,
      getCurrentUser: {}
    };
  }
};
</script>
