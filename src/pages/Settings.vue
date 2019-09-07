<template>
  <q-page padding>
    <q-list bordered padding :dark="dark">
      <q-item-label header>User Controls</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Welcome Message</q-item-label>
          <q-item-label caption>
            Show welcome message when you open the app.
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="primary" :value="showWelcome" @input="setShowWelcome" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="changePasswordDialog = true">
        <q-item-section>
          <q-item-label>Change Password</q-item-label>
          <q-item-label caption>
            Change your password regularly to ensure security of your account.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="changeProfilePicture = true">
        <q-item-section>
          <q-item-label>Change Profile Picture</q-item-label>
          <q-item-label caption>
            Change your profile picture to appear more decent.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item-label header>General</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Dark Mode</q-item-label>
          <q-item-label caption>Switch to dark mode</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="primary" :value="dark" @input="setDark" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="changePasswordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="min-width: 400px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Change Password</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="newPassword"
            outlined
            type="password"
            label="Enter new password"
            dense
            class="q-py-md"
            :rules="[
              v => v.length >= 8 || 'Password must be at least 8 characters.'
            ]"
          >
            <template v-slot:append>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            label="Confirm"
            v-close-popup
            color="primary"
            @click="submitPassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PageSettings",
  data() {
    return {
      newPassword: "",
      changePasswordDialog: false,
      profilePicture: null,
      settings: {
        dark: false
      },
      rules: {
        password: [
          v => v.length >= 8 || "Password must be at least 8 characters."
        ]
      }
    };
  },
  computed: {
    ...mapState("settings",["dark","showWelcome"])
  },
  methods: {
    ...mapActions("settings", ["setDark","setShowWelcome"]),
    ...mapActions("auth", ["changePassword"]),
    submitPassword() {
      this.changePassword({ password: this.newPassword });
    }
  }
};
</script>

<style></style>
