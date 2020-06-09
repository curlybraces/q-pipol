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
        <short-cuts/>
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
import { FETCH_UNREAD_NOTIFICATIONS_QUERY } from '@/graphql/queries';
const PageTitle = () =>
  import(/* webpackChunkName: '' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: '' */ '@/ui/page/PageContainer');
const ActivityComponent = () =>
  import(/* webpackChunkName: '' */ '../components/ActivityComponent');
const ExchangeRate = () => import('../components/ExchangeRate');
const ShortCuts = () => import('../components/ShortCuts.vue')

export default {
  name: 'PageIndex',
  components: { ActivityComponent, PageContainer, PageTitle, ExchangeRate, ShortCuts },
  computed: {
    ...mapState('auth', ['user', 'loading']),
    ...mapGetters('auth', ['isEncoder'])
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
      let mappedItems = [];
      mappedItems = items.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
      return mappedItems;
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
      unreadNotifications: []
    };
  }
};
</script>
