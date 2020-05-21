<template>
  <div>
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
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'ExchangeRate',
  computed: {
    exchangeRatesPreview() {
      const exchangeRatesToShow = ['USD', 'EUR', 'SGD', 'JPY', 'CNY'];

      let exchangeRatesPreview = [];

      exchangeRatesPreview = this.exchangeRates.filter(rate =>
        exchangeRatesToShow.includes(rate.currency)
      );

      return exchangeRatesPreview;
    }
  },
  data() {
    return {
      exchangeRates: [],
      exchangeRateDate: '',
      exchangeRateLoading: false
    };
  },
  methods: {
    goToExchangeRates(url) {
      openURL(url);
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
