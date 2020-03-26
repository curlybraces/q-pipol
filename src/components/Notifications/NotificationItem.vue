<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="primary" class="text-white">
        {{
        notification.data.from.charAt(0)
        }}
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
  </q-item>
</template>

<script>
import moment from 'moment';

export default {
  name: 'NotificationItem',
  props: ['notification'],
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
  filters: {
    dateDiff(val) {
      if (val) {
        return moment(val).calendar();
      }
      return '';
    }
  }
}
</script>
