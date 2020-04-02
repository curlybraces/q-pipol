<template>
  <q-page class="q-pt-lg">
    <page-title title="Progress Tracker"></page-title>

    <div class="row q-pa-sm">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-dots size="50px" />
      </q-inner-loading>
      <div v-if="!$apollo.loading" class="col">
        <q-list bordered>
          <q-item v-for="(reviewer, index) in reviewers" :key="index">
            <q-item-section>
              <q-item-label class="text-uppercase">
                {{ reviewer.name }}
              </q-item-label>
              <q-item-label caption>
                <div class="row items-center">
                  <div class="col-6">
                    #26 reviewed 6 days ago
                  </div>
                  <div class="col text-right">
                    <q-icon name="playlist_add_check" class="text-grey-9" /> 1
                    of 2
                  </div>
                  <div class="col">
                    <q-linear-progress :value="0.5"></q-linear-progress>
                  </div>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import PageTitle from '../components/PageTitle';
import { FETCH_REVIEWERS_QUERY } from '../constants/graphql';
export default {
  components: { PageTitle },
  name: 'PageProgressTracker',
  apollo: {
    reviewers: {
      query: FETCH_REVIEWERS_QUERY
    }
  },
  data() {
    return {
      reviewers: [],
      loading: false
    };
  }
};
</script>
