<template>
  <q-list separator>
    <q-item-label header class="text-weight-bolder text-black text-h6"
      >Notifications</q-item-label
    >
    <q-item
      v-for="(notification, key) in notifications"
      :key="key"
    >
      <q-item-section avatar>
        <q-avatar color="primary" class="text-white">{{
          notification.data.from.charAt(0)
        }}</q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bolder text-uppercase">{{
          notification.data.from
        }}</q-item-label>
        <q-item-label lines="2">{{ notification.data.title }}</q-item-label>
        <q-item-label caption>{{ notification.created_at }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RightDrawer',
  data() {
    return {
      // notifications: []
    };
  },
  computed: {
    ...mapState('notifications',['notifications'])
  },
  methods: {
    ...mapActions('notifications',['fetchNotifications'])
  },
  created() {
    this.fetchNotifications();
  }
};
</script>
