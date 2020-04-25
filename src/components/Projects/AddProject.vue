<template>
  <q-card square flat>
    <card-header>
      Add Project
      <template v-slot:right>
        <q-btn flat round icon="help" @click="$emit('showHelp')" />
      </template>
    </card-header>

    <q-form class="q-pa-md q-gutter-md">
      <div class="row justify-around">
        GENERAL INFORMATION
        <q-space />
        <q-btn
          dense
          label="Expand All"
          color="primary"
          @click="expanded = !expanded"
        />
      </div>

      <q-expansion-item
        v-model="expanded"
        expand-separator
        icon="layers"
        label="Programming Documents"
        caption="Documents where the PAP are included"
        default-opened
      >
        <q-card>
          <q-item-label header>
            Programming Documents
          </q-item-label>
          <q-list>
            <checkbox-item
              v-model="projectToSubmit.pip"
              label="PIP"
              description="Public Investment Program"
            />
            <checkbox-item
              v-model="projectToSubmit.cip"
              label="CIP"
              description="Core Investment Program"
            />
            <checkbox-item
              v-model="projectToSubmit.trip"
              label="TRIP"
              description="Three-Year Rolling Investment Program"
            />
            <checkbox-item
              v-model="projectToSubmit.rdip"
              label="RDIP"
              description="Regional Development Investment Program"
            />
            <checkbox-item
              v-model="projectToSubmit.pcip"
              label="PCIP"
              description="Provincial Commodity Investment Plan"
            />
            <checkbox-item
              v-model="projectToSubmit.afmip"
              label="AFMIP"
              description="Agriculture and Fisheries Modernization and Industrialization Plan"
            />
          </q-list>
        </q-card>
      </q-expansion-item>

      <q-card>
        <q-item-label header>
          General Information
        </q-item-label>
        <q-item>
          <text-input
            v-model="projectToSubmit.title"
            label="Program/Project Title"
            :dense="dense"
            hint="The title of the program or project"
            maxlength="250"
            required
          />
        </q-item>
        <q-item>
          <q-option-group
            v-model="projectToSubmit.type_id"
            label="Type"
            :options="TYPES"
            inline
            :dense="dense"
            color="orange-10"
          />
        </q-item>
        <q-item>
          <single-select
            v-model="projectToSubmit.operating_unit_id"
            label="Implementing Agency"
            :dense="dense"
            :options-dense="dense"
            :options="OPERATING_UNITS"
            hint="Proponent of the program/project"
          />
        </q-item>
        <q-item>
          <single-select
            v-model="projectToSubmit.typology_id"
            label="Typology"
            :dense="dense"
            :options-dense="dense"
            :options="TYPOLOGIES"
          ></single-select>
        </q-item>
        <q-item>
          <single-select
            v-model="projectToSubmit.implementation_mode_id"
            label="Implementation Mode"
            :dense="dense"
            :options-dense="dense"
            :options="IMPLEMENTATION_MODES"
          />
        </q-item>
        <q-item>
          <single-select
            v-model="projectToSubmit.tier_id"
            label="Tier"
            :dense="dense"
            :options-dense="dense"
            :options="TIERS"
          />
        </q-item>
      </q-card>

      <multi-select
        label="Implementation Bases"
        v-model="projectToSubmit.bases"
        :options-dense="dense"
        :options="IMPLEMENTATION_BASES"
        @clear="projectToSubmit.bases = []"
      ></multi-select>

      <q-card>
        <q-list>
          <q-item-label header>
            Additional Information
          </q-item-label>
          <q-item>
            <text-input
              v-model="projectToSubmit.description"
              label="Description"
              type="textarea"
              :dense="dense"
              hint="Description of the program/project (e.g. location, components, design, etc.)"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="projectToSubmit.goals"
              label="Goals"
              type="textarea"
              :dense="dense"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="projectToSubmit.outcomes"
              label="Outcomes"
              type="textarea"
              :dense="dense"
              hint="Desired outcome of the program/project (e.g. Increase productivity)"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="projectToSubmit.purpose"
              label="Purpose"
              type="textarea"
              :dense="dense"
            />
          </q-item>

          <q-item>
            <text-input
              v-model="projectToSubmit.expected_outputs"
              label="Expected Outputs"
              type="textarea"
              :dense="dense"
              hint="Physical deliverables of the project (indicate unit)"
            />
          </q-item>
        </q-list>
      </q-card>

      <text-input
        label="Beneficiaries"
        v-model="projectToSubmit.beneficiaries"
      />

      <text-input
        outlined
        stack-label
        label="Employment Generated"
        v-model="projectToSubmit.employment_generated"
      />

      <single-select
        v-model="projectToSubmit.spatial_coverage_id"
        label="Spatial Coverage"
        :dense="dense"
        :options-dense="dense"
        :options="SPATIAL_COVERAGES"
      />

      <multi-select
        v-model="projectToSubmit.provinces"
        label="Province/s"
        :options="filteredProvinces"
        :dense="dense"
        :options-dense="dense"
        :readonly="projectToSubmit.spatial_coverage_id == '1'"
      />

      <text-input
        type="textarea"
        label="Cities and Municipalities"
        v-model="projectToSubmit.cities_municipalities"
      />

      <div class="q-ml-md">
        <div class="row q-col-gutter-md">
          <single-select
            class="col-6"
            v-model="projectToSubmit.target_start_year"
            label="Target Start Year"
            :options="YEARS"
            :dense="dense"
            :options-dense="dense"
          />

          <single-select
            class="col-6"
            v-model="projectToSubmit.target_end_year"
            label="Target Completion Year"
            :options="YEARS"
            :dense="dense"
            :options-dense="dense"
          />
        </div>
      </div>

      <div class="q-ml-md">
        <div class="row q-col-gutter-md">
          <date-input
            class="col-6"
            v-model="projectToSubmit.implementation_start_date"
            mask="date"
            label="Implementation Start Date"
            :dense="dense"
            hint="Indicate what year the project is expected to start."
          />

          <date-input
            class="col-6"
            v-model="projectToSubmit.implementation_end_date"
            mask="date"
            label="Implementation End Date"
            :dense="dense"
            hint="Indicate the date when the project is expected to start."
          />
        </div>
      </div>

      <single-select
        v-model="projectToSubmit.project_status_id"
        label="Status"
        :dense="dense"
        :options-dense="dense"
        :options="STATUSES"
      />

      <number-input
        label="GAD Score"
        type="number"
        v-model="projectToSubmit.gad_score"
      />

      <money-input
        label="Total Project Cost"
        outlined
        prefix="PhP"
        v-model="projectToSubmit.total_project_cost"
        :dense="dense"
        hint="Indicative project cost in absolute PhP"
      ></money-input>

      <text-input
        label="Implementation Risks"
        type="textarea"
        v-model="projectToSubmit.implementation_risk"
      />

      <text-input
        label="Mitigation Strategies"
        type="textarea"
        v-model="projectToSubmit.mitigation_strategy"
      />

      <q-item-label header>CIP Processing Status</q-item-label>

      <multi-select
        label="Technical Readiness"
        v-model="projectToSubmit.technical_readinesses"
        :options="TECHNICAL_READINESSES"
      ></multi-select>

      <div class="row">
        <checkbox-input
          class="col-6"
          v-model="projectToSubmit.clearinghouse"
          label="Approved by DA Clearinghouse"
        />
        <date-input
          class="col-6"
          label="Date Approved by Clearinghouse Committee"
          v-model="projectToSubmit.clearinghouse_date"
        />
      </div>

      <div class="row">
        <checkbox-input
          class="col-6"
          v-model="projectToSubmit.neda_submission"
          label="NEDA Submission"
        />
        <date-input
          class="col-6"
          label="Date submitted to NEDA"
          v-model="projectToSubmit.neda_submission_date"
        />
      </div>

      <div class="row">
        <checkbox-input
          class="col-6"
          v-model="projectToSubmit.neda_secretariat_review"
          label="NEDA Secretariat Review"
        />
        <date-input
          class="col-6"
          label="Date reviewed by NEDA Secretariat"
          v-model="projectToSubmit.neda_secretariat_review_date"
        />
      </div>

      <div class="row">
        <checkbox-input
          class="col-6"
          v-model="projectToSubmit.icc_endorsed"
          label="ICC Endorsed"
        />
        <date-input
          class="col-6"
          label="Date endorsed by ICC"
          v-model="projectToSubmit.icc_endorsed_date"
        />
      </div>

      <div class="row">
        <checkbox-input
          class="col-6"
          v-model="projectToSubmit.icc_approved"
          label="ICC Approved"
        />
        <date-input
          class="col-6"
          label="Date approved by the ICC"
          v-model="projectToSubmit.icc_approved_date"
        />
      </div>

      <div class="row">
        <checkbox-input
          class="col-6"
          v-model="projectToSubmit.neda_board"
          label="NEDA Board"
        />
        <date-input
          class="col-6"
          label="Date approved by the NEDA Board"
          v-model="projectToSubmit.neda_board_date"
        />
      </div>

      <q-item-label header>Financial and Economic Analyses</q-item-label>

      <text-input
        label="Estimated Project Life"
        v-model="projectToSubmit.estimated_project_life"
      />

      <div class="q-ml-md">
        <div class="row q-col-gutter-md">
          <div class="col-6 q-gutter-y-md">
            <money-input
              label="Financial Net Present Value (FNPV)"
              v-model="projectToSubmit.financial_net_present_value"
              :dense="dense"
            ></money-input>

            <number-input
              label="Financial Benefit-Cost Ratio (FBCR)"
              v-model="projectToSubmit.financial_benefit_cost_ratio"
              :dense="dense"
            />

            <number-input
              label="Financial Internal Rate of Return (FIRR)"
              v-model="projectToSubmit.financial_internal_rate_return"
              :dense="dense"
              suffix="%"
            />
          </div>

          <div class="col-6 q-gutter-y-md">
            <money-input
              label="Economic Net Present Value (ENPV)"
              v-model="projectToSubmit.economic_net_present_value"
              :dense="dense"
            ></money-input>

            <number-input
              label="Economic Benefit-Cost Ratio (EBCR)"
              v-model="projectToSubmit.economic_benefit_cost_ratio"
              :dense="dense"
            />

            <number-input
              label="Economic Internal Rate Return (EIRR)"
              v-model="projectToSubmit.economic_internal_rate_return"
              :dense="dense"
              suffix="%"
            />
          </div>
        </div>
      </div>

      <q-item-label header>
        Investment by Fund Source
        <q-icon
          name="edit"
          @click="addFundSource"
          class="cursor-pointer"
          color="primary"
        />
      </q-item-label>

      <q-markup-table
        v-if="projectToSubmit.funding_sources.length"
        flat
        bordered
        separator="cell"
      >
        <thead>
          <th>Fund Source</th>
          <th>2016</th>
          <th>2017</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
          <th>2022</th>
          <th>2023</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr
            v-for="funding_source in projectToSubmit.funding_sources"
            :key="funding_source.item.value"
          >
            <th>{{ funding_source.item.label }}</th>
            <th>{{ funding_source.target_2016 }}</th>
            <th>{{ funding_source.target_2017 }}</th>
            <th>{{ funding_source.target_2018 }}</th>
            <th>{{ funding_source.target_2019 }}</th>
            <th>{{ funding_source.target_2020 }}</th>
            <th>{{ funding_source.target_2021 }}</th>
            <th>{{ funding_source.target_2022 }}</th>
            <th>{{ funding_source.target_2023 }}</th>
            <th>{{ funding_source.target_total }}</th>
          </tr>
        </tbody>
      </q-markup-table>

      <q-dialog persistent v-model="addFundSourceDialog">
        <fund-source
          :item.sync="fundSourceToAdd"
          @add="addToFundSource"
          @close="addFundSourceDialog = false"
        />
      </q-dialog>

      <q-item-label header>
        Regional Investment
        <q-icon
          name="edit"
          @click="addRegion"
          label="Add Region"
          class="cursor-pointer"
          color="primary"
        />
      </q-item-label>

      <q-markup-table
        v-if="projectToSubmit.regions.length"
        flat
        bordered
        separator="cell"
      >
        <thead>
          <th>Region</th>
          <th>2016</th>
          <th>2017</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
          <th>2022</th>
          <th>2023</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr
            v-for="region in projectToSubmit.regions"
            :key="region.item.value"
          >
            <th>{{ region.item.label }}</th>
            <th>{{ region.target_2016 }}</th>
            <th>{{ region.target_2017 }}</th>
            <th>{{ region.target_2018 }}</th>
            <th>{{ region.target_2019 }}</th>
            <th>{{ region.target_2020 }}</th>
            <th>{{ region.target_2021 }}</th>
            <th>{{ region.target_2022 }}</th>
            <th>{{ region.target_2023 }}</th>
            <th>{{ region.target_total }}</th>
          </tr>
        </tbody>
      </q-markup-table>

      <q-dialog persistent v-model="addRegionDialog">
        <add-item
          :item.sync="regionToAdd"
          @add="addToRegion"
          @close="addRegionDialog = false"
        />
      </q-dialog>

      <q-item-label header>
        Physical &amp; Financial Accomplishments
        <q-icon
          name="edit"
          color="primary"
          class="cursor-pointer"
          @click="updateFinancialAccomplishmentDialog = true"
        ></q-icon>
      </q-item-label>

      <q-markup-table flat bordered separator="cell">
        <thead>
          <th style="width:25%">Year</th>
          <th style="width:25%">NEP</th>
          <th style="width:25%">GAA</th>
          <th style="width:25%">Disbursement</th>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">2017</td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_2017 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_2017 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_2017 }}
            </td>
          </tr>
          <tr>
            <td class="text-center">2018</td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_2018 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_2018 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_2018 }}
            </td>
          </tr>
          <tr>
            <td class="text-center">2019</td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_2019 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_2019 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_2019 }}
            </td>
          </tr>
          <tr>
            <td class="text-center">2020</td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_2020 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_2020 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_2020 }}
            </td>
          </tr>
          <tr>
            <td class="text-center">2021</td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_2021 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_2021 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_2021 }}
            </td>
          </tr>
          <tr>
            <td class="text-center">2022</td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_2022 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_2022 }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_2022 }}
            </td>
          </tr>
          <!-- <tr>
            <th>Total</th>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.nep_total }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.gaa_total }}
            </td>
            <td class="text-right">
              {{ projectToSubmit.financialAccomplishment.disbursement_total }}
            </td>
          </tr> -->
        </tbody>
      </q-markup-table>

      <q-dialog v-model="updateFinancialAccomplishmentDialog" persistent>
        <financial-accomplishment
          :data.sync="projectToSubmit.financialAccomplishment"
          @close="updateFinancialAccomplishmentDialog = false"
        />
      </q-dialog>

      <div class="q-ml-md">
        <div class="row items-start q-col-gutter-md">
          <text-input
            class="col-9"
            label="Updates"
            type="textarea"
            v-model="projectToSubmit.updates"
          />

          <date-input
            class="col-3"
            label="As of Date"
            v-model="projectToSubmit.updates_date"
          ></date-input>
        </div>
      </div>
    </q-form>

    <card-actions>
      <q-btn label="Save" @click="$emit('save')" color="primary" />
    </card-actions>
  </q-card>
