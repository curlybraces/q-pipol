<template>
  <q-card>
    <q-card-section>
      <q-list separator>
        <q-item class="bg-primary text-white">
          <q-item-section avatar>
            <q-icon name="notifications" color="white" />
          </q-item-section>
          <q-item-section>
            <div class="text-h6">Notifications</div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="close"
              flat
              round
              dense
              class="text-white"
              @click="$emit('close')"
            />
          </q-item-section>
        </q-item>

        <!-- Notifications go here -->
        <q-item v-if="notifications.length == 0">
          No notifications.
        </q-item>

        <q-item v-else clickable v-for="notif in notifications" :key="notif.id">
          <q-item-section avatar>
            <q-avatar color="white">
              <img src="statics/app-logo-128x128.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label overline>{{ notif.type | notifType }}</q-item-label>
            <q-item-label lines="3">{{ notif.data.message }}</q-item-label>
            <q-item-label caption>
              <q-icon name="access_time" />
              {{ notif.created_at | dateDiff }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from "quasar";
import { mapState } from "vuex";

export default {
  name: "NotificationsModal",
  computed: {
    ...mapState("notifications", ["notifications"])
  },
  filters: {
    dateDiff(val) {
      const newDate = new Date();
      let notifDate = new Date(val);
      return date.getDateDiff(newDate, notifDate, "hours") + " hrs ago";
    },
    notifType(type) {
      if (type == "App\\Notifications\\ProjectCreated") {
        return "Project Created";
      } else if (type == "App\\Notifications\\ProjectUpdated") {
        return "Project Updated";
      } else if (type == "App\\Notifications\\ProjectDeleted") {
        return "Project Deleted";
      } else if (type == "App\\Notifications\\ProjectFinalized") {
        return "Project Finalized";
      } else {
        return "Others";
      }
    }
  }
};
</script>

<style scoped>
.q-card__section {
  padding: 0px !important;
}
</style>
