<template>
  <q-list separator>
    <div class="row q-pa-sm justify-between">
      <div class="text-weight-bold ">Notifications</div>
      <q-btn
        class="text-capitalize"
        label="See All"
        dense
        flat
        size="sm"
        to="/notifications"
      />
    </div>
    <q-separator />
    <template v-for="(notification, key) in unreadNotifications">
      <notification-item
        :notification="notification"
        :key="key"
      ></notification-item>
    </template>
    <template v-if="!Object.keys(unreadNotifications).length">
      <div class="q-pa-sm">
        No notifications.
      </div>
    </template>
  </q-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NotificationItem from '../Notifications/NotificationItem';

export default {
  name: 'RightDrawer',
  components: { NotificationItem },
  computed: {
    ...mapState('notifications', ['unreadNotifications']),
    message() {
      return '';
    }
  },
  methods: {
    ...mapActions('notifications', ['fetchUnreadNotifications'])
  },
  created() {
    this.fetchUnreadNotifications();
  }
};
</script>
