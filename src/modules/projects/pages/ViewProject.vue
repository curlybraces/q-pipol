<template>
  <page-container>
    <page-title title="Project Profile">
      <q-btn icon="settings" flat round color="primary">
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list>
            <q-item clickable :to="`${$route.fullPath}/edit`">
              <q-item-section>
                <q-item-label>Edit Project</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Print Project</q-item-label>
              </q-item-section>
            </q-item>
						<q-item clickable @click="reviewProject = true">
							<q-item-section>
								<q-item-label>Review Project</q-item-label>
							</q-item-section>
						</q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </page-title>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
      <project-profile :id="$route.params.id" />
    </template>

  </page-container>
</template>

<script>
import { FETCH_PROJECT_QUERY } from '../../../graphql/queries';
import PageTitle from '../../ui/page/PageTitle.vue';
import PageContainer from '../../ui/page/PageContainer.vue';
import { date } from 'quasar'
import ProjectProfile from '../components/ProjectProfile'

export default {
  components: { PageContainer, PageTitle, ProjectProfile },
  name: 'ViewProject'
};
</script>
