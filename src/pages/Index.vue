<template>
  <q-page class="q-pt-lg">
    <page-title title="Dashboard"></page-title>

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
                    {{ relayProjects.edges ? relayProjects.edges.length : 0 }}
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
                    {{ activitiesPreview.length }}
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
                    {{ user ? user.unreadNotifications.length : 0 }}
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
      <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
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
                <q-item
                  v-for="activity in activitiesPreview"
                  :key="activity.id"
                >
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

        <div class="row justify-between">
          <span class="q-item__label q-px-none q-pb-sm q-item__label--header"
            >Exchange Rates (as of {{ exchangeRateDate }})</span
          >
          <q-space />
          <q-btn
            label="See All"
            dense
            class="text-capitalize"
            flat
            icon-right="play_circle_outline"
            tag="a"
            target="_blank"
            @click="
              goToExchangeRates(
                'http://www.bsp.gov.ph/statistics/sdds/exchrate.htm'
              )
            "
          />
        </div>

        <q-card square bordered flat style="min-height: 115px;">
          <q-list separator>
            <template v-if="exchangeRateLoading">
              <q-inner-loading :showing="exchangeRateLoading">
                <q-spinner-tail size="50px"></q-spinner-tail>
              </q-inner-loading>
            </template>
            <template v-else>
              <template v-if="exchangeRatesPreview.length">
                <q-item
                  v-for="({ currency, rate }, index) in exchangeRatesPreview"
                  :key="index"
                >
                  <q-item-section avatar>
                    <q-avatar color="primary" class="text-white">
                      {{ currency.charAt(0) }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ currency }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ rate.toFixed(2) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-else>
                <q-item>
                  No currencies to show.
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
              >{{ user ? user.email : '' }}</span
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
import { RELAY_PROJECTS_QUERY } from '../graphql/queries';
import PageTitle from '../components/PageTitle';
import { openURL } from 'quasar';

export default {
  name: 'PageIndex',
  components: { PageTitle },
  computed: {
    ...mapState('auth', ['showValidateEmailReminder', 'user', 'loading']),
    ...mapGetters('auth', ['isEncoder']),
    needEmailValidation() {
      return this.showValidateEmailReminder;
    },
    activitiesPreview() {
      // Todo: implement retrieval of activities outside user
      // return this.activities.slice(0, 10);
      return [];
    },
    exchangeRatesPreview() {
      const exchangeRatesToShow = ['USD', 'EUR', 'SGD', 'JPY', 'CNY'];

      let exchangeRatesPreview = [];

      exchangeRatesPreview = this.exchangeRates.filter(rate =>
        exchangeRatesToShow.includes(rate.currency)
      );

      return exchangeRatesPreview;
    }
  },
  apollo: {
    relayProjects: {
      query: RELAY_PROJECTS_QUERY,
      variables: {
        first: 10,
        after: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['hideValidateEmailReminder']),
    hideReminder() {
      this.hideValidateEmailReminder(false);
    },
    goToExchangeRates(url) {
      openURL(url);
    }
  },
  data() {
    return {
      relayProjects: [],
      exchangeRates: [],
      exchangeRateDate: '',
      exchangeRateLoading: false,
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
      return this.$moment(val).calendar();
    }
  },
  created() {
    this.exchangeRateLoading = true;
    this.$http
      .get('https://api.exchangeratesapi.io/latest?base=PHP')
      .then(({ data: { rates, date } }) => {
        this.exchangeRateDate = date;

        let exchangeRates = [];

        Object.keys(rates).forEach(key => {
          exchangeRates.push({
            currency: key,
            rate: 1 / rates[key]
          });
        });

        this.exchangeRates = exchangeRates;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => (this.exchangeRateLoading = false));
  }
};
</script>
