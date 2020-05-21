<template>
  <page-container>
    <page-title title="Dashboard"></page-title>

    <div class="row q-pa-sm q-col-gutter-sm">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-sm-12">
        <div class="row">
          <q-item-label header class="q-px-none q-pb-sm">Summary</q-item-label>
        </div>
        <div class="row">
          <div class="col-6">
            <q-card flat square class="fit" bordered>
              <q-item>
                <q-item-section>Owned Projects</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="grey" class="text-white">
                    {{ user.project_count }}
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
                <q-item-section>Notifications</q-item-section>
                <q-item-section avatar>
                  <q-avatar color="grey" class="text-white">
                    {{ unreadNotifications.length }}
                  </q-avatar>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

        <!-- Shortcuts -->
        <div class="row">
          <q-item-label header class="q-px-none q-pb-sm q-mt-md"
            >Shortcuts</q-item-label
          >
        </div>

        <div class="row">
          <template v-for="(link, index) in filteredLinks">
            <div class="col-6" :key="index">
              <q-card flat square class="fit" bordered>
                <q-item clickable :to="link.url" v-ripple>
                  <q-item-section>
                    <q-item-label>{{ link.label }} {{ link.visible }}</q-item-label>
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

      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <activity-component></activity-component>

        <!-- Activity Feed -->
        <exchange-rate></exchange-rate>
      </div>
      
    </div>

  </page-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { RELAY_PROJECTS_QUERY, FETCH_UNREAD_NOTIFICATIONS_QUERY, FETCH_GAD_QUESTIONS } from '@/graphql/queries';
const PageTitle = () =>
  import(/* webpackChunkName: '' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: '' */ '@/ui/page/PageContainer');
const ActivityComponent = () =>
  import(/* webpackChunkName: '' */ '../components/ActivityComponent');
const ExchangeRate = () => import('../components/ExchangeRate')

export default {
  name: 'PageIndex',
  components: { ActivityComponent, PageContainer, PageTitle, ExchangeRate },
  computed: {
    ...mapState('auth', ['user', 'loading']),
    ...mapGetters('auth', ['isEncoder']),
    filteredLinks() {
      let filteredLinks = []
      if (this.isEncoder) {
        filteredLinks = this.links;
      } else {
        filteredLinks = this.links.filter(link => link.encoder === undefined)
      }
      return filteredLinks;
    }
  },
  apollo: {
    unreadNotifications: {
      query: FETCH_UNREAD_NOTIFICATIONS_QUERY
    }
  },
  methods: {
    ...mapActions('auth', ['hideValidateEmailReminder']),
    hideReminder() {
      this.hideValidateEmailReminder(false);
    },
    
    map(items) {
      let mappedItems = []
      mappedItems = items.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
      return mappedItems
    }
  },
  data() {
    return {
      gad_questions: [],
      answers: [],
      relayProjects: {
        pageInfo: {
          total: 0
        }
      },
      unreadNotifications: [],
      links: [
        {
          label: 'Profile',
          icon: 'person',
          url: '/profile',
          color: 'primary'
        },
        {
          label: 'View Projects',
          icon: 'list',
          url: '/projects',
          color: 'blue'
        },
				{
					label: 'Add Project',
					icon: 'playlist_add',
					url: '/projects/add',
					color: 'secondary',
          encoder: true
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
          color: 'purple'
        },
        {
          label: 'Settings',
          icon: 'settings',
          url: '/settings',
          color: 'pink'
        }
      ]
    };
  }
};
</script>
