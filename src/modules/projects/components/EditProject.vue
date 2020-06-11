<template>
  <div>
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
        <q-form ref="editForm" @submit="onSubmit" greedy>
          <div class="column">
            <q-item-label header
              >Inclusion in any of the following documents</q-item-label
            >

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

          <div class="row q-pa-sm">
            <div class="q-col-gutter-y-sm">
              <text-input
                v-model="project.title"
                label="Project/Program Title"
                type="text"
                :rules="rules.required"
              />

              <div class="row">
                <div class="col">
                  <radio-input
                    v-model="project.type_id"
                    label="PAP Type"
                    :options="types"
                    :recode="true"
                    :rules="rules.required"
                  />
                </div>

                <div class="col">
                  <radio-input
                    v-model="project.infrastructure"
                    label="Infrastructure"
                    :options="trueOrFalse"
                  />
                </div>
              </div>

              <text-input
                v-model="project.description"
                label="Description"
                type="textarea"
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

              <text-input
                v-model="project.goals"
                label="Goals"
                type="textarea"
                :rules="rules.required"
              />

              <text-input
                v-model="project.outcomes"
                label="Outcomes"
                type="textarea"
                :rules="rules.required"
              />

              <text-input
                v-model="project.purpose"
                label="Purpose"
                type="textarea"
                :rules="rules.required"
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
                :rules="rules.required"
              ></text-input>

              <text-input
                v-model="project.employment_generated"
                label="Employment Generated"
                :rules="rules.required"
              ></text-input>

              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <text-input
                    v-model="project.implementation_risk"
                    label="Implementation Risk"
                    type="textarea"
                    :rules="rules.required"
                  />
                </div>
                <div class="col-6">
                  <text-input
                    v-model="project.mitigation_strategy"
                    label="Mitigation Strategy"
                    type="textarea"
                    :rules="rules.required"
                  />
                </div>
              </div>

              <q-item-label header>Spatial Coverage</q-item-label>

              <spatial-coverage
                v-model="project.spatial_coverage_id"
                :rules="rules.selectOne"
              ></spatial-coverage>

              <regions
                v-model="project.selected_regions"
                v-if="project.spatial_coverage_id === '2'"
                :rules="rules.selectOne"
              ></regions>

              <region
                v-model="project.region_id"
                v-if="project.spatial_coverage_id === '3'"
                :rules="rules.selectOne"
              ></region>

              <province
                v-model="project.province_id"
                v-if="project.spatial_coverage_id === '4'"
                :rules="rules.selectOne"
              ></province>

              <district
                v-model="project.district_id"
                v-if="project.spatial_coverage_id === '5'"
                :rules="rules.selectOne"
              ></district>

              <city-municipality
                v-model="project.city_municipality_id"
                v-if="project.spatial_coverage_id === '6'"
                :rules="rules.selectOne"
              ></city-municipality>

              <implementing-agency
                v-model="project.operating_unit_id"
                :rules="rules.selectOne"
              ></implementing-agency>

              <q-item-label header>Technical Readiness</q-item-label>

              <div class="row">
                <div class="col">
                  <checkbox-input
                    label="Approved by DA-wide Clearinghouse"
                    v-model="project.clearinghouse"
                  ></checkbox-input>
                </div>
                <div class="col">
                  <date-input
                    v-if="project.clearinghouse"
                    v-model="project.clearinghouse_date"
                  ></date-input>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <checkbox-input
                    label="NEDA Submission"
                    v-model="project.neda_submission"
                  ></checkbox-input>
                </div>
                <div class="col">
                  <date-input
                    v-if="project.neda_submission"
                    v-model="project.neda_submission_date"
                  ></date-input>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <checkbox-input
                    label="NEDA Secretariat Review"
                    v-model="project.neda_secretariat_review"
                  ></checkbox-input>
                </div>
                <div class="col">
                  <date-input
                    v-if="project.neda_secretariat_review"
                    v-model="project.neda_secretariat_review_date"
                  ></date-input>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <checkbox-input
                    label="NEDA Board"
                    v-model="project.neda_board"
                  ></checkbox-input>
                </div>
                <div class="col">
                  <date-input
                    v-if="project.neda_board"
                    v-model="project.neda_board_date"
                  ></date-input>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <checkbox-input
                    label="ICC Endorsed"
                    v-model="project.icc_endorsed"
                  ></checkbox-input>
                </div>
                <div class="col">
                  <date-input
                    v-if="project.icc_endorsed"
                    v-model="project.icc_endorsed_date"
                  ></date-input>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <checkbox-input
                    label="ICC Approved"
                    v-model="project.icc_approved"
                  ></checkbox-input>
                </div>
                <div class="col">
                  <date-input
                    v-if="project.icc_approved"
                    v-model="project.icc_approved_date"
                  ></date-input>
                </div>
              </div>

              <div class="col">
                <span class="text-caption text-weight-bold"
                  >Gender and Development</span
                >
                <div class="row q-col-gutter-sm items-center">
                  <gad
                    v-model="project.gad_id"
                    class="col"
                    :rules="rules.required"
                  />
                  <div class="col-1">
                    <q-btn
                      flat
                      size="md"
                      icon="attach_file"
                      @click="uploadGadForm = true"
                    >
                      <q-tooltip>Upload Gad Form</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </div>

              <q-dialog v-model="uploadGadForm" v-close-popup>
                <q-card style="width:300px;">
                  <q-toolbar class="bg-dark text-white">
                    <q-toolbar-title>Upload Gad Form</q-toolbar-title>
                  </q-toolbar>
                  <q-card-section>
                    <q-file
                      v-model="gad_form"
                      stack-label
                      outlined
                      class="col"
                      label="Choose File"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      @click="uploadGadForm = false"
                    ></q-btn>
                    <q-btn
                      label="Upload"
                      @click="saveFile"
                      color="primary"
                      :disable="!gad_form"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <funding-source
                v-model="project.main_funding_source_id"
                :rules="rules.required"
              ></funding-source>

              <funding-institution
                v-model="project.funding_institution_id"
                v-if="
                  project.main_funding_source_id === '2' ||
                    project.main_funding_source_id === '3'
                "
                :rules="rules.required"
              ></funding-institution>

              <implementation-mode
                v-model="project.implementation_mode_id"
                :rules="rules.required"
              ></implementation-mode>

              <div class="row q-col-gutter-sm">
                <div class="col-3">
                  <currency
                    v-model="project.currency_id"
                    :rules="rules.required"
                  ></currency>
                </div>

                <div class="col-9">
                  <money-input
                    v-model="project.total_project_cost"
                    label="Total Project Cost"
                    :rules="rules.required"
                  />
                </div>
              </div>

              <q-item-label header>Pre-Investment Requirements</q-item-label>

              <q-item tag="label">
                <q-item-section avatar>
                  <q-checkbox v-model="project.has_row" />
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
                  <q-checkbox v-model="project.has_rap" />
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
                  <q-checkbox v-model="project.has_fs" />
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

              <q-item-label header
                >Investment Requirements by Region (PhP)
                <q-icon
                  name="add_box"
                  class="cursor-pointer"
                  color="primary"
                  @click="showAddRegionFinancial"
                ></q-icon
              ></q-item-label>

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
                      <tr
                        v-for="(region, index) in project.region_financials"
                        :key="index"
                      >
                        <td class="text-left">
                          {{ getRegion(region.region_id) }}
                        </td>
                        <table-data :value="region.target_2016" />
                        <table-data :value="region.target_2017" />
                        <table-data :value="region.target_2018" />
                        <table-data :value="region.target_2019" />
                        <table-data :value="region.target_2020" />
                        <table-data :value="region.target_2021" />
                        <table-data :value="region.target_2022" />
                        <table-data :value="region.target_2023" />
                        <td class="text-right">
                          {{
                            (region.target_2016 +
                              region.target_2017 +
                              region.target_2018 +
                              region.target_2019 +
                              region.target_2020 +
                              region.target_2021 +
                              region.target_2022 +
                              region.target_2023)
                              | money
                          }}
                        </td>
                        <td>
                          <q-icon
                            class="cursor-pointer"
                            name="delete"
                            color="red"
                            @click="confirmDeleteRegionRow(region, index)"
                          />
                          <q-icon
                            class="cursor-pointer"
                            name="edit"
                            color="secondary"
                            @click="editRegionFinancialDialog = true"
                          />
                        </td>
                        <!-- Add region dialog -->
                        <q-dialog
                          v-model="editRegionFinancialDialog"
                          full-height
                          :position="$q.screen.xs ? void 0 : 'right'"
                          persistent
                          :maximized="$q.screen.xs"
                          transition-show="jump-left"
                          transition-hide="jump-right"
                        >
                          <q-card
                            :style="$q.screen.gt.xs ? 'min-width:400px' : ''"
                          >
                            <q-toolbar class="bg-info text-white">
                              <q-toolbar-title
                                class="absolute-center text-subtitle1"
                                >Edit Region Financial Data</q-toolbar-title
                              >
                              <q-space />
                              <q-btn
                                flat
                                round
                                dense
                                icon="close"
                                @click="editRegionFinancialDialog = false"
                              ></q-btn>
                            </q-toolbar>
                            <q-separator />
                            <div class="q-pa-sm q-gutter-y-sm">
                              <region v-model="region.region_id"></region>
                              <money-input
                                v-model="region.target_2016"
                                label="2016 &amp; Prior"
                              />
                              <money-input
                                v-model="region.target_2017"
                                label="2017"
                              />
                              <money-input
                                v-model="region.target_2018"
                                label="2018"
                              />
                              <money-input
                                v-model="region.target_2019"
                                label="2019"
                              />
                              <money-input
                                v-model="region.target_2020"
                                label="2020"
                              />
                              <money-input
                                v-model="region.target_2021"
                                label="2021"
                              />
                              <money-input
                                v-model="region.target_2022"
                                label="2022"
                              />
                              <money-input
                                v-model="region.target_2023"
                                label="2023 &amp; Beyond"
                              />
                            </div>
                            <q-card-actions align="right">
                              <q-btn
                                outline
                                label="Delete"
                                color="red"
                                @click="confirmDeleteRegionRow(region, index)"
                              ></q-btn>
                              <q-btn
                                label="Update"
                                color="primary"
                                @click="editRegionFinancialDialog = false"
                              ></q-btn>
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </tr>
                    </template>
                  </tbody>
                </q-markup-table>
              </div>

              <!-- Add region dialog -->
              <q-dialog
                v-model="addRegionFinancialDialog"
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
                      >Add Region Financial Data</q-toolbar-title
                    >
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      @click="addRegionFinancialDialog = false"
                    ></q-btn>
                  </q-toolbar>
                  <q-separator />
                  <div class="q-pa-sm q-gutter-y-sm">
                    <region v-model="newRegion.region_id"></region>
                    <money-input
                      v-model="newRegion.target_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input v-model="newRegion.target_2017" label="2017" />
                    <money-input v-model="newRegion.target_2018" label="2018" />
                    <money-input v-model="newRegion.target_2019" label="2019" />
                    <money-input v-model="newRegion.target_2020" label="2020" />
                    <money-input v-model="newRegion.target_2021" label="2021" />
                    <money-input v-model="newRegion.target_2022" label="2022" />
                    <money-input
                      v-model="newRegion.target_2023"
                      label="2023 &amp; Beyond"
                    />
                  </div>
                  <q-card-actions>
                    <q-btn
                      class="col"
                      label="Add"
                      color="primary"
                      @click="addRegionRow"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-item-label header>
                Investment Requirements by Funding Source (PhP)
                <q-icon
                  name="add_box"
                  class="cursor-pointer"
                  color="primary"
                  @click="showAddFundingSourceFinancial"
                />
              </q-item-label>

              <div class="row">
                <q-markup-table class="col bg-transparent" flat bordered>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="!project.funding_source_financials.length">
                      <tr>
                        <td colspan="9">
                          No funding sources added yet.
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr
                        v-for="(funding_source,
                        index) in project.funding_source_financials"
                        :key="index"
                      >
                        <td class="text-left">
                          {{
                            getFundingSource(funding_source.funding_source_id)
                          }}
                        </td>
                        <table-data :value="funding_source.target_2016" />
                        <table-data :value="funding_source.target_2017" />
                        <table-data :value="funding_source.target_2018" />
                        <table-data :value="funding_source.target_2019" />
                        <table-data :value="funding_source.target_2020" />
                        <table-data :value="funding_source.target_2021" />
                        <table-data :value="funding_source.target_2022" />
                        <table-data :value="funding_source.target_2023" />
                        <td class="text-right">
                          {{
                            (funding_source.target_2016 +
                              funding_source.target_2017 +
                              funding_source.target_2018 +
                              funding_source.target_2019 +
                              funding_source.target_2020 +
                              funding_source.target_2021 +
                              funding_source.target_2022 +
                              funding_source.target_2023)
                              | money
                          }}
                        </td>
                        <td>
                          <q-icon
                            class="cursor-pointer"
                            name="delete"
                            color="red"
                            @click="
                              confirmDeleteFundingSourceRow(
                                funding_source,
                                index
                              )
                            "
                          />
                          <q-icon
                            class="cursor-pointer"
                            name="edit"
                            color="secondary"
                            @click="editFundingSourceFinancialDialog = true"
                          />
                        </td>
                        <!-- Edit funding source dialog -->
                        <q-dialog
                          v-model="editFundingSourceFinancialDialog"
                          full-height
                          :position="$q.screen.xs ? void 0 : 'right'"
                          persistent
                          :maximized="$q.screen.xs"
                          transition-show="jump-left"
                          transition-hide="jump-right"
                        >
                          <q-card
                            :style="$q.screen.gt.xs ? 'min-width:400px' : ''"
                          >
                            <q-toolbar class="bg-info text-white">
                              <q-toolbar-title
                                class="absolute-center text-subtitle1"
                                >Edit Funding Source Financial
                                Data</q-toolbar-title
                              >
                              <q-space />
                              <q-btn
                                flat
                                round
                                dense
                                icon="close"
                                @click="
                                  editFundingSourceFinancialDialog = false
                                "
                              ></q-btn>
                            </q-toolbar>
                            <q-separator />
                            <div class="q-pa-sm q-gutter-y-sm">
                              <funding-source
                                v-model="funding_source.funding_source_id"
                              ></funding-source>
                              <money-input
                                v-model="funding_source.target_2016"
                                label="2016 &amp; Prior"
                              />
                              <money-input
                                v-model="funding_source.target_2017"
                                label="2017"
                              />
                              <money-input
                                v-model="funding_source.target_2018"
                                label="2018"
                              />
                              <money-input
                                v-model="funding_source.target_2019"
                                label="2019"
                              />
                              <money-input
                                v-model="funding_source.target_2020"
                                label="2020"
                              />
                              <money-input
                                v-model="funding_source.target_2021"
                                label="2021"
                              />
                              <money-input
                                v-model="funding_source.target_2022"
                                label="2022"
                              />
                              <money-input
                                v-model="funding_source.target_2023"
                                label="2023 &amp; Beyond"
                              />
                            </div>
                            <q-card-actions align="right">
                              <q-btn
                                outline
                                label="Delete"
                                color="red"
                                @click="
                                  confirmDeleteFundingSourceRow(
                                    funding_source,
                                    index
                                  )
                                "
                              ></q-btn>
                              <q-btn
                                label="Update"
                                color="primary"
                                @click="
                                  editFundingSourceFinancialDialog = false
                                "
                              ></q-btn>
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </tr>
                    </template>
                  </tbody>
                </q-markup-table>
              </div>

              <!-- Add funding source dialog -->
              <q-dialog
                v-model="addFundingSourceFinancialDialog"
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
                      >Add Funding Source Financial Data</q-toolbar-title
                    >
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      @click="addFundingSourceFinancialDialog = false"
                    ></q-btn>
                  </q-toolbar>
                  <q-separator />
                  <div class="q-pa-sm q-gutter-y-sm">
                    <funding-source
                      v-model="newFundingSource.funding_source_id"
                    ></funding-source>
                    <money-input
                      v-model="newFundingSource.target_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input
                      v-model="newFundingSource.target_2017"
                      label="2017"
                    />
                    <money-input
                      v-model="newFundingSource.target_2018"
                      label="2018"
                    />
                    <money-input
                      v-model="newFundingSource.target_2019"
                      label="2019"
                    />
                    <money-input
                      v-model="newFundingSource.target_2020"
                      label="2020"
                    />
                    <money-input
                      v-model="newFundingSource.target_2021"
                      label="2021"
                    />
                    <money-input
                      v-model="newFundingSource.target_2022"
                      label="2022"
                    />
                    <money-input
                      v-model="newFundingSource.target_2023"
                      label="2023 &amp; Beyond"
                    />
                  </div>
                  <q-card-actions>
                    <q-btn
                      class="col"
                      label="Add"
                      color="primary"
                      @click="addFundingSourceRow"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <!-- Investment Requirements (Total, Infrastructure, GAA, NEP, Disbursement -->
              <q-item-label header
                >Investment Requirements (in absolute PhP)</q-item-label
              >

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
                      <td colspan="11">
                        Target Investment Requirements
                      </td>
                    </tr>
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
                      <td colspan="11">
                        Actual Investments
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

              <project-status
                v-model="project.project_status_id"
                :rules="rules.selectOne"
              ></project-status>

              <budget-tier
                v-model="project.tier_id"
                :rules="rules.selectOne"
              ></budget-tier>

              <text-input
                v-model="project.updates"
                label="Updates"
                type="textarea"
                :rules="rules.required"
              />

              <date-input
                v-model="project.updates_date"
                label="As of"
                :rules="rules.required"
              />
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
            <q-btn
              outline
              label="Generate Fake Data"
              color="red"
              @click="generateFakeData"
            ></q-btn>
          </div>
        </q-form>
      </template>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  FETCH_PROJECT_QUERY,
  FETCH_TYPES,
  FETCH_YEARS,
  FETCH_FUNDING_SOURCES,
  FETCH_REGIONS
} from '@/graphql/queries';
import BudgetTier from '../components/dropdowns/BudgetTier';
import Regions from '../components/dropdowns/Regions';
import TableData from '../components/TableData';
import Gad from '../components/dropdowns/Gad';
import Region from '../components/dropdowns/Region';
import Province from '../components/dropdowns/Province';
import FundingSource from '../components/dropdowns/FundingSource';
import FundingInstitution from '../components/dropdowns/FundingInstitution';
import ImplementationMode from '../components/dropdowns/ImplementationMode';
import CityMunicipality from '../components/dropdowns/CityMunicipality';
import District from '../components/dropdowns/District';
import Currency from '../components/dropdowns/Currency';
import SpatialCoverage from '../components/dropdowns/SpatialCoverage';
import TextInput from '@/ui/form-inputs/TextInput';
import RadioInput from '@/ui/form-inputs/RadioInput';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import MoneyInput from '@/ui/form-inputs/MoneyInput';
import CheckboxInput from '@/ui/form-inputs/CheckboxInput';
import DateInput from '@/ui/form-inputs/DateInput';
// dropdowns
import ImplementingAgency from '../components/dropdowns/ImplementingAgency';
import ProjectStatus from '../components/dropdowns/ProjectStatus';
import {
  showSuccessNotification,
  showErrorNotification
} from '@/functions/function-show-notifications';
import { PROCESSING_STATUS } from '@/constants/processing_status';
import { date } from 'quasar';

