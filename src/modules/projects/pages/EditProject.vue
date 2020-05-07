<template>
  <page-container>
    <page-title title="Edit Project"></page-title>

		{{ project }}

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
        <div class="row q-pa-sm">
          <div class="q-col-gutter-y-sm">
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
                <single-select
                  v-model="project.target_start_year"
                  label="Implementation Start"
                  :options="years"
                  :rules="rules.required"
                ></single-select>
              </div>
              <div class="col">
                <single-select
                  v-model="project.target_end_year"
                  label="Implementation End"
                  :options="filteredYears"
                  :rules="rules.required"
                ></single-select>
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

						<q-card class="q-my-sm q-pa-sm q-gutter-y-sm">

							<q-item-label header>Spatial Coverage</q-item-label>

							<single-select
								v-model="project.spatial_coverage_id"
								label="Spatial Coverage"
								:options="spatial_coverages"
							/>

							<list-option-group
								label="Regions"
								v-model="project.selected_regions"
								:options="regions_options"
								:recode="true"
								v-if="project.spatial_coverage_id === '2'"
							/>

							<single-select
								label="Region"
								v-model="project.region_id"
								:options="regions_options"
								v-if="project.spatial_coverage_id === '3'"
							/>

							<single-select
								label="Province"
								v-model="project.province_id"
								:options="provinces"
								v-if="project.spatial_coverage_id === '4'"/>

							<single-select
								label="District"
								v-model="project.district_id"
								:options="districts"
								v-if="project.spatial_coverage_id === '5'"/>

							<single-select
								label="City/Municipality"
								v-model="project.city_municipality_id"
								:options="city_municipalities"
								v-if="project.spatial_coverage_id === '6'"/>

						</q-card>

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

						<div class="row q-col-gutter-sm">

							<div class="col-3">
								<single-select
									label="Currency"
									v-model="project.currency_id"
									:options="currencies"/>
							</div>

							<div class="col-9">
								<money-input
									v-model="project.total_project_cost"
									label="Total Project Cost"
								/>
							</div>

						</div>

						<q-card class="q-my-sm q-pa-sm q-gutter-y-sm">

							<q-item-label header>Technical Readiness</q-item-label>

							<div class="row">
								<div class="col">
									<checkbox-input label="Approved by DA-wide Clearinghouse" v-model="project.clearinghouse"></checkbox-input>
								</div>
								<div class="col">
									<date-input v-model="project.clearinghouse_date"></date-input>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<checkbox-input label="NEDA Submission" v-model="project.neda_submission"></checkbox-input>
								</div>
								<div class="col">
									<date-input v-model="project.neda_submission_date"></date-input>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<checkbox-input label="NEDA Secretariat Review" v-model="project.neda_secretariat_review"></checkbox-input>
								</div>
								<div class="col">
									<date-input v-model="project.neda_secretariat_review_date"></date-input>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<checkbox-input label="NEDA Board" v-model="project.neda_board"></checkbox-input>
								</div>
								<div class="col">
									<date-input v-model="project.neda_board_date"></date-input>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<checkbox-input label="ICC Endorsed" v-model="project.icc_endorsed"></checkbox-input>
								</div>
								<div class="col">
									<date-input v-model="project.icc_endorsed_date"></date-input>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<checkbox-input label="ICC Approved" v-model="project.icc_approved"></checkbox-input>
								</div>
								<div class="col">
									<date-input v-model="project.icc_approved_date"></date-input>
								</div>
							</div>

						</q-card>

            <div class="col">
              <span class="text-caption text-weight-bold">GAD Score</span>
              <q-input
                type="number"
                v-model="project.gad_score"
                readonly
                outlined
              >
                <template v-slot:append>
                  <q-icon
                    name="format_list_numbered"
                    @click="showGadForm = true"
                    color="secondary"
                  ></q-icon>
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
              transition-hide="jump-right"
            >
              <q-card class="bg-white">
                <gad-form
                  @update="updateGadScore"
                  @close="showGadForm = false"
                ></gad-form>
              </q-card>
            </q-dialog>

            <div class="column">
              <checkbox-input
                label="Agriculture and Fisheries Modernization and Industrialization Plan"
                v-model="project.afmip"
              />

              <checkbox-input
                label="Regional Development Investment Program"
                v-model="project.rdip"
              />

              <checkbox-input
                label="Provincial Commodity Investment Plan"
                v-model="project.pcip"
              />
            </div>

            <text-input
              v-model="project.updates"
              label="Updates"
              type="textarea"
            />

            <date-input v-model="project.updates_date" label="As of" />

            <single-select
              v-model="project.main_funding_source_id"
              label="Main Funding Source"
              :options="funding_sources_options"
            ></single-select>

            <single-select
              v-model="project.funding_institution_id"
              label="Funding Institution"
              :options="funding_institutions"
							v-if="project.main_funding_source_id === '2' || project.main_funding_source_id === '3'"
            ></single-select>

            <single-select
              v-model="project.implementation_mode_id"
              label="Implementation Mode"
              :options="implementation_modes"
            ></single-select>

            <single-select
              v-model="project.tier_id"
              label="Budget Tier"
              :options="tiers"
            ></single-select>

						<q-item tag="label">
							<q-item-section avatar>
								<q-checkbox v-model="project.has_row"/>
							</q-item-section>
							<q-item-section>
								<q-item-label>Right of Way</q-item-label>
							</q-item-section>
						</q-item>

						<div class="row" v-if="project.has_row">
							<q-markup-table flat bordered class="col bg-transparent">
								<thead>
								<tr>
									<th></th>
									<th>Right of Way</th>
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
									<td>
										<q-icon
												color="primary"
												name="edit"
												class="cursor-pointer"
												@click="editRowCostDialog = true"
										/>
									</td>
									<td>Total</td>
									<table-data :value="project.row_target_2017" />
									<table-data :value="project.row_target_2018" />
									<table-data :value="project.row_target_2019" />
									<table-data :value="project.row_target_2020" />
									<table-data :value="project.row_target_2021" />
									<table-data :value="project.row_target_2022" />
									<td class="text-right">
										{{
										(project.row_target_2017 +
										project.row_target_2018 +
										project.row_target_2019 +
										project.row_target_2020 +
										project.row_target_2021 +
										project.row_target_2022)
										| money
										}}
									</td>
								</tr>
								</tbody>
							</q-markup-table>
						</div>

						<!-- Edit Resettlement Action Plan Cost Dialog -->
						<q-dialog
								v-model="editRowCostDialog"
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
									>Right of Way</q-toolbar-title
									>
									<q-space />
									<q-btn
											flat
											round
											dense
											icon="close"
											@click="editRowCostDialog = false"
									></q-btn>
								</q-toolbar>
								<q-separator />
								<div class="q-pa-sm q-gutter-y-sm">
									<money-input
											v-model="project.row_target_2017"
											label="2017"
									/>
									<money-input
											v-model="project.row_target_2018"
											label="2018"
									/>
									<money-input
											v-model="project.row_target_2019"
											label="2019"
									/>
									<money-input
											v-model="project.row_target_2020"
											label="2020"
									/>
									<money-input
											v-model="project.row_target_2021"
											label="2021"
									/>
									<money-input
											v-model="project.row_target_2022"
											label="2022"
									/>
								</div>
								<q-card-actions>
									<q-btn
											class="col"
											label="Close"
											color="primary"
											@click="editRowCostDialog = false"
									></q-btn>
								</q-card-actions>
							</q-card>
						</q-dialog>

						<q-item tag="label">
							<q-item-section avatar>
								<q-checkbox v-model="project.has_rap"/>
							</q-item-section>
							<q-item-section>
								<q-item-label>Resettlement Action Plan</q-item-label>
							</q-item-section>
						</q-item>

						<div class="row" v-if="project.has_rap">
							<q-markup-table flat bordered class="col bg-transparent">
								<thead>
								<tr>
									<th></th>
									<th>Item</th>
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
									<td>
										<q-icon
												color="primary"
												name="edit"
												class="cursor-pointer"
												@click="editRapCostDialog = true"
										/>
									</td>
									<td>Total</td>
									<table-data :value="project.rap_target_2017" />
									<table-data :value="project.rap_target_2018" />
									<table-data :value="project.rap_target_2019" />
									<table-data :value="project.rap_target_2020" />
									<table-data :value="project.rap_target_2021" />
									<table-data :value="project.rap_target_2022" />
									<td class="text-right">
										{{
											(project.rap_target_2017 +
											project.rap_target_2018 +
											project.rap_target_2019 +
											project.rap_target_2020 +
											project.rap_target_2021 +
											project.rap_target_2022)
											| money
										}}
									</td>
								</tr>
								</tbody>
							</q-markup-table>
						</div>

						<!-- Edit Resettlement Action Plan Cost Dialog -->
						<q-dialog
							v-model="editRapCostDialog"
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
									>Resettlement Action Plan</q-toolbar-title
									>
									<q-space />
									<q-btn
											flat
											round
											dense
											icon="close"
											@click="editRapCostDialog = false"
									></q-btn>
								</q-toolbar>
								<q-separator />
								<div class="q-pa-sm q-gutter-y-sm">
									<money-input
											v-model="project.rap_target_2017"
											label="2017"
									/>
									<money-input
											v-model="project.rap_target_2018"
											label="2018"
									/>
									<money-input
											v-model="project.rap_target_2019"
											label="2019"
									/>
									<money-input
											v-model="project.rap_target_2020"
											label="2020"
									/>
									<money-input
											v-model="project.rap_target_2021"
											label="2021"
									/>
									<money-input
											v-model="project.rap_target_2022"
											label="2022"
									/>
								</div>
								<q-card-actions>
									<q-btn
											class="col"
											label="Close"
											color="primary"
											@click="editRapCostDialog = false"
									></q-btn>
								</q-card-actions>
							</q-card>
						</q-dialog>

						<q-item tag="label">
							<q-item-section avatar>
								<q-checkbox v-model="project.has_fs"/>
							</q-item-section>
							<q-item-section>
								<q-item-label>Feasibility Study</q-item-label>
							</q-item-section>
						</q-item>

						<div class="row" v-if="project.has_fs">
							<q-markup-table flat bordered class="col bg-transparent">
								<thead>
								<tr>
									<th></th>
									<th>Item</th>
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
									<td>
										<q-icon
												color="primary"
												name="edit"
												class="cursor-pointer"
												@click="editFSCostDialog = true"
										/>
									</td>
									<td>Total</td>
									<table-data :value="project.fs_target_2017" />
									<table-data :value="project.fs_target_2018" />
									<table-data :value="project.fs_target_2019" />
									<table-data :value="project.fs_target_2020" />
									<table-data :value="project.fs_target_2021" />
									<table-data :value="project.fs_target_2022" />
									<td class="text-right">
										{{
										(project.fs_target_2017 +
										project.fs_target_2018 +
										project.fs_target_2019 +
										project.fs_target_2020 +
										project.fs_target_2021 +
										project.fs_target_2022)
										| money
										}}
									</td>
								</tr>
								</tbody>
							</q-markup-table>
						</div>

						<!-- Edit Feasibility Study Cost Dialog -->
						<q-dialog
							v-model="editFSCostDialog"
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
									>Feasibility Study</q-toolbar-title
									>
									<q-space />
									<q-btn
											flat
											round
											dense
											icon="close"
											@click="editFSCostDialog = false"
									></q-btn>
								</q-toolbar>
								<q-separator />
								<div class="q-pa-sm q-gutter-y-sm">
									<money-input
											v-model="project.fs_target_2017"
											label="2017"
									/>
									<money-input
											v-model="project.fs_target_2018"
											label="2018"
									/>
									<money-input
											v-model="project.fs_target_2019"
											label="2019"
									/>
									<money-input
											v-model="project.fs_target_2020"
											label="2020"
									/>
									<money-input
											v-model="project.fs_target_2021"
											label="2021"
									/>
									<money-input
											v-model="project.fs_target_2022"
											label="2022"
									/>
								</div>
								<q-card-actions>
									<q-btn
											class="col"
											label="Close"
											color="primary"
											@click="editFSCostDialog = false"
									></q-btn>
								</q-card-actions>
							</q-card>
						</q-dialog>

						<q-item-label header>Investment Requirements by Region (PhP)</q-item-label>

						<div class="row">
							<q-markup-table class="col bg-transparent" flat bordered>
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
									<th>Actions</th>
								</tr>
								</thead>
								<tbody>
									<template v-if="!project.region_financials.length">
										<tr>
											<td colspan="9">
												No regions added yet.
											</td>
										</tr>
									</template>
									<template v-else>
										<tr v-for="(region, index) in project.region_financials" :key="index">
											<table-data :value="getRegion(region.region_id)"></table-data>
											<table-data :value="region.infrastructure_target_2016" />
											<table-data :value="region.infrastructure_target_2017" />
											<table-data :value="region.infrastructure_target_2018" />
											<table-data :value="region.infrastructure_target_2019" />
											<table-data :value="region.infrastructure_target_2020" />
											<table-data :value="region.infrastructure_target_2021" />
											<table-data :value="region.infrastructure_target_2022" />
											<table-data :value="region.infrastructure_target_2023" />
											<td class="text-right">
												{{
													(
														region.infrastructure_target_2016 +
														region.infrastructure_target_2017 +
														region.infrastructure_target_2018 +
														region.infrastructure_target_2019 +
														region.infrastructure_target_2020 +
														region.infrastructure_target_2021 +
														region.infrastructure_target_2022 +
														region.infrastructure_target_2023 ) | money
												}}
											</td>
										</tr>
									</template>
								</tbody>
							</q-markup-table>
						</div>

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
										<table-data :value="project.investment_target_2016" />
										<table-data :value="project.investment_target_2017" />
                    <table-data :value="project.investment_target_2018" />
										<table-data :value="project.investment_target_2019" />
                    <table-data :value="project.investment_target_2020" />
										<table-data :value="project.investment_target_2021" />
                    <table-data :value="project.investment_target_2022" />
										<table-data :value="project.investment_target_2023" />
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
										<table-data :value="project.infrastructure_target_2016" />
                    <table-data :value="project.infrastructure_target_2017" />
										<table-data :value="project.infrastructure_target_2018" />
                    <table-data :value="project.infrastructure_target_2019" />
										<table-data :value="project.infrastructure_target_2020" />
                    <table-data :value="project.infrastructure_target_2021" />
										<table-data :value="project.infrastructure_target_2022" />
                    <table-data :value="project.infrastructure_target_2023" />
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

							<!-- Edit Total Investment Dialog -->
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

							<!-- Edit Infrastructure Investment Dialog -->
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

							<!-- Edit NEP Dialog -->
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
                    <money-input v-model="project.nep_2017" label="2017" />
                    <money-input v-model="project.nep_2018" label="2018" />
                    <money-input v-model="project.nep_2019" label="2019" />
                    <money-input v-model="project.nep_2020" label="2020" />
                    <money-input v-model="project.nep_2021" label="2021" />
                    <money-input v-model="project.nep_2022" label="2022" />
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

							<!-- Edit GAA Dialog -->
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
                    <money-input v-model="project.gaa_2017" label="2017" />
                    <money-input v-model="project.gaa_2018" label="2018" />
                    <money-input v-model="project.gaa_2019" label="2019" />
                    <money-input v-model="project.gaa_2020" label="2020" />
                    <money-input v-model="project.gaa_2021" label="2021" />
                    <money-input v-model="project.gaa_2022" label="2022" />
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

							<!-- Edit Disbursement Dialog -->
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

				<!-- Actions -->
        <div class="row justify-center q-gutter-sm">
					<q-btn
						label="Finalize"
						color="secondary"
						@click="handleFinalize"
					></q-btn>
					<q-btn
						label="Save Changes"
						color="primary"
						@click="handleSubmit"
					></q-btn>
				</div>
      </template>
    </template>
  </page-container>
