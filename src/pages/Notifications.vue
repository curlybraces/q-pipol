<template>
  <q-page class="q-pt-lg">
    <page-title title="Notifications" />
    <div class="row q-pa-sm">
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50"></q-spinner-dots>
      </q-inner-loading>
      <q-list class="col" separator v-if="!loading">
        <template v-for="(notification, key) in notifications">
          <notification-item :notification="notification" :key="key"/>
        </template>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageTitle from '../components/PageTitle';
import NotificationItem from "../components/Notifications/NotificationItem";

export default {
  components: {NotificationItem, PageTitle },
  name: 'PageNotifications',
  computed: {
    ...mapState('notifications',['notifications','loading'])
  },
  methods: {
    ...mapActions('notifications',['fetchNotifications'])
  },
  mounted() {
    this.fetchNotifications();
  }
};
</script>
