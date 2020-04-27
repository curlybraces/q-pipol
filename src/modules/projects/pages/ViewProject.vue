<template>
  <page-container>
    <page-title title="View Project Information"></page-title>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
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
        <div class="col-4 bg-blue-2 q-pa-sm">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  Goals
                </q-item-label>
                <q-item-label>
                  {{ project.goals }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  Outcomes
                </q-item-label>
                <q-item-label>
                  {{ project.outcomes }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  Objectives
                </q-item-label>
                <q-item-label>
                  {{ project.purpose }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  Expected Outputs
                </q-item-label>
                <q-item-label>
                  {{ project.expected_outputs }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
