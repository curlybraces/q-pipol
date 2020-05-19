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

      <!-- Activity Feed -->
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <activity-component></activity-component>

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
  </page-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { RELAY_PROJECTS_QUERY, FETCH_UNREAD_NOTIFICATIONS_QUERY, FETCH_GAD_QUESTIONS } from '../../../graphql/queries';
import { openURL } from 'quasar';
const PageTitle = () =>
  import(/* webpackChunkName: '' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: '' */ '@/ui/page/PageContainer');
const ActivityComponent = () =>
  import(/* webpackChunkName: '' */ '../components/ActivityComponent');

export default {
  name: 'PageIndex',
  components: { ActivityComponent, PageContainer, PageTitle },
  computed: {
    ...mapState('auth', ['showValidateEmailReminder', 'user', 'loading']),
    ...mapGetters('auth', ['isEncoder']),
    needEmailValidation() {
      return this.showValidateEmailReminder;
    },
    exchangeRatesPreview() {
      const exchangeRatesToShow = ['USD', 'EUR', 'SGD', 'JPY', 'CNY'];

      let exchangeRatesPreview = [];

      exchangeRatesPreview = this.exchangeRates.filter(rate =>
        exchangeRatesToShow.includes(rate.currency)
      );

      return exchangeRatesPreview;
    },
    filteredLinks() {
      let filteredLinks = []
      if (this.isEncoder) {
        filteredLinks = this.links;
      } else {
        filteredLinks = this.links.filter(link => link.encoder === undefined)
      }
      return filteredLinks;
    },
    mappedAnswers() {
      let mappedAnswers = []
      const answers = this.answers

      mappedAnswers = answers.map((answer, index) => {
        return {
          id: null,
          subquestion_id: index,
          gad_choice_id: answer
        }
      })

      return mappedAnswers
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
    goToExchangeRates(url) {
      openURL(url);
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
      exchangeRates: [],
      exchangeRateDate: '',
      exchangeRateLoading: false,
      links: [
        {
          label: 'Account Settings',
          icon: 'person',
          url: '/account',
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