</template>

<script>
import { mapActions } from 'vuex'
import {
	FETCH_PROJECT_QUERY,
	FETCH_TYPES,
	FETCH_SPATIAL_COVERAGES,
	FETCH_REGIONS,
	FETCH_OPERATING_UNITS,
	FETCH_YEARS,
	FETCH_TIERS,
	FETCH_TYPOLOGIES,
	FETCH_PROJECT_STATUSES,
	FETCH_IMPLEMENTATION_MODES,
	FETCH_FUNDING_SOURCES, FETCH_FUNDING_INSTITUTIONS, FETCH_PROVINCES, FETCH_DISTRICTS, FETCH_CITY_MUNICIPALITIES_QUERY
} from '@/graphql/queries'
import {FETCH_CURRENCIES} from '../../../graphql/queries'
import TableData from '../components/TableData'
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '../../ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageContainer' */ '../../ui/page/PageContainer');
const TextInput = () =>
  import(/* webpackChunkName: 'TextInput' */ '../../ui/form-inputs/TextInput');
const RadioInput = () =>
  import(
    /* webpackChunkName: 'RadioInput' */ '../../ui/form-inputs/RadioInput'
  );
const SingleSelect = () =>
  import(
    /* webpackChunkName: 'SingleSelect' */ '../../ui/form-inputs/SingleSelect'
  );
