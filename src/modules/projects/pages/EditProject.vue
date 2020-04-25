<template>
  <page-container>
    <page-title title="Edit Project"></page-title>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail color="primary" size="50px"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
      <template v-if="error">
        <q-banner class="bg-grey-2">
          <template v-slot:avatar>
            <q-icon name="warning" color="red" />
          </template>
          {{ error }}
          <template v-slot:action>
            <q-btn
              flat
              label="GO TO PROJECTS"
              color="negative"
              to="/projects"
            ></q-btn>
          </template>
        </q-banner>
      </template>

      <template v-else>
        <div class="row">
          <div class="col-4">
            <pre>{{ project }}</pre>
          </div>
          <div class="col-8 q-col-gutter-y-sm">
            <text-input
              v-model="project.title"
              label="Project/Program Title"
              type="text"
							:rules="rules.required"
            />

            <div class="row">
              <radio-input
                v-model="project.type_id"
                label="PAP Type"
                :options="types"
                :recode="true"
              />

              <radio-input
                v-model="project.infrastructure"
                label="Infrastructure"
                :options="trueOrFalse"
              />
            </div>

            <text-input
              v-model="project.description"
              label="Description"
              type="textarea"
							:rules="rules.required"
            />

            <single-select
              v-model="project.typology_id"
              label="Typology"
              :options="typologies"
							:rules="rules.required"
            />

						<div class="row q-col-gutter-sm">
							<div class="col">
								<single-select v-model="project.target_start_year" label="Implementation Start" :options="years" :rules="rules.required"></single-select>
							</div>
							<div class="col">
								<single-select v-model="project.target_end_year" label="Implementation End" :options="filteredYears" :rules="rules.required"></single-select>
							</div>
						</div>

            <text-input v-model="project.goals" label="Goals" type="textarea" />

            <text-input
              v-model="project.outcomes"
              label="Outcomes"
              type="textarea"
            />

            <text-input
              v-model="project.purpose"
              label="Purpose"
              type="textarea"
            />

            <text-input
              v-model="project.expected_outputs"
              label="Expected Outputs"
              type="textarea"
							:rules="rules.required"
            />

            <text-input
              v-model="project.beneficiaries"
              label="Beneficiaries"
            ></text-input>

            <text-input
              v-model="project.employment_generated"
              label="Employment Generated"
            ></text-input>

            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <text-input
                  v-model="project.implementation_risk"
                  label="Implementation Risk"
                  type="textarea"
                />
              </div>
              <div class="col-6">
                <text-input
                  v-model="project.mitigation_strategy"
                  label="Mitigation Strategy"
                  type="textarea"
                />
              </div>
            </div>

            <single-select
              v-model="project.spatial_coverage_id"
              label="Spatial Coverage"
              :options="spatial_coverages"
            />

            <single-select
              v-model="project.operating_unit_id"
              label="Implementing Agency"
              :options="operating_units"
            />

            <single-select
              v-model="project.project_status_id"
              label="Project Status"
              :options="project_statuses"
            />

            <money-input
              v-model="project.total_project_cost"
              label="Total Project Cost"
            />

            <text-input
              v-model="project.updates"
              label="Updates"
              type="textarea"
            />

						<div class="col">
							<span class="text-caption text-weight-bold">GAD Score</span>
							<q-input type="number" v-model="project.gad_score" readonly outlined>
								<template v-slot:append>
									<q-icon name="format_list_numbered" @click="showGadForm = true"></q-icon>
								</template>
							</q-input>
						</div>

						<q-dialog
							v-model="showGadForm"
							full-height
							:position="$q.screen.xs ? void 0 : 'right'"
							persistent
							:maximized="$q.screen.xs"
							transition-show="jump-left"
							transition-hide="jump-right">
							<q-card class="bg-white">
								<gad-form @update="updateGadScore" @close="showGadForm = false"></gad-form>
							</q-card>
						</q-dialog>

						<div class="column">
							<checkbox-input label="Agriculture and Fisheries Modernization and Industrialization Plan" v-model="project.afmip" />

							<checkbox-input label="Regional Development Investment Program" v-model="project.rdip" />

							<checkbox-input label="Provincial Commodity Investment Plan" v-model="project.pcip" />
						</div>

            <date-input v-model="project.updates_date" label="As of" />

						<single-select v-model="project.main_funding_source_id" label="Main Funding Source" :options="funding_sources_options"></single-select>

						<single-select v-model="project.funding_institution_id" label="Funding Institution" :options="funding_institutions_options"></single-select>

						<single-select v-model="project.implementation_mode_id" label="Implementation Mode" :options="implementation_modes"></single-select>

						<single-select v-model="project.tier_id" label="Budget Tier" :options="tiers"></single-select>

						<q-item-label header>Investment Requirements (in absolute PhP)</q-item-label>

            <div class="row">
              <q-markup-table flat bordered class="col bg-transparent">
                <thead>
                  <tr>
                    <th></th>
                    <th>Item</th>
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
                  <tr>
                    <td>
                      <q-icon
                        color="primary"
                        name="edit"
                        class="cursor-pointer"
                        @click="editTotalInvestmentDialog = true"
                      />
                    </td>
                    <td>Total</td>
                    <td class="text-right">
                      {{ project.investment_target_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{
                        (project.investment_target_2016 +
                          project.investment_target_2017 +
                          project.investment_target_2016 +
                          project.investment_target_2018 +
                          project.investment_target_2019 +
                          project.investment_target_2020 +
                          project.investment_target_2021 +
                          project.investment_target_2022 +
                          project.investment_target_2023)
                          | money
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <q-icon
                        color="primary"
                        name="edit"
                        class="cursor-pointer"
                        @click="editInfrastructureInvestmentDialog = true"
                      />
                    </td>
                    <td>Infrastructure</td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{
                        (project.infrastructure_target_2016 +
                          project.infrastructure_target_2017 +
                          project.infrastructure_target_2016 +
                          project.infrastructure_target_2018 +
                          project.infrastructure_target_2019 +
                          project.infrastructure_target_2020 +
                          project.infrastructure_target_2021 +
                          project.infrastructure_target_2022 +
                          project.infrastructure_target_2023)
                          | money
                      }}
                    </td>
                  </tr>
									<tr>
										<td>
											<q-icon
													color="primary"
													name="edit"
													class="cursor-pointer"
													@click="editNepDialog = true"
											/>
										</td>
										<td>NEP</td>
										<td class="text-right">
											{{ project.nep_2016 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2017 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2018 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2019 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2020 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2021 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2022 | money }}
										</td>
										<td class="text-right">
											{{ project.nep_2023 | money }}
										</td>
										<td class="text-right">
											{{
											(project.nep_2016 +
											project.nep_2017 +
											project.nep_2016 +
											project.nep_2018 +
											project.nep_2019 +
											project.nep_2020 +
											project.nep_2021 +
											project.nep_2022 +
											project.nep_2023)
											| money
											}}
										</td>
									</tr>
									<tr>
										<td>
											<q-icon
													color="primary"
													name="edit"
													class="cursor-pointer"
													@click="editGaaDialog = true"
											/>
										</td>
										<td>GAA</td>
										<td class="text-right">
											{{ project.gaa_2016 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2017 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2018 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2019 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2020 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2021 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2022 | money }}
										</td>
										<td class="text-right">
											{{ project.gaa_2023 | money }}
										</td>
										<td class="text-right">
											{{
											(project.gaa_2016 +
											project.gaa_2017 +
											project.gaa_2016 +
											project.gaa_2018 +
											project.gaa_2019 +
											project.gaa_2020 +
											project.gaa_2021 +
											project.gaa_2022 +
											project.gaa_2023)
											| money
											}}
										</td>
									</tr>
									<tr>
										<td>
											<q-icon
													color="primary"
													name="edit"
													class="cursor-pointer"
													@click="editDisbursementDialog = true"
											/>
										</td>
										<td>Disbursement</td>
										<td class="text-right">
											{{ project.disbursement_2016 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2017 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2018 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2019 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2020 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2021 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2022 | money }}
										</td>
										<td class="text-right">
											{{ project.disbursement_2023 | money }}
										</td>
										<td class="text-right">
											{{
											(project.disbursement_2016 +
											project.disbursement_2017 +
											project.disbursement_2016 +
											project.disbursement_2018 +
											project.disbursement_2019 +
											project.disbursement_2020 +
											project.disbursement_2021 +
											project.disbursement_2022 +
											project.disbursement_2023)
											| money
											}}
										</td>
									</tr>
                </tbody>
              </q-markup-table>

              <q-dialog
                v-model="editTotalInvestmentDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <q-toolbar class="bg-info text-white">
                    <q-toolbar-title class="absolute-center text-subtitle1"
                      >Total Investment Target</q-toolbar-title
                    >
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      @click="editTotalInvestmentDialog = false"
                    ></q-btn>
                  </q-toolbar>
                  <q-separator />
                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.investment_target_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input
                      v-model="project.investment_target_2017"
                      label="2017"
                    />
                    <money-input
                      v-model="project.investment_target_2018"
                      label="2018"
                    />
                    <money-input
                      v-model="project.investment_target_2019"
                      label="2019"
                    />
                    <money-input
                      v-model="project.investment_target_2020"
                      label="2020"
                    />
                    <money-input
                      v-model="project.investment_target_2021"
                      label="2021"
                    />
                    <money-input
                      v-model="project.investment_target_2022"
                      label="2022"
                    />
                    <money-input
                      v-model="project.investment_target_2023"
                      label="2023 &amp; Beyond"
                    />
                  </div>
                  <q-card-actions>
                    <q-btn
                      class="col"
                      label="Close"
                      color="primary"
                      @click="editTotalInvestmentDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog
                v-model="editInfrastructureInvestmentDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <q-toolbar class="bg-info text-white">
                    <q-toolbar-title class="absolute-center text-subtitle1"
                      >Infrastructure Investment Target</q-toolbar-title
                    >
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      @click="editInfrastructureInvestmentDialog = false"
                    ></q-btn>
                  </q-toolbar>
                  <q-separator />
                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.infrastructure_target_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2017"
                      label="2017"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2018"
                      label="2018"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2019"
                      label="2019"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2020"
                      label="2020"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2021"
                      label="2021"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2022"
                      label="2022"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2023"
                      label="2023 &amp; Beyond"
                    />
                  </div>
                  <q-card-actions>
                    <q-btn
                      class="col"
                      label="Close"
                      color="primary"
                      @click="editInfrastructureInvestmentDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

							<q-dialog
									v-model="editNepDialog"
									full-height
									:position="$q.screen.xs ? void 0 : 'right'"
									persistent
									:maximized="$q.screen.xs"
									transition-show="jump-left"
									transition-hide="jump-right"
							>
								<q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
									<q-toolbar class="bg-info text-white">
										<q-toolbar-title class="absolute-center text-subtitle1"
										>National Expenditure Program</q-toolbar-title
										>
										<q-space />
										<q-btn
												flat
												round
												dense
												icon="close"
												@click="editNepDialog = false"
										></q-btn>
									</q-toolbar>
									<q-separator />
									<div class="q-pa-sm q-gutter-y-sm">
										<money-input
												v-model="project.nep_2016"
												label="2016 &amp; Prior"
										/>
										<money-input
												v-model="project.nep_2017"
												label="2017"
										/>
										<money-input
												v-model="project.nep_2018"
												label="2018"
										/>
										<money-input
												v-model="project.nep_2019"
												label="2019"
										/>
										<money-input
												v-model="project.nep_2020"
												label="2020"
										/>
										<money-input
												v-model="project.nep_2021"
												label="2021"
										/>
										<money-input
												v-model="project.nep_2022"
												label="2022"
										/>
										<money-input
												v-model="project.nep_2023"
												label="2023 &amp; Beyond"
										/>
									</div>
									<q-card-actions>
										<q-btn
												class="col"
												label="Close"
												color="primary"
												@click="editNepDialog = false"
										></q-btn>
									</q-card-actions>
								</q-card>
							</q-dialog>

							<q-dialog
									v-model="editGaaDialog"
									full-height
									:position="$q.screen.xs ? void 0 : 'right'"
									persistent
									:maximized="$q.screen.xs"
									transition-show="jump-left"
									transition-hide="jump-right"
							>
								<q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
									<q-toolbar class="bg-info text-white">
										<q-toolbar-title class="absolute-center text-subtitle1"
										>General Appropriations Act (GAA)</q-toolbar-title
										>
										<q-space />
										<q-btn
												flat
												round
												dense
												icon="close"
												@click="editGaaDialog = false"
										></q-btn>
									</q-toolbar>
									<q-separator />
									<div class="q-pa-sm q-gutter-y-sm">
										<money-input
												v-model="project.gaa_2016"
												label="2016 &amp; Prior"
										/>
										<money-input
												v-model="project.gaa_2017"
												label="2017"
										/>
										<money-input
												v-model="project.gaa_2018"
												label="2018"
										/>
										<money-input
												v-model="project.gaa_2019"
												label="2019"
										/>
										<money-input
												v-model="project.gaa_2020"
												label="2020"
										/>
										<money-input
												v-model="project.gaa_2021"
												label="2021"
										/>
										<money-input
												v-model="project.gaa_2022"
												label="2022"
										/>
										<money-input
												v-model="project.gaa_2023"
												label="2023 &amp; Beyond"
										/>
									</div>
									<q-card-actions>
										<q-btn
												class="col"
												label="Close"
												color="primary"
												@click="editGaaDialog = false"
										></q-btn>
									</q-card-actions>
								</q-card>
							</q-dialog>

							<q-dialog
									v-model="editDisbursementDialog"
									full-height
									:position="$q.screen.xs ? void 0 : 'right'"
									persistent
									:maximized="$q.screen.xs"
									transition-show="jump-left"
									transition-hide="jump-right"
							>
								<q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
									<q-toolbar class="bg-info text-white">
										<q-toolbar-title class="absolute-center text-subtitle1"
										>Disbursement</q-toolbar-title
										>
										<q-space />
										<q-btn
												flat
												round
												dense
												icon="close"
												@click="editDisbursementDialog = false"
										></q-btn>
									</q-toolbar>
									<q-separator />
									<div class="q-pa-sm q-gutter-y-sm">
										<money-input
												v-model="project.disbursement_2016"
												label="2016 &amp; Prior"
										/>
										<money-input
												v-model="project.disbursement_2017"
												label="2017"
										/>
										<money-input
												v-model="project.disbursement_2018"
												label="2018"
										/>
										<money-input
												v-model="project.disbursement_2019"
												label="2019"
										/>
										<money-input
												v-model="project.disbursement_2020"
												label="2020"
										/>
										<money-input
												v-model="project.disbursement_2021"
												label="2021"
										/>
										<money-input
												v-model="project.disbursement_2022"
												label="2022"
										/>
										<money-input
												v-model="project.disbursement_2023"
												label="2023 &amp; Beyond"
										/>
									</div>
									<q-card-actions>
										<q-btn
												class="col"
												label="Close"
												color="primary"
												@click="editDisbursementDialog = false"
										></q-btn>
									</q-card-actions>
								</q-card>
							</q-dialog>
            </div>
          </div>
        </div>
      </template>
    </template>
  </page-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageTitle from '../../shared/components/PageTitle';
import { FETCH_PROJECT_QUERY } from '../../../graphql/queries';
import PageContainer from '../../shared/components/PageContainer';
import TextInput from '../../shared/components/form-inputs/TextInput';
import RadioInput from '../../shared/components/form-inputs/RadioInput';
import SingleSelect from '../../shared/components/form-inputs/SingleSelect';
import MoneyInput from '../../shared/components/form-inputs/MoneyInput';
import DateInput from '../../shared/components/form-inputs/DateInput';
import CheckboxInput from '../../shared/components/form-inputs/CheckboxInput';
import GadForm from '../../../components/GenderResponsiveness/Form';

export default {
  components: {
	  GadForm,
	  CheckboxInput,
    DateInput,
    MoneyInput,
    SingleSelect,
    RadioInput,
    TextInput,
    PageContainer,
    PageTitle
  },
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      result({ data }) {
        console.log(data);
        if (data.project === null) {
          this.error = 'Project not found.';
        }
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState('options', [
    	'funding_sources_options',
      'funding_institutions_options',
      'implementation_modes',
      'types',
      'typologies',
      'project_statuses',
      'spatial_coverages',
      'operating_units',
			'years',
			'tiers'
    ]),
	  filteredYears() {
		  const years = this.years;
		  const start = this.target_start_year;

		  let filteredYears = [];

		  if (start) {
			  filteredYears = years.filter(year => year.id >= start);

			  return filteredYears;
		  }
		  return years;
	  }
  },
  data() {
    return {
      project: {},
      trueOrFalse: [
        {
          label: 'No',
          value: false
        },
        {
          label: 'Yes',
          value: true
        }
      ],
	    showGadForm: false,
      editTotalInvestmentDialog: false,
      editInfrastructureInvestmentDialog: false,
			editNepDialog: false,
			editGaaDialog: false,
	    editDisbursementDialog: false,
      error: null,
			rules: {
      	required: [ val => !!val || '* Required' ]
			}
    };
  },
  name: 'PageEditProject',
  methods: {
    ...mapActions('project', ['updateProject']),
	  updateGadScore(e) {
    	this.project.gad_score = e;
		  this.showGadForm = false;
		}
  },
  filters: {
    money(val) {
      if (!val) {
        return 0.0;
      }
      return val.toFixed(2).toLocaleString();
    }
  }
};
</script>
