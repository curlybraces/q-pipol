<template>
  <page-container>
    <page-title title="View Project Information"></page-title>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
      <div class="row q-my-md q-pa-sm">
        <q-img src="http://www.fao.org/uploads/pics/NFQCS_banner.png" height="240px" alt="project banner">
          <q-btn flat round class="absolute all-pointer-events bg-grey-10" icon="camera_alt" size="md" color="white" style="bottom: 3px; right: 3px">
            <q-tooltip>
              Tooltip
            </q-tooltip>
          </q-btn>
        </q-img>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-8 q-pa-sm">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Title</q-item-label>
                <q-item-label caption>{{ project.title }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>
                  Implementing Agency
                </q-item-label>
                <q-item-label caption>
                  {{
                    project.operating_unit ? project.operating_unit.name : ''
                  }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>Implementation Period</q-item-label>
                <q-item-label caption>
                  {{
                    project.target_start_year + ' - ' + project.target_end_year
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Description</q-item-label>
                <q-item-label caption>{{ project.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-4 bg-fao q-pa-sm">
          <q-item-label header class="text-uppercase text-subtitle1">Key Facts</q-item-label>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Fund Source
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.main_funding_source ?  project.main_funding_source.name : 'Not specified' }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Total Project Cost
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.currency ? project.currency.name : 'PHP' }}
                {{ project.total_project_cost.toLocaleString() }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Duration
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.target_start_year + ' - ' + project.target_end_year }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Beneficiaries
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.beneficiaries ? project.beneficiaries : 'Not specified' }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Coverage
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.spatial_coverage ? project.spatial_coverage.name : 'Not specified' }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </template>

    <q-separator />

    <pre>
      {{ project }}
    </pre>
  </page-container>
</template>

<script>
import { FETCH_PROJECT_QUERY } from '../../../graphql/queries';
import PageTitle from '../../ui/page/PageTitle.vue';
import PageContainer from '../../ui/page/PageContainer.vue';

export default {
  components: { PageContainer, PageTitle },
  name: 'ViewProject',
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      nav: [
        {
          label: 'Basic Information',
          ref: '#basicInformation'
        }
      ]
    };
  }
};
</script>
