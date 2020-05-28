<template>
  <q-menu max-width="300px" :offset="[0, 15]">
    <div class="q-pa-md q-gutter-y-sm text-center">
      <user-avatar :src="user.avatar ? user.avatar : 'statics/placeholder.jpg' "></user-avatar>
      <q-item-label>{{ user ? user.name : 'Not logged in' }}</q-item-label>
      <q-item-label caption :class="dark ? 'text-grey-1' : 'text-black'">
        {{ user ? user.email : 'Not logged in' }}
      </q-item-label>
      <q-item-label>
        <q-badge>
          {{ user && user.role ? user.role.name : 'No role.' }}
        </q-badge>
      </q-item-label>
    </div>

    <q-separator />

    <q-list style="min-width: 280px" separator dense>
      <q-item clickable v-close-popup to="/Profile">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="tune" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Profile</q-item-section>
      </q-item>
      <q-item clickable v-close-popup to="/admin" v-if="isAdmin">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="lock" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Admin</q-item-section>
      </q-item>
      <q-item clickable v-close-popup to="/activity">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="work_outline" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Activity</q-item-section>
      </q-item>
      <q-item clickable v-close-popup to="/settings">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="settings" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup @click="showWarning">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="contact_support" />
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
      <q-item
        clickable
        v-close-popup
        @click="openURL('https://github.com/mlab817/q-pipol')"
        type="a"
        target="_blank"
      >
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="img:statics/github.svg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Report Issues
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="handleSignoutUser">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="exit_to_app" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { Dialog, openURL } from 'quasar';
import { mapState, mapActions, mapGetters } from 'vuex';
import UserAvatar from '@/ui/components/UserAvatar';
import { GET_CURRENT_USER } from 'src/graphql/queries';
import github from '@/statics/github.svg';

export default {
  components: { UserAvatar },
  name: 'DropdownMenu',
  computed: {
    ...mapState('settings', ['dark']),
    ...mapState('auth', ['loading']),
    ...mapGetters('auth', ['isAdmin'])
  },
  apollo: {
    getCurrentUser: {
      query: GET_CURRENT_USER,
      result({ data }) {
        const { getCurrentUser } = data;
        this.user = getCurrentUser;
      }
    }
  },
  data() {
    return {
      user: {},
      github: null
    };
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
    },
    openURL,
    showWarning() {
      this.$q.dialog({
        title: 'Coming soon',
        message: 'This feature is currently under development.',
        transitionShow: 'fade',
        transitionHide: 'fade'
      });
    }
  },
  created() {
    this.github = github;
  }
};
</script>
