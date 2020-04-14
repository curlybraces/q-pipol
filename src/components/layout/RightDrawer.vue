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
    <template v-if="!loading && user.unreadNotifications.length">
      <template v-for="notification in user.unreadNotifications">
        <notification-item
          :notification="notification"
          :key="notification.id"
        ></notification-item>
      </template>
    </template>
    <template v-else>
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
    ...mapState('auth', ['user', 'loading']),
    message() {
      return '';
    }
  }
};
</script>
