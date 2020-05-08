<template>
  <page-container>
    <page-title title="Activity Feed"></page-title>

		<template v-if="loading">

			<inner-loading :loading="loading"></inner-loading>

		</template>

		<template v-else>

			<div v-if="activities.length > 0" class="q-mt-lg q-pa-sm" >
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

			<div v-else>
				<no-item icon="cancel" message="No activities yet."></no-item>
			</div>

		</template>

  </page-container>
</template>

<script>
import PageContainer from '../../ui/page/PageContainer'
import PageTitle from '../../ui/page/PageTitle'
import { date } from 'quasar'
import {FETCH_ACTIVITIES} from '@/graphql/queries'
import InnerLoading from '../../ui/components/InnerLoading'
import NoItem from '../../shared/components/NoItem'

export default {
  name: 'PageActivity',
  components: {NoItem, InnerLoading, PageTitle, PageContainer },
	apollo: {
  	activities: {
  		query: FETCH_ACTIVITIES,
			result({ loading }) {
  			this.loading = loading
			}
		}
	},
  data() {
    return {
      activities: [],
			loading: false
    };
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
  }
};
</script>
