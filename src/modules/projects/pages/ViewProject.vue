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
      <div class="row q-pa-sm">
        <q-img :src="project.image_url ? project.image_url : 'http://www.fao.org/uploads/pics/NFQCS_banner.png'" height="240px" alt="project banner">
          <q-btn flat round class="absolute all-pointer-events bg-grey-10" icon="camera_alt" size="md" color="white" style="bottom: 3px; right: 3px">
            <q-tooltip>
              Upload Image
            </q-tooltip>
          </q-btn>
        </q-img>
      </div>

      <div class="row q-col-gutter-sm q-pa-sm">
        <!-- Left side -->
        <div class="col-9 text-blue-grey-10">
          <div class="text-h5 q-mb-md text-cyan">
            {{ project.title }}
            <q-badge>
              {{ project.type.name }}
            </q-badge>
            <q-badge color="red" v-if="project.infrastructure">
              Infrastructure
            </q-badge>
          </div>
          <div class="column q-mb-sm">
            <div class="text-weight-lighter text-subtitle1">DESCRIPTION</div>
            <div class="text-body2">
              {{ project.description }}
            </div>
          </div>
          <q-separator spaced/>
          <div class="column q-mb-sm">
            <div class="text-weight-lighter text-subtitle1">PURPOSE</div>
            <div class="text-body2">
              {{ project.purpose }}
            </div>
          </div>
          <q-separator spaced/>
          <div class="column q-mb-sm">
            <div class="text-weight-lighter text-subtitle1">EXPECTED OUTPUTS</div>
            <div class="text-body2">
              {{ project.expected_outputs }}
            </div>
          </div>
          <q-separator spaced/>
          <div class="column q-mb-sm">
            <div class="text-weight-lighter text-subtitle1">UPDATES</div>
            <div class="text-body2" v-if="project.updates">
              As of {{ project.updates_date | formatDate }},
              {{ project.updates }}
            </div>
            <div class="text-body2" v-else>
              No updates.
            </div>
          </div>
          <q-separator spaced/>
          <div class="column">
            <div class="text-weight-lighter text-subtitle1">INVESTMENTS</div>
            <q-markup-table class="col">
              <thead>
                <tr>
                  <td>Year</td>
                  <td>Total</td>
                  <td>Infrastructure</td>
                  <td>NEP</td>
                  <td>GAA</td>
                  <td>Disbursement</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2016 &amp; Prior</td>
                  <td>{{ project.investment_target_2016 }}</td>
                  <td>{{ project.infrastructure_target_2016 }}</td>
                  <td>{{ project.nep_2016 }}</td>
                  <td>{{ project.gaa_2016 }}</td>
                  <td>{{ project.disbursement_2016 }}</td>
                </tr>
                <tr>
                  <td>2017</td>
                  <td>{{ project.investment_target_2017 }}</td>
                  <td>{{ project.infrastructure_target_2017 }}</td>
                  <td>{{ project.nep_2017 }}</td>
                  <td>{{ project.gaa_2017 }}</td>
                  <td>{{ project.disbursement_2017 }}</td>
                </tr>
                <tr>
                  <td>2018</td>
                  <td>{{ project.investment_target_2018 }}</td>
                  <td>{{ project.infrastructure_target_2018 }}</td>
                  <td>{{ project.nep_2018 }}</td>
                  <td>{{ project.gaa_2018 }}</td>
                  <td>{{ project.disbursement_2018 }}</td>
                </tr>
                <tr>
                  <td>2019</td>
                  <td>{{ project.investment_target_2019 }}</td>
                  <td>{{ project.infrastructure_target_2019 }}</td>
                  <td>{{ project.nep_2019 }}</td>
                  <td>{{ project.gaa_2019 }}</td>
                  <td>{{ project.disbursement_2019 }}</td>
                </tr>
                <tr>
                  <td>2020</td>
                  <td>{{ project.investment_target_2020 }}</td>
                  <td>{{ project.infrastructure_target_2020 }}</td>
                  <td>{{ project.nep_2020 }}</td>
                  <td>{{ project.gaa_2020 }}</td>
                  <td>{{ project.disbursement_2020 }}</td>
                </tr>
                <tr>
                  <td>2021</td>
                  <td>{{ project.investment_target_2021 }}</td>
                  <td>{{ project.infrastructure_target_2021 }}</td>
                  <td>{{ project.nep_2021 }}</td>
                  <td>{{ project.gaa_2021 }}</td>
                  <td>{{ project.disbursement_2021 }}</td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td>{{ project.investment_target_2022 }}</td>
                  <td>{{ project.infrastructure_target_2022 }}</td>
                  <td>{{ project.nep_2022 }}</td>
                  <td>{{ project.gaa_2022 }}</td>
                  <td>{{ project.disbursement_2022 }}</td>
                </tr>
                <tr>
                  <td>2023 &amp; Beyond</td>
                  <td>{{ project.investment_target_2023 }}</td>
                  <td>{{ project.infrastructure_target_2023 }}</td>
                  <td>{{ project.nep_2023 }}</td>
                  <td>{{ project.gaa_2023 }}</td>
                  <td>{{ project.disbursement_2023 }}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{{ project.investment_target_total }}</td>
                  <td>{{ project.infrastructure_target_total }}</td>
                  <td>{{ project.nep_total }}</td>
                  <td>{{ project.gaa_total }}</td>
                  <td>{{ project.disbursement_total }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
        
        <!-- Right side -->
        <div class="col-3 bg-fao q-pa-sm q-mt-sm">
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
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Status
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.project_status ? project.project_status.name : 'Not specified' }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </template>

    <pre>
      {{ project }}
    </pre>
  </page-container>
</template>

<script>
import { FETCH_PROJECT_QUERY } from '../../../graphql/queries';
import PageTitle from '../../ui/page/PageTitle.vue';
import PageContainer from '../../ui/page/PageContainer.vue';
import { date } from 'quasar'

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
  },
  filters: {
    formatDate(val) {
      // let newDate = new Date(val)
      if (!val) {
        return '';
      }
      console.log(val)
      return date.formatDate(val, 'MMM D, YYYY (ddd)')
    }
  }
};
</script>
