<template>
  <q-page>
    <div class="q-mt-lg q-pa-sm">
      <q-item-label class="q-pl-none" header>Activity Feed</q-item-label>

      <q-list separator>
        <q-item
          v-for="(activity, index) in activities"
          :key="index"
          class="q-py-sm"
        >
          <q-item-section avatar>
            <q-avatar color="primary" class="text-white" size="sm">
              {{ activity.causer.name.charAt(0) }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bolder">
                {{ activity.causer.name }}:
              </span>
              <span>
                {{ activity.description | subject }}:
                <q-badge outline color="primary">
                  {{
                    activity.subject
                      ? activity.subject.title.slice(0, 50)
                      : null
                  }}
                </q-badge>
              </span>
            </q-item-label>
            <q-item-label caption>
              {{ activity.created_at | timeDiff }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'PageActivity',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Activity'
        }
      ]
    };
  },
  computed: {
    ...mapState('activities', ['activities'])
  },
  filters: {
    subject(val) {
      if (val.includes('created')) {
        return 'Created';
      }
      return null;
    },
    timeDiff(val) {
      return moment(val).calendar();
    }
  },
  methods: {
    ...mapActions('activities', ['fetchActivities'])
  },
  mounted() {
    this.fetchActivities();
  }
};
</script>
