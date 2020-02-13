<template>
  <q-menu max-width="300px">
    <q-list style="min-width: 280px">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img
              :src="
                image
                  ? 'statics/agency_logos/' + image
                  : 'statics/avatar-placeholder.png'
              "
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ name }}</q-item-label>
          <q-item-label caption>{{ email }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup to="/account">
        <q-item-section>Account</q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section>History</q-item-section>
      </q-item>
      <q-item clickable v-close-popup to="/settings">
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>Help &amp; Feedback</q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="showLogout">
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { Dialog } from "quasar";
import { mapState, mapActions } from "vuex";

export default {
  name: "DropdownMenu",
  computed: {
    ...mapState("auth", ["email", "name", "image"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    showLogout() {
      Dialog.create({
        title: "Logout",
        message: "Are you sure you want to log out?",
        cancel: true,
        transitionShow: "fade",
        transitionHide: "fade"
      }).onOk(() => this.logoutUser());
    }
  }
};
</script>
