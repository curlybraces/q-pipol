<template>
  <div class="column">
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
        <template v-if="$apollo.loading">
          <q-inner-loading :showing="$apollo.loading">
            <q-spinner-tail :size="50" color="primary"></q-spinner-tail>
          </q-inner-loading>
        </template>
        <template v-else>
          <template v-if="!$apollo.loading && activitiesPreview.length">
            <q-item v-for="activity in activitiesPreview" :key="activity.id">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon :name="activity.description | icon" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  >{{ activity.description }}:
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
</template>

<script>
import { FETCH_ACTIVITIES } from '@/graphql/queries';
import { date } from 'quasar';

export default {
  name: 'ActivityComponent',
  computed: {
    activitiesPreview() {
      // Todo: implement retrieval of activities outside user
      // return this.activities.slice(0, 10);
      return this.activities.slice(0, 5);
    }
  },
  data() {
    return {
      activities: []
    };
  },
  apollo: {
    activities: {
      query: FETCH_ACTIVITIES
    }
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
      const today = new Date();
      if (val) {
        const diff = date.getDateDiff(today, val, 'days');
        return diff + ' days ago';
      }
      return '';
    }
  },
  beforeDestroy() {
    this.$apollo.queries.activities.stop();
  }
};
</script>
