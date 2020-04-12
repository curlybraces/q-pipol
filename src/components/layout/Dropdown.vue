<template>
  <q-menu max-width="300px" :offset="[0, 15]" v-if="!loading">
    <div class="q-pa-md q-gutter-y-sm text-center">
      <q-avatar>
        <img :src="imageUrl" />
      </q-avatar>
      <q-item-label>{{ user.name }}</q-item-label>
      <q-item-label caption :class="dark ? 'text-grey-1' : 'text-black'">{{
        user.email
      }}</q-item-label>
      <q-item-label
        ><q-badge :color="iconColor">{{
          user.role ? user.role.name : 'No role.'
        }}</q-badge></q-item-label
      >
    </div>
    <q-separator />
    <q-list style="min-width: 280px" separator dense>
      <q-item clickable v-close-popup to="/account">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="tune" :color="iconColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Account Settings</q-item-section>
      </q-item>
      <q-item
        clickable
        v-close-popup
        to="/admin"
        v-if="
          user.role &&
            (user.role.name == 'admin' || user.role.name == 'superadmin')
        "
      >
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="lock" :color="iconColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Admin</q-item-section>
      </q-item>
      <q-item clickable v-close-popup to="/activity">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="work_outline" :color="iconColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Activity</q-item-section>
      </q-item>
      <q-item clickable v-close-popup to="/settings">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="settings" :color="iconColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="contact_support" :color="iconColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Help &amp; Feedback
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon color="red" name="priority_high" />
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="handleSignoutUser">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="exit_to_app" :color="iconColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { Dialog } from 'quasar';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'DropdownMenu',
  computed: {
    ...mapState('settings', ['dark']),
    ...mapState('auth', ['loading']),
    ...mapGetters('auth', ['imageUrl', 'user']),
    iconColor() {
      return this.dark ? 'purple-11' : 'primary';
    }
  },
  methods: {
    ...mapActions('auth', ['signoutUser']),
    handleSignoutUser() {
      Dialog.create({
        title: 'Logout',
        message: 'Are you sure you want to log out?',
        cancel: true,
        transitionShow: 'fade',
        transitionHide: 'fade'
      }).onOk(() => this.signoutUser());
    }
  }
};
</script>
