<template>
  <q-menu max-width="300px">
    <q-list style="min-width: 280px">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img
              :src="photoURL ? photoURL : 'statics/avatar-placeholder.png'"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ currentUserDisplayName }}</q-item-label>
          <q-item-label caption>{{ currentUserEmail }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup to="/user">
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
import { mapState, mapActions } from "vuex";
import { Dialog } from "quasar";

export default {
  name: "DropdownMenu",
  computed: {
    ...mapState("auth", [
      "loggedIn",
      "currentUserEmail",
      "photoURL",
      "signInProvider",
      "currentUserDisplayName"
    ])
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
