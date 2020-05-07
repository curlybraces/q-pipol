<template>
  <page-container>
    <page-title title="Activity Feed"></page-title>

    <q-inner-loading :showing="loading">
      <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
    </q-inner-loading>

    <div class="q-mt-lg q-pa-sm" v-if="!loading">
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
  </page-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PageContainer from '../../ui/page/PageContainer'
import PageTitle from '../../ui/page/PageTitle'
import { date } from 'quasar'

export default {
  name: 'PageActivity',
  components: { PageTitle, PageContainer },
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
    ...mapState('activities', ['activities', 'loading'])
  },
  filters: {
    subject(val) {
      if (val.includes('created')) {
        return 'Created';
      }
      return null;
    },
    timeDiff(val) {
    	if (!val) {
    		return ''
			}

    	const today = new Date()

      return date.getDateDiff(today, val);
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