const MoneyInput = () =>
  import(
    /* webpackChunkName: 'MoneyInput' */ '../../ui/form-inputs/MoneyInput'
  );
const CheckboxInput = () =>
  import(/* webpackChunkName: 'CheckboxInput' */ '../../ui/form-inputs/CheckboxInput');
const DateInput = () =>
  import(/* webpackChunkName: 'DateInput' */ '../../ui/form-inputs/DateInput');
const GadForm = () =>
  import(/* webpackChunkName: 'GadForm' */ '../components/shared/GadForm');
const ListOptionGroup = () =>
  import(
    /* webpackChunkName: 'ListOptionGroup' */ '../../ui/form-inputs/ListOptionGroup'
  );

export default {
  components: {
	  TableData,
    ListOptionGroup,
    GadForm,
    DateInput,
    MoneyInput,
    SingleSelect,
    RadioInput,
    TextInput,
    PageContainer,
    PageTitle,
    CheckboxInput
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
    },
	  implementation_modes: {
    	query: FETCH_IMPLEMENTATION_MODES
		},
    types: {
      query: FETCH_TYPES
    },
    spatial_coverages: {
      query: FETCH_SPATIAL_COVERAGES
    },
		regions: {
    	query: FETCH_REGIONS,
			result({ data }) {
    		this.regions_options = data.regions
			}
		},
		districts: {
    	query: FETCH_DISTRICTS
		},
		operating_units: {
    	query: FETCH_OPERATING_UNITS
		},
		provinces: {
    	query: FETCH_PROVINCES
		},
		years: {
    	query: FETCH_YEARS
		},
		tiers: {
    	query: FETCH_TIERS
		},
		typologies: {
    	query: FETCH_TYPOLOGIES
		},
	  project_statuses: {
    	query: FETCH_PROJECT_STATUSES
		},
		funding_sources: {
    	query: FETCH_FUNDING_SOURCES,
			result({ data }) {
    		this.funding_sources_options = data.funding_sources
			}
		},
		funding_institutions: {
    	query: FETCH_FUNDING_INSTITUTIONS
		},
	  city_municipalities: {
    	query: FETCH_CITY_MUNICIPALITIES_QUERY
		},
		currencies: {
    	query: FETCH_CURRENCIES
		}
  },
  computed: {
    filteredYears() {
      const years = this.years;
      const start = this.project.target_start_year;

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
    	currencies: [],
	    funding_institutions: [],
	    funding_sources_options: [],
	    implementation_modes: [],
    	operating_units: [],
	    project_statuses: [],
			provinces: [],
			districts: [],
			city_municipalities: [],
    	regions_options: [],
      types: [],
      spatial_coverages: [],
			years: [],
      project: {},
			tiers: [],
	    typologies: [],
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
	    editRapCostDialog: false,
      editTotalInvestmentDialog: false,
      editInfrastructureInvestmentDialog: false,
      editNepDialog: false,
      editGaaDialog: false,
      editDisbursementDialog: false,
      error: null,
      rules: {
        required: [val => !!val || '* Required']
      },
	    editFSCostDialog: false,
	    editRowCostDialog: false
    };
  },
  name: 'PageEditProject',
  methods: {
    ...mapActions('project', ['updateProject']),
    updateGadScore(e) {
      this.project.gad_score = e;
      this.showGadForm = false;
    },
	  handleFinalize() {
    	console.log('handle finalization')
		},
		handleSubmit() {
    	const payload = this.project

    	this.updateProject(payload)
		},
		getRegion(val) {
    	const regions = this.regions_options
    	const region = regions.find(region => region.id === val)

    	return region.name
		}
  },
  filters: {
    money(val) {
      if (!val) {
        return 0.00;
      }
      return val.toLocaleString();
    }
  }
};
</script>
