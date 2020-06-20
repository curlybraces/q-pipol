<template>
  <div v-if="project">
    <div class="row q-pa-sm">
      <q-img
        :src="
          project.image_url
            ? project.image_url
            : 'http://www.fao.org/uploads/pics/NFQCS_banner.png'
        "
        height="240px"
        alt="project banner"
      >
        <q-btn
          v-if="isEncoder"
          flat
          round
          class="absolute all-pointer-events bg-grey-10"
          icon="camera_alt"
          size="md"
          color="white"
          style="bottom: 3px; right: 3px"
        >
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
          <div class="row">
            <q-badge>
              {{ project.type ? project.type.name : 'Not specified.' }}
            </q-badge>
            <q-badge color="red" v-if="project.infrastructure" class="q-ml-sm">
              Infrastructure
            </q-badge>
            <q-badge color="red" v-if="project.afmip" class="q-ml-sm">
              AFMIP
            </q-badge>
            <q-badge color="orange" v-if="project.pcip" class="q-ml-sm">
              PCIP
            </q-badge>
          </div>
          {{ project.title }}
          <q-btn
            v-copy="project.title"
            round
            dense
            flat
            icon="img:statics/icons/content_copy-black-18dp.svg"
            :dark="dark"
          >
            <q-tooltip>Copy to clipboard</q-tooltip>
          </q-btn>
        </div>

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            DESCRIPTION
          </div>
          <div class="text-body2">
            <textarea-copy :value="project.description"></textarea-copy>
          </div>
        </div>

        <q-separator spaced />

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            PURPOSE
          </div>
          <div class="text-body2">
            <textarea-copy :value="project.purpose"></textarea-copy>
          </div>
        </div>

        <q-separator spaced />

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            OUTCOMES
          </div>
          <textarea-copy :value="project.outcomes"></textarea-copy>
        </div>

        <q-separator spaced />

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            EXPECTED OUTPUTS
          </div>
          <textarea-copy :value="project.expected_outputs" />
        </div>

        <q-separator spaced />

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            BASES FOR IMPLEMENTATION
          </div>
          <div class="text-body2">
            <span v-for="ib in project.bases" :key="ib.id">
              {{ ib.name }},
            </span>
          </div>
        </div>

        <q-separator spaced />

        <div class="column">
          <div class="text-weight-lighter text-subtitle1">
            FINANCIAL INFORMATION
          </div>
          <div class="text-body2">
            {{
              project.main_funding_source
                ? project.main_funding_source.name
                : ''
            }}
            >>
            {{
              project.funding_institution
                ? `>> ${project.funding_institution.name}`
                : ''
            }}
          </div>
          <div class="text-body2">
            {{ project.tier ? project.tier.name : '' }}
          </div>
        </div>

        <q-separator spaced />

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            TECHNICAL READINESS
          </div>
          <div class="text-body2">
            {{
              project.clearinghouse
                ? `Approved by DA-Wide Clearinghouse on ${project.clearinghouse_date}`
                : ''
            }}
            {{
              project.neda_submission
                ? `Submitted to NEDA on ${project.neda_submission_date}`
                : ''
            }}
            {{
              project.neda_secretariat_review
                ? `Reviewed by NEDA Secretariat on ${project.neda_secretariat_review_date}`
                : ''
            }}
            {{
              project.icc_endorsed
                ? `Endorsed by ICC on ${project.icc_endorsed_date}`
                : ''
            }}
            {{
              project.icc_approved
                ? `Approved by ICC on ${project.icc_approved_date}`
                : ''
            }}
            {{
              project.neda_board
                ? `Approved by NEDA Board on ${project.neda_board_date}`
                : ''
            }}
          </div>
        </div>

        <q-separator spaced />

        <div class="column">
          <div class="text-weight-lighter text-subtitle1">
            PRE-INVESTMENT REQUIREMENT
          </div>
          <q-markup-table class="col q-my-sm bg-transparent" flat bordered>
            <thead>
              <tr>
                <th>Type</th>
                <th>2017</th>
                <th>2018</th>
                <th>2019</th>
                <th>2020</th>
                <th>2021</th>
                <th>2022</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="8">Financial Cost</td>
              </tr>
              <tr v-if="project.has_fs">
                <td>Feasibility Study</td>
                <td>{{ project.fs_target_2017 }}</td>
                <td>{{ project.fs_target_2018 }}</td>
                <td>{{ project.fs_target_2019 }}</td>
                <td>{{ project.fs_target_2020 }}</td>
                <td>{{ project.fs_target_2021 }}</td>
                <td>{{ project.fs_target_2022 }}</td>
                <td>{{ project.fs_target_total }}</td>
              </tr>
              <tr v-if="project.has_row">
                <td>Right of Way</td>
                <td>{{ project.row_target_2017 }}</td>
                <td>{{ project.row_target_2018 }}</td>
                <td>{{ project.row_target_2019 }}</td>
                <td>{{ project.row_target_2020 }}</td>
                <td>{{ project.row_target_2021 }}</td>
                <td>{{ project.row_target_2022 }}</td>
                <td>{{ project.row_target_total }}</td>
              </tr>
              <tr v-if="project.has_rap">
                <td>Resettlement Action Plan</td>
                <td>{{ project.rap_target_2017 }}</td>
                <td>{{ project.rap_target_2018 }}</td>
                <td>{{ project.rap_target_2019 }}</td>
                <td>{{ project.rap_target_2020 }}</td>
                <td>{{ project.rap_target_2021 }}</td>
                <td>{{ project.rap_target_2022 }}</td>
                <td>{{ project.rap_target_total }}</td>
              </tr>
              <tr>
                <td colspan="8">Social Cost</td>
              </tr>
              <tr v-if="project.has_row">
                <td>Right of Way</td>
                <td>{{ project.row_affected_2017 }}</td>
                <td>{{ project.row_affected_2018 }}</td>
                <td>{{ project.row_affected_2019 }}</td>
                <td>{{ project.row_affected_2020 }}</td>
                <td>{{ project.row_affected_2021 }}</td>
                <td>{{ project.row_affected_2022 }}</td>
                <td>Not cumulative</td>
              </tr>
              <tr v-if="project.has_rap">
                <td>Resettlement Action Plan</td>
                <td>{{ project.rap_affected_2017 }}</td>
                <td>{{ project.rap_affected_2018 }}</td>
                <td>{{ project.rap_affected_2019 }}</td>
                <td>{{ project.rap_affected_2020 }}</td>
                <td>{{ project.rap_affected_2021 }}</td>
                <td>{{ project.rap_affected_2022 }}</td>
                <td>Not cumulative</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <q-separator spaced />

        <div class="column">
          <section-header
            sectionTitle="Investment Requirement"
          ></section-header>

          <template
            v-if="
              project.funding_source_financials &&
                project.funding_source_financials.length
            "
          >
            <q-markup-table class="col q-pa-sm bg-transparent" flat>
              <thead>
                <tr>
                  <th>Funding Source</th>
                  <th>2016 &amp; Prior</th>
                  <th>2017</th>
                  <th>2018</th>
                  <th>2019</th>
                  <th>2020</th>
                  <th>2021</th>
                  <th>2022</th>
                  <th>2023 &amp; Beyond</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="fs in project.funding_source_financials"
                  :key="fs.id"
                >
                  <td>{{ fs.funding_source.name }}</td>
                  <td>{{ fs.target_2016 }}</td>
                  <td>{{ fs.target_2017 }}</td>
                  <td>{{ fs.target_2018 }}</td>
                  <td>{{ fs.target_2019 }}</td>
                  <td>{{ fs.target_2020 }}</td>
                  <td>{{ fs.target_2021 }}</td>
                  <td>{{ fs.target_2022 }}</td>
                  <td>{{ fs.target_2023 }}</td>
                  <td>{{ fs.target_total }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </template>

          <template
            v-if="project.region_financials && project.region_financials.length"
          >
            <q-markup-table class="col q-pa-sm bg-transparent" flat>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>2016 &amp; Prior</th>
                  <th>2017</th>
                  <th>2018</th>
                  <th>2019</th>
                  <th>2020</th>
                  <th>2021</th>
                  <th>2022</th>
                  <th>2023 &amp; Beyond</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rf in project.region_financials" :key="rf.id">
                  <td>{{ rf.region.name }}</td>
                  <td>{{ rf.target_2016 }}</td>
                  <td>{{ rf.target_2017 }}</td>
                  <td>{{ rf.target_2018 }}</td>
                  <td>{{ rf.target_2019 }}</td>
                  <td>{{ rf.target_2020 }}</td>
                  <td>{{ rf.target_2021 }}</td>
                  <td>{{ rf.target_2022 }}</td>
                  <td>{{ rf.target_2023 }}</td>
                  <td>{{ rf.target_total }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </template>

          <q-markup-table class="col q-my-sm bg-transparent" flat bordered>
            <thead>
              <tr>
                <th>Year</th>
                <th>Total</th>
                <th>Infrastructure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <!-- <tr v-if="project.target_start_year <= 2016 && project.target_end_year >= 2016"> -->
                <td>2016 &amp; Prior</td>
                <table-data
                  :value="project.investment_target_2016"
                ></table-data>
                <table-data
                  :value="project.infrastructure_target_2016"
                ></table-data>
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2017 && project.target_end_year >= 2017"> -->
              <tr>
                <td>2017</td>
                <table-data :value="project.investment_target_2017" />
                <table-data :value="project.infrastructure_target_2017" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2018 && project.target_end_year >= 2018"> -->
              <tr>
                <td>2018</td>
                <table-data :value="project.investment_target_2018" />
                <table-data :value="project.infrastructure_target_2018" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2019 && project.target_end_year >= 2019"> -->
              <tr>
                <td>2019</td>
                <table-data :value="project.investment_target_2019" />
                <table-data :value="project.infrastructure_target_2019" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2020 && project.target_end_year >= 2020"> -->
              <tr>
                <td>2020</td>
                <table-data :value="project.investment_target_2020" />
                <table-data :value="project.infrastructure_target_2020" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2021 && project.target_end_year >= 2021"> -->
              <tr>
                <td>2021</td>
                <table-data :value="project.investment_target_2021" />
                <table-data :value="project.infrastructure_target_2021" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2022 && project.target_end_year >= 2022"> -->
              <tr>
                <td>2022</td>
                <table-data :value="project.investment_target_2022" />
                <table-data :value="project.infrastructure_target_2022" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2023 && project.target_end_year >= 2023"> -->
              <tr>
                <td>2023 &amp; Beyond</td>
                <table-data :value="project.investment_target_2023" />
                <table-data :value="project.infrastructure_target_2023" />
              </tr>
              <tr>
                <td>Total</td>
                <table-data :value="project.investment_target_total" />
                <table-data :value="project.infrastructure_target_total" />
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <q-separator spaced />

        <div class="column q-mb-sm">
          <div class="text-weight-lighter text-subtitle1">
            IMPLEMENTATION RISK AND MITIGATION STRATEGY
          </div>
          <textarea-copy :value="riskAndStrategy"></textarea-copy>
        </div>

        <q-separator spaced />

        <div class="column">
          <section-header sectionTitle="Updates"></section-header>

          <q-markup-table class="col q-my-sm bg-transparent" flat bordered>
            <thead>
              <tr>
                <th>Year</th>
                <th>NEP</th>
                <th>GAA</th>
                <th>Disbursement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <!-- <tr v-if="project.target_start_year <= 2016 && project.target_end_year >= 2016"> -->
                <td>2016 &amp; Prior</td>
                <table-data :value="project.nep_2016"></table-data>
                <table-data :value="project.gaa_2016"></table-data>
                <table-data :value="project.disbursement_2016"></table-data>
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2017 && project.target_end_year >= 2017"> -->
              <tr>
                <td>2017</td>
                <table-data :value="project.nep_2017" />
                <table-data :value="project.gaa_2017" />
                <table-data :value="project.disbursement_2017" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2018 && project.target_end_year >= 2018"> -->
              <tr>
                <td>2018</td>
                <table-data :value="project.nep_2018" />
                <table-data :value="project.gaa_2018" />
                <table-data :value="project.disbursement_2018" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2019 && project.target_end_year >= 2019"> -->
              <tr>
                <td>2019</td>
                <table-data :value="project.nep_2019" />
                <table-data :value="project.gaa_2019" />
                <table-data :value="project.disbursement_2019" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2020 && project.target_end_year >= 2020"> -->
              <tr>
                <td>2020</td>
                <table-data :value="project.nep_2020" />
                <table-data :value="project.gaa_2020" />
                <table-data :value="project.disbursement_2020" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2021 && project.target_end_year >= 2021"> -->
              <tr>
                <td>2021</td>
                <table-data :value="project.nep_2021" />
                <table-data :value="project.gaa_2021" />
                <table-data :value="project.disbursement_2021" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2022 && project.target_end_year >= 2022"> -->
              <tr>
                <td>2022</td>
                <table-data :value="project.nep_2022" />
                <table-data :value="project.gaa_2022" />
                <table-data :value="project.disbursement_2022" />
              </tr>
              <!-- <tr v-if="project.target_start_year <= 2023 && project.target_end_year >= 2023"> -->
              <tr>
                <td>2023 &amp; Beyond</td>
                <table-data :value="project.nep_2023" />
                <table-data :value="project.gaa_2023" />
                <table-data :value="project.disbursement_2023" />
              </tr>
              <tr>
                <td>Total</td>
                <table-data :value="project.nep_total" />
                <table-data :value="project.gaa_total" />
                <table-data :value="project.disbursement_total" />
              </tr>
            </tbody>
          </q-markup-table>

          <div class="q-mt-sm">
            <div class="text-weight-lighter text-subtitle1">
              PROJECT UPDATE
            </div>
            <textarea-copy :value="projectUpdates"></textarea-copy>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="col-3">
        <div class="column bg-fao">
          <q-item-label header class="text-uppercase text-subtitle1"
            >Key Facts</q-item-label
          >
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Implementation Agency
              </q-item-label>
              <q-item-label class="text-body2">
                {{
                  project.operating_unit
                    ? project.operating_unit.name
                    : 'Not specified'
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Fund Source/Institution
              </q-item-label>
              <q-item-label class="text-body2">
                {{
                  project.main_funding_source
                    ? project.main_funding_source.name
                    : 'Not specified'
                }}
                <span
                  v-if="
                    project.main_funding_source_id === '2' ||
                      project.main_funding_source_id === '3'
                  "
                >
                  {{
                    project.funding_institution
                      ? `>> ${project.funding_institution.name}`
                      : ''
                  }}
                </span>
              </q-item-label>
              <q-item-label class="text-body2">
                through
                {{
                  project.implementation_mode
                    ? project.implementation_mode.name
                    : 'Not Specified'
                }}
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
                {{ project.total_project_cost | formatMoney }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Duration
              </q-item-label>
              <q-item-label class="text-body2">
                {{
                  project.target_start_year + ' - ' + project.target_end_year
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Beneficiaries
              </q-item-label>
              <q-item-label class="text-body2">
                {{
                  project.beneficiaries
                    ? project.beneficiaries
                    : 'Not specified'
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Coverage
              </q-item-label>
              <q-item-label class="text-body2">
                {{
                  project.spatial_coverage
                    ? project.spatial_coverage.name
                    : 'Not specified'
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Status
              </q-item-label>
              <q-item-label class="text-body2">
                {{
                  project.project_status
                    ? project.project_status.name
                    : 'Not specified'
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Processing Status
              </q-item-label>
              <q-item-label class="text-body2">
                <q-badge>
                  {{
                    project.processing_status
                      ? project.processing_status.name
                      : ''
                  }}
                </q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced />
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Created
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.creator ? project.creator.name : '' }}
              </q-item-label>
              <q-item-label caption>
                {{ project.created_at | formatDateTime }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Last Updated
              </q-item-label>
              <q-item-label class="text-body2">
                {{ project.updated_at | formatDateTime }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <q-list
          bordered
          class="q-mt-md"
          v-if="this.$route.fullPath.includes('validate')"
        >
          <q-item clickable>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="attach_file"></q-icon>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                View Endorsement Letter
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TableData from './TableData';
import { date } from 'quasar';
import TextareaCopy from './shared/TextareaCopy';
import SectionHeader from './shared/SectionHeader';

export default {
  components: { TableData, TextareaCopy, SectionHeader },
  name: 'ProjectProfile',
  props: ['project'],
  computed: {
    ...mapGetters('auth', ['isEncoder']),
    dark() {
      return this.$store.getters['settings/dark'];
    },
    riskAndStrategy() {
      return (
        this.project.implementation_risk +
        ' ' +
        this.project.mitigation_strategy
      );
    },
    projectUpdates() {
      if (this.project.updates) {
        const date = this.project.updates_date;
        return `As of ${date}, ${this.project.updates}.`;
      }
      return '';
    }
  },
  data() {
    return {
      copyData: '' // cannot be null
    };
  },
  methods: {
    doCopy(e) {
      console.log(e);
    }
  },
  filters: {
    formatDate(val) {
      // let newDate = new Date(val)
      if (!val) {
        return '';
      }

      return date.formatDate(val, 'MMM D, YYYY (ddd)');
    },
    formatDateTime(val) {
      if (!val) {
        return '';
      }
      return date.formatDate(val, 'MMM DD YYYY HH:mm:ss A');
    },
    formatMoney(val) {
      if (val) {
        return val.toLocaleString('en-GB', { maximumFractionDigits: 2 });
      }
      return 0.0;
    }
  }
};
</script>
