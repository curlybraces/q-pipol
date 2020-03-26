<template>
  <q-list separator>
    <div class="text-weight-bold q-pa-sm">
      Notifications
    </div>
    <q-separator />
    <template v-for="(notification, key) in notifications">
      <notification-item
        :notification="notification"
        :key="key"
      ></notification-item>
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
    ...mapState('notifications', ['notifications']),
    message() {
      return '';
    }
  },
  methods: {
    ...mapActions('notifications', ['fetchNotifications'])
  },
  created() {
    this.fetchNotifications();
  }
};
</script>