import { projectService } from '@/services';

export default {
  components: {
    Regions,
    BudgetTier,
    SpatialCoverage,
    Gad,
    Currency,
    District,
    CityMunicipality,
    ImplementationMode,
    FundingInstitution,
    FundingSource,
    Province,
    Region,
    ProjectStatus,
    ImplementingAgency,
    TableData,
    DateInput,
    MoneyInput,
    SingleSelect,
    RadioInput,
    TextInput,
    CheckboxInput
  },
  name: 'EditProject',
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
    types: {
      query: FETCH_TYPES
    },
    years: {
      query: FETCH_YEARS
    },
    funding_sources: {
      query: FETCH_FUNDING_SOURCES
    },
    regions: {
      query: FETCH_REGIONS
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
      project: {},
      newFundingSource: {
        id: null,
        funding_source_id: null,
        target_2016: 0,
        target_2017: 0,
        target_2018: 0,
        target_2019: 0,
        target_2020: 0,
        target_2021: 0,
        target_2022: 0,
        target_2023: 0
      },
      newRegion: {
        id: null,
        region_id: null,
        target_2016: 0,
        target_2017: 0,
        target_2018: 0,
        target_2019: 0,
        target_2020: 0,
        target_2021: 0,
        target_2022: 0,
        target_2023: 0
      },
      types: [],
      years: [],
      tiers: [],
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
      addRegionFinancialDialog: false,
      error: null,
      rules: {
        required: [val => !!val || '* Required'],
        selectOne: [val => (!!val && val.length > 0) || '* Required']
      },
      editFSCostDialog: false,
      editRowCostDialog: false,
      editRegionFinancialDialog: false,
      addFundingSourceFinancialDialog: false,
      editFundingSourceFinancialDialog: false,
      regions: [],
      funding_sources: [],
      validationErrors: [],
      gad_form: null,
      uploadGadForm: false,
      saved: false
    };
  },
  methods: {
    generateFakeData() {
      this.project.afmip = this.$faker().random.boolean();
      this.project.rdip = this.$faker().random.boolean();
      this.project.pcip = this.$faker().random.boolean();
      this.project.goals = this.$faker().lorem.sentences(2);
      this.project.outcomes = this.$faker().lorem.sentences(3);
      this.project.purpose = this.$faker().lorem.sentences(4);
      this.project.expected_outputs = this.$faker().lorem.sentences(5);
      this.project.beneficiaries = this.$faker().lorem.sentences(1);
      this.project.employment_generated = this.$faker().lorem.sentences(5);
      this.project.implementation_risk = this.$faker().lorem.sentences(5);
      this.project.mitigation_strategy = this.$faker().lorem.sentences(5);
      this.project.region_id = this.$faker()
        .random.number({ min: 1, max: 16 })
        .toString();
      this.project.gad_id = this.$faker()
        .random.number({ min: 1, max: 4 })
        .toString();
      this.project.funding_institution_id = this.$faker()
        .random.number({ min: 1, max: 30 })
        .toString();
      this.project.implementation_mode_id = this.$faker()
        .random.number({ min: 1, max: 5 })
        .toString();
      this.project.tier_id = this.$faker()
        .random.number({ min: 1, max: 3 })
        .toString();
      this.project.updates = this.$faker().lorem.sentences(5);
      this.project.updates_date = date.formatDate(
        this.$faker().date.future(),
        'YYYY-MM-DD'
      );
      console.log(this.project);
    },
    saveFile() {
      projectService.uploadGad({
        project_id: this.project.id,
        gad_form: this.gad_form
      });
    },
    handleSubmit() {
      // confirm submission
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Save your progress',
          cancel: true
        })
        .onOk(() => this.onSubmit());
    },
    handleFinalize() {
      this.$refs.editForm.validate().then(success => {
        if (success) {
          this.$q
            .dialog({
              title: 'Finalize Project',
              message: 'Add remarks (if any). Input N/A if none.',
              prompt: {
                model: '',
                type: 'text',
                isValid: val => !!val
              },
              cancel: true
            })
            .onOk(data => {
              this.finalizeProject(data);
            });
        } else {
          alert('Incomplete data');
        }
      });
    },
    finalizeProject(remarks) {
      const payload = {
        project_id: this.$route.params.id,
        processing_status_id: PROCESSING_STATUS.finalized,
        remarks: remarks
      };
      this.$store.dispatch('projects/finalizeProject', payload);
    },
    onSubmit() {
      this.$q.loading.show();
      this.$store
        .dispatch('projects/updateProject', this.project)
        .then(() =>
          showSuccessNotification({
            message: 'Successfully updated project.'
          })
        )
        .catch(err =>
          showErrorNotification({
            message: err.message
          })
        )
        .finally(() => this.$q.loading.hide());
    },
    onFinalize() {
      this.$store.dispatch('projects/finalizeProject', this.project);
    },
    getRegion(val) {
      const regions = this.regions;
      if (regions.length) {
        const region = regions.find(region => region.id === val);
        return region.name;
      }
      return '';
    },
    getFundingSource(val) {
      const funding_sources = this.funding_sources;
      const funding_source = funding_sources.find(
        funding_source => funding_source.id === val
      );

      return funding_source.name;
    },
    addRegionRow() {
      const payload = this.newRegion;

      console.dir(payload);

      this.project.region_financials.push(payload);

      console.dir(this.project.region_financials);

      this.addRegionFinancialDialog = false;
    },
    deleteRegionRow(region, index) {
      console.log('deleteRegionRows: ', this.project.deleteRegionRows);

      if (typeof this.project.deleteRegionRows === 'undefined') {
        console.log('above is undefined');
        Vue.set(this.project, 'deleteRegionRows', []);
      }
      this.project.region_financials.splice(index, 1);
      if (region.id) {
        this.project.deleteRegionRows.push(region.id);
      }

      console.log('deleteRegionRows: ', this.project.deleteRegionRows);
    },
    editRegionRow(region) {
      this.newRegion = region;

      this.addRegionFinancialDialog = true;
    },
    confirmDeleteRegionRow(region, index) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this data?',
          cancel: true
        })
        .onOk(() => this.deleteRegionRow(region, index));
    },
    updateRegionRow() {},
    showAddRegionFinancial() {
      this.newRegion = {
        id: null,
        region_id: null,
        target_2016: 0,
        target_2017: 0,
        target_2018: 0,
        target_2019: 0,
        target_2020: 0,
        target_2021: 0,
        target_2022: 0,
        target_2023: 0
      };

      this.addRegionFinancialDialog = true;
    },
    showAddFundingSourceFinancial() {
      this.addFundingSourceFinancialDialog = true;
    },
    addFundingSourceRow() {
      const payload = this.newFundingSource;

      console.dir(payload);

      this.project.funding_source_financials.push(payload);

      console.dir(this.project.funding_source_financials);

      this.addFundingSourceFinancialDialog = false;
    },
    deleteFundingSourceRow(funding_source, index) {
      console.log(
        'deleteFundingSourceRows: ',
        this.project.deleteFundingSourceRows
      );

      if (typeof this.project.deleteFundingSourceRows === 'undefined') {
        console.log('above is undefined');
        Vue.set(this.project, 'deleteFundingSourceRows', []);
      }
      this.project.funding_source_financials.splice(index, 1);
      if (funding_source.id) {
        this.project.deleteFundingSourceRows.push(funding_source.id);
      }

      console.log(
        'deleteFundingSourceRows: ',
        this.project.deleteFundingSourceRows
      );
    },
    confirmDeleteFundingSourceRow(funding_source, index) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this data?',
          cancel: true
        })
        .onOk(() => this.deleteFundingSourceRow(funding_source, index));
    }
  },
  filters: {
    money(val) {
      if (!val) {
        return 0.0;
      }
      return val.toLocaleString();
    }
  }
};
</script>