</template>

<script>
import {
  IMPLEMENTATION_BASES,
  IMPLEMENTATION_MODES,
  SPATIAL_COVERAGES,
  STATUSES,
  TIERS,
  TYPES,
  TYPOLOGIES,
  OPERATING_UNITS,
  TECHNICAL_READINESSES,
  YEARS
} from '../../data/dropdown-values';

export default {
  components: {
    'card-header': () => import('./Shared/CardHeader.vue'),
    'card-actions': () => import('./Shared/CardActions.vue'),
    'single-select': () => import('../../modules/shared/components/form-inputs/SingleSelect.vue'),
    'multi-select': () => import('../../modules/shared/components/form-inputs/MultiSelect.vue'),
    'date-input': () => import('../../modules/shared/components/form-inputs/DateInput.vue'),
    'money-input': () => import('../../modules/shared/components/form-inputs/MoneyInput.vue'),
    'number-input': () => import('../../modules/shared/components/form-inputs/NumberInput.vue'),
    'text-input': () => import('../../modules/shared/components/form-inputs/TextInput.vue'),
    'add-item': () => import('./Shared/AddItem.vue'),
    'fund-source': () => import('./Shared/FundSourceForm.vue'),
    'checkbox-input': () => import('../../modules/shared/components/form-inputs/CheckboxInput.vue'),
    'checkbox-item': () => import('../../modules/shared/components/form-inputs/CheckboxItem.vue'),
    'financial-accomplishment': () =>
      import('./Shared/FinancialAccomplishment.vue')
  },
  name: 'AddProject',
  props: ['project'],
  data() {
    return {
      expanded: true,
      IMPLEMENTATION_BASES,
      IMPLEMENTATION_MODES,
      OPERATING_UNITS,
      SPATIAL_COVERAGES,
      STATUSES,
      TECHNICAL_READINESSES,
      TIERS,
      TYPES,
      TYPOLOGIES,
      YEARS,
      filteredProvinces: [],
      dense: false,
      addRegionDialog: false,
      fundSourceToAdd: {
        item: {
          label: '',
          value: ''
        },
        target_2016: '',
        target_2017: '',
        target_2018: '',
        target_2019: '',
        target_2020: '',
        target_2021: '',
        target_2022: '',
        target_2023: '',
        target_total: ''
      },
      regionToAdd: {
        item: {
          label: '',
          value: ''
        },
        target_2016: '',
        target_2017: '',
        target_2018: '',
        target_2019: '',
        target_2020: '',
        target_2021: '',
        target_2022: '',
        target_2023: '',
        target_total: ''
      },
      financialAccomplishment: {
        nep_2017: '',
        nep_2018: '',
        nep_2019: '',
        nep_2020: '',
        nep_2021: '',
        nep_2022: '',
        nep_total: '',
        gaa_2017: '',
        gaa_2018: '',
        gaa_2019: '',
        gaa_2020: '',
        gaa_2021: '',
        gaa_2022: '',
        gaa_total: '',
        disbursement_2017: '',
        disbursement_2018: '',
        disbursement_2019: '',
        disbursement_2020: '',
        disbursement_2021: '',
        disbursement_2022: '',
        disbursement_total: ''
      },
      updateFinancialAccomplishmentDialog: false,
      addFundSourceDialog: false
    };
  },
  computed: {
    projectToSubmit: {
      get() {
        return this.project;
      },
      set(projectToSubmit) {
        this.$emit('update', projectToSubmit);
      }
    }
  },
  methods: {
    addRegion() {
      this.addRegionDialog = true;
    },
    addToRegion() {
      this.projectToSubmit.regions.push({
        ...this.regionToAdd
      });
      this.addRegionDialog = false;
    },
    addFundSource() {
      this.addFundSourceDialog = true;
    },
    addToFundSource() {
      this.projectToSubmit.funding_sources.push({
        ...this.fundSourceToAdd
      });
      this.addFundSourceDialog = false;
    }
  }
};
</script>

<style>
.q-table th,
.q-table td {
  padding: 5px !important;
}
</style>
