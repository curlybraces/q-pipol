<template>
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

    <header-search class="q-mr-md"></header-search>

    <notification-button></notification-button>

    <q-btn flat round>
      <user-avatar :src="getCurrentUser.avatar"></user-avatar>

      <dropdown-menu />
    </q-btn>
  </q-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import DropdownMenu from './Dropdown';
import UserAvatar from './UserAvatar';
import NotificationButton from './NotificationButton';
import { GET_CURRENT_USER } from '@/graphql/queries';
import HeaderSearch from './HeaderSearch';

export default {
  components: {
    DropdownMenu,
    NotificationButton,
    UserAvatar,
    HeaderSearch
  },
  name: 'AppHeader',
  computed: {
    ...mapGetters('auth', ['user']),
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    }
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
