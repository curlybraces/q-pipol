<template>
  <q-page>
    <div class="row q-pa-sm q-col-gutter-x-md q-gutter-y-md">
      <template v-for="(link, index) in links">
        <div class="col-3" :key="index">
          <q-card square fit class="no-margin full-height">
            <q-item clickable :to="link.url" v-ripple>
              <q-item-section class="gt-sm">
                <q-item-label caption>{{ link.label }}</q-item-label>
              </q-item-section>
              <q-separator class="gt-sm" vertical />
              <q-item-section side top>
                <q-icon :name="link.icon" size="xl" :color="link.color" />
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </div>
    <q-dialog v-model="needEmailValidation">
      <q-card square class="q-px-sm" style="max-width: 480px;">
				<div class="row justify-end q-py-sm">
					<q-icon name="close" flat dense class="cursor-pointer" @click="hideReminder"></q-icon>
				</div>
        <div class="col q-gutter-md text-center q-py-lg">
          <div class="text-primary text-h5 text-weight-bold">
            Please verify your email
          </div>
          <div class="text-subtitle1">
            You're almost there! We sent an email to<br /><span
              class="text-weight-bolder"
              >{{ email }}</span
            >
          </div>
          <div class="text-subtitle2">
            Just click on the link in that email to complete your registration.
            If you don't see it, you may need to
            <span class="text-weight-bold">check your spam </span>folder.
          </div>
          <div class="text-subtitle1">Still can't find the email?</div>
          <q-btn color="primary" push>Resend Email</q-btn>
          <div class="text-subtitle1">Need help? Contact Us</div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('auth', ['email','showValidateEmailReminder']),
		needEmailValidation() {
			return this.showValidateEmailReminder;
		}
  },
	methods: {
		...mapActions('auth',['hideValidateEmailReminder']),
		hideReminder() {
			this.hideValidateEmailReminder(false);
		}
	},
  data() {
    return {
      links: [
        {
          label: 'View Projects',
          icon: 'list',
          url: '/pip',
          color: 'blue'
        },
        {
          label: 'Add Project',
          icon: 'playlist_add',
          url: '/pip/new',
          color: 'green'
        },
        {
          label: 'Deleted Projects',
          icon: 'delete',
          url: '/trash',
          color: 'red'
        },
        {
          label: 'Reports',
          icon: 'bubble_chart',
          url: '/reports',
          color: 'yellow'
        },
        {
          label: 'Resources',
          icon: 'folder_open',
          url: '/resources',
          color: 'amber'
        },
        {
          label: 'Directory',
          icon: 'call',
          url: '/directory',
          color: 'black'
        }
      ]
    };
  }
};
</script>
