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

      <q-btn flat round icon="notifications" class="q-mr-md text-grey-6">
        <q-badge color="red" floating v-if="me.unreadNotifications.length">
          {{ me.unreadNotifications.length }}
        </q-badge>
        <template v-if="me.unreadNotifications.length">
          <q-menu :offset="[0, 15]">
            <q-item dense class="q-pa-none">
              <q-item-section>
                <q-item-label header class="text-weight-bolder"
                  >Notifications</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  label="Mark all as read"
                  dense
                  color="primary"
                  @click="markAllAsRead"
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-list separator>
              <notification-item
                v-for="notification in me.unreadNotifications"
                :key="notification.id"
                :notification="notification"
              />
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
import { mapState, mapGetters, mapActions } from 'vuex';
import DropdownMenu from './Dropdown';
import NotificationItem from '../../notifications/components/NotificationItem';
import RouteTabs from './RouteTabs';
import { FETCH_UNREAD_NOTIFICATIONS_QUERY } from '../../../graphql/queries';

export default {
  components: { RouteTabs, DropdownMenu, NotificationItem },
  name: 'AppHeader',
  computed: {
    ...mapState('settings', ['dark']),
    ...mapGetters('auth', ['imageUrl', 'user'])
  },
  apollo: {
    /**
     * Load data for notifications
     */
    me: {
      query: FETCH_UNREAD_NOTIFICATIONS_QUERY
    }
  },
  data() {
    return {
      menu: false,
      notificationsDropdown: false,
      markingAllAsRead: false,
      me: {
        unreadNotifications: [] // placeholder to ensure that the variable is defined while apollo is being called
      }
    };
  },
  methods: {
    ...mapActions('notifications', ['markAllAsRead'])
  }
};
</script>
