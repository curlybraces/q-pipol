<template>
  <q-page class="q-pt-lg">
    <div class="row q-pa-sm q-col-gutter-sm">
      <div
        class="offset-xl-3 offset-lg-3 col-lg-3 col-md-12 col-sm-12 col-sm-12"
      >
        <div class="row">
          <q-item-label header class="q-px-none q-pb-sm">Summary</q-item-label>
        </div>
        <div class="row">
          <div class="col-6">
            <q-card flat square class="fit" bordered>
              <q-item>
                <q-item-section>Projects</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="grey" class="text-white">
                    {{ projects.length }}
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat square class="fit" bordered>
              <q-item>
                <q-item-section>Messages</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="grey" class="text-white">
                    0
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat square class="fit" bordered>
              <q-item>
                <q-item-section>Activities</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="grey" class="text-white">
                    {{ user ? user.activities.length : 0 }}
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat square class="fit" bordered>
              <q-item>
                <q-item-section>Notifications</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="grey" class="text-white">
                    {{ user ? user.unreadNotifications.length: 0 }}
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

				<!-- Shortcuts -->
				<div class="row">
					<q-item-label header class="q-px-none q-pb-sm q-mt-md">Shortcuts</q-item-label>
				</div>
				<div class="row">
					<template v-for="(link, index) in links">
						<div class="col-6" :key="index">
							<q-card flat square class="fit" bordered>
								<q-item clickable :to="link.url" v-ripple>
									<q-item-section>
										<q-item-label>{{ link.label }}</q-item-label>
									</q-item-section>
									<q-item-section side top>
										<q-icon :name="link.icon" size="xl" :color="link.color" />
									</q-item-section>
								</q-item>
							</q-card>
						</div>
					</template>
				</div>
      </div>

      <!-- Activity Feed -->
      <div class="col-lg-3 col-md-12 col-sm-12 col-sm-12">
        <div class="row justify-between">
          <span class="q-item__label q-px-none q-pb-sm q-item__label--header"
            >Latest Activity</span
          >
          <q-space />
          <q-btn
            label="All Activities"
            dense
            class="text-capitalize"
            flat
            icon-right="play_circle_outline"
            to="/activity"
          />
        </div>
        <q-card square bordered flat style="min-height: 115px;">
          <q-list separator>
						<template v-if="loading">
							<q-inner-loading :showing="loading">
								<q-spinner-tail :size="50" color="primary"></q-spinner-tail>
							</q-inner-loading>
						</template>
						<template v-else>
							<template v-if="!loading && activitiesPreview.length">
								<q-item v-for="activity in activitiesPreview" :key="activity.id">
									<q-item-section avatar>
										<q-avatar>
											<q-icon :name="activity.description | icon" />
										</q-avatar>
									</q-item-section>
									<q-item-section>
										<q-item-label
											>{{ activity.description | subject }}:
											{{
												activity.subject ? activity.subject.title : ''
											}}</q-item-label
										>
										<q-item-label caption>{{
											activity.created_at | timeDiff
										}}</q-item-label>
									</q-item-section>
								</q-item>
							</template>
							<template v-else>
								<q-item>
									No activities to show.
								</q-item>
							</template>
						</template>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- email validation dialog -->
    <q-dialog v-model="needEmailValidation">
      <q-card square class="q-px-sm" style="max-width: 480px;">
        <div class="row justify-end q-py-sm">
          <q-icon
            name="close"
            flat
            dense
            class="cursor-pointer"
            @click="hideReminder"
          ></q-icon>
        </div>
        <div class="col q-gutter-md text-center q-py-lg">
          <div class="text-primary text-h5 text-weight-bold">
            Please verify your email
          </div>
          <div class="text-subtitle1">
            You're almost there! We sent an email to<br /><span
              class="text-weight-bolder"
              >{{ user ? user.email: '' }}</span
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
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import { GET_PROJECTS } from '../graphql/queries';

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('auth', ['showValidateEmailReminder', 'user', 'loading']),
		...mapGetters('auth',['isEncoder']),
    needEmailValidation() {
      return this.showValidateEmailReminder;
    },
    activitiesPreview() {
      return this.user.activities.slice(0, 10);
    }
  },
	apollo: {
  	projects: {
  		query: GET_PROJECTS
		}
	},
  methods: {
    ...mapActions('auth', ['hideValidateEmailReminder']),
    hideReminder() {
      this.hideValidateEmailReminder(false);
    }
  },
  data() {
    return {
    	projects: [],
      links: [
        {
          label: 'Account Settings',
          icon: 'playlist_add',
          url: '/account',
          color: 'green'
        },
	      {
		      label: 'View Projects',
		      icon: 'list',
		      url: '/projects',
		      color: 'blue'
	      },
				{
					label: 'Activities',
					icon: 'work_outline',
					url: '/activities',
					color: 'purple'
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
        },
				{
					label: 'Settings',
					icon: 'settings',
					url: '/settings',
					color: 'pink'
				}
      ]
    };
  },
  filters: {
    icon(val) {
      if (val.includes('created')) {
        return 'fiber_new';
      } else if (val.includes('updated')) {
        return 'update';
      }
    },
    subject(val) {
      if (val.includes('created')) {
        return 'Created';
      }
      return null;
    },
    timeDiff(val) {
      return moment(val).calendar();
    }
  }
};
</script>
