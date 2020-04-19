<template>
  <div>
    <q-toolbar>
      <img
        src="~assets/app-logo-128x128.png"
        height="35px;"
        @click="$router.push({ name: 'landing' })"
        class="cursor-pointer"
      />

      <q-toolbar-title class="text-white">
        I<span class="gt-md">nvestment </span>P<span class="gt-md"
          >rogramming and </span
        >M<span class="gt-md">anagement </span>S<span class="gt-md">ystem</span>
      </q-toolbar-title>
      <q-space />

      <q-btn flat round icon="notifications" class="q-mr-md text-grey-6">
        <q-badge color="red" floating v-if="unreadNotifications.length">
          {{ unreadNotifications.length }}
        </q-badge>
        <template v-if="unreadNotifications.length">
          <q-menu :offset="[0, 15]">
            <q-list separator>
              <q-item-label header class="text-weight-bolder"
                >Notifications</q-item-label
              >

              <notification-item
                v-for="notification in unreadNotifications"
                :key="notification.id"
                :notification="notification"
              >
              </notification-item>
            </q-list>
          </q-menu>
        </template>
      </q-btn>

      <q-btn
        :class="dark ? 'bg-purple-4' : 'bg-primary'"
        text-color="white"
        flat
        round
        size="sm"
      >
        <q-avatar size="42px">
          <img :src="imageUrl" />
        </q-avatar>
        <dropdown-menu />
      </q-btn>
    </q-toolbar>

    <q-separator
      :color="dark ? 'purple-2' : 'primary'"
      class="header-separator"
    />

    <route-tabs></route-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropdownMenu from './Dropdown';
import NotificationItem from '../Notifications/NotificationItem';
import RouteTabs from './RouteTabs';

export default {
  components: { RouteTabs, DropdownMenu, NotificationItem },
  name: 'AppHeader',
  computed: {
    ...mapState('settings', ['dark']),
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['imageUrl', 'loading', 'unreadNotifications'])
  },
  data() {
    return {
      menu: false,
      notificationsDropdown: false
    };
  }
};
</script>
