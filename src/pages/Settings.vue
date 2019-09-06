<template>
  <q-page padding>
    <q-list bordered padding>
      <q-item-label header>User Controls</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Content filtering</q-item-label>
          <q-item-label caption>
            Set the content filtering level to restrict apps that can be
            downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Welcome Message</q-item-label>
          <q-item-label caption>
            Show welcome message when you open the app.
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle
            color="primary"
            v-model="welcomeMessage"
            />
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

      <q-separator spaced />
      <q-item-label header>General</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox />
        </q-item-section>

        <q-item-section>
          <q-item-label>Notifications</q-item-label>
          <q-item-label caption>
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Notifications</q-item-label>
          <q-item-label caption>
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-toggle color="red" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Dark Mode</q-item-label>
          <q-item-label caption>Switch to dark mode</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="primary" v-model="settings.dark" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="changePasswordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale">
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
              <q-icon name="lock"/>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            v-close-popup />
          <q-btn
            label="Confirm"
            v-close-popup
            color="primary"
            @click="submitPassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { LocalStorage } from "quasar";

export default {
  name: "PageSettings",
  data() {
    return {
      newPassword: "",
      changePasswordDialog: false,
      settings: {
        dark: false,
      },
      rules: {
        password: [ v => v.length >= 8 || "Password must be at least 8 characters."],
      }
    };
  },
  computed: {
    welcomeMessage: {
      get() {
        return LocalStorage.getItem("dontShowAgain");
      },
      set(val) {
        LocalStorage.set("dontShowAgain",val);
      }
    }
  },
  methods: {
    ...mapActions("auth", ["changePassword"]),
    submitPassword() {
      this.changePassword({ password: this.newPassword });
    }
  }
};
</script>

<style></style>
