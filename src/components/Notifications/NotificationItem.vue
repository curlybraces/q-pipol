<template>
  <q-item :class="notification.read_at ? '' : 'bg-light-blue-1'">
    <q-item-section avatar>
      <q-avatar color="primary" class="text-white">
        {{ notification.data.from ? notification.data.from.charAt(0) : '' }}
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="2" class="text-subtitle">
        {{ content }}
      </q-item-label>
      <q-item-label caption>
        {{ notification.created_at | dateDiff }}
      </q-item-label>
    </q-item-section>
    <q-item-section top side>
      <template v-if="!notification.read_at">
        <q-btn
          icon="check"
          dense
          flat
          round
          @click="markAsReadNotification(notification.id)"
          :loading="loading"
        >
        </q-btn>
      </template>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'NotificationItem',
  props: ['notification'],
  data() {
    return {
      loading: false
    };
  },
  computed: {
    content() {
      const { type, data } = this.$props.notification;

      if (type === 'App\\Notifications\\ProjectCreated') {
        return data.from + ' created a project: "' + data.title + '"';
      } else if (type === 'App\\Notifications\\ProjectUpdated') {
        return data.from + ' updated a project: "' + data.title + '"';
      } else if (type === 'App\\Notifications\\ProjectDeleted') {
        return data.from + ' deleted a project: "' + data.title + '"';
      } else {
        return data.message;
      }
    }
  },
  methods: {
    ...mapActions('notifications', ['markAsRead']),
    markAsReadNotification(id) {
      this.markAsRead({
        id: id
      });
    }
  },
  filters: {
    dateDiff(val) {
      if (val) {
        return moment(val).calendar();
      }
      return '';
    }
  }
};
</script>
