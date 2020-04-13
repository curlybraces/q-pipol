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
    <template v-for="notification in user.unreadNotifications">
      <notification-item
        :notification="notification"
        :key="notification.id"
      ></notification-item>
    </template>
    <template v-if="!user.unreadNotifications.length">
      <div class="q-pa-sm">
        No notifications.
      </div>
    </template>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import NotificationItem from '../Notifications/NotificationItem';

export default {
  name: 'RightDrawer',
  components: { NotificationItem },
  computed: {
    ...mapState('auth', ['user']),
    message() {
      return '';
    }
  }
};
</script>
