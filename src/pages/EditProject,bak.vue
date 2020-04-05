<template>
  <q-page class="q-pt-lg">
    <page-title title="Edit Project"></page-title>

    <div class="q-pa-sm">
      <template v-if="getLoading">
        <q-inner-loading :showing="getLoading">
          <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
        </q-inner-loading>
      </template>
      <template v-else>
        <q-banner class="q-my-md bg-grey-3">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label caption>Created by: </q-item-label>
                <q-item-label>{{
                  project.creator ? project.creator.name : ''
                }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Created on: </q-item-label>
                <q-item-label>{{ project.created_at }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item></q-item>
          </q-list>
        </q-banner>

        <q-form @submit.prevent="updateProject">
          <q-stepper
            v-model="step"
            vertical
            animated
            header-nav
            active-color="orange-10"
            inactive-color="grey-9"
          >
            <q-step
              :name="1"
              prefix="1"
              title="Basic Information"
              caption="Basic Information"
              :done="basicInformationDone"
              done-color="positive"
            >
              <basic-information />

              <stepper-navigation @next="step = 2"></stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              prefix="2"
              title="Programming Documents"
              caption="Documents where the PAP are included"
              :done="programmingDocumentsDone"
              done-color="positive"
            >
              <programming-documents :dense="dense" />

              <stepper-navigation
                @next="step = 3"
                @back="step = 1"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Additional Project Information"
              caption="Additional Information"
              prefix="3"
            >
              <additional-information :dense="dense" />

              <stepper-navigation
                @next="step = 4"
                @back="step = 2"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step
              :name="4"
              title="Spatial Coverage"
              caption="Spatial Coverage"
              prefix="4"
              :done="spatialCoverageDone"
              done-color="positive"
            >
              <spatial-coverage :dense="dense" />

              <stepper-navigation
                @next="step = 5"
                @back="step = 3"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step
              :name="5"
              title="Implementation Period"
              caption="Implementation Period"
              prefix="5"
            >
              <implementation-period :dense="dense" />

              <stepper-navigation
                @next="step = 6"
                @back="step = 4"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step :name="6" title="Readiness" caption="" prefix="6">
              <technical-readiness />

              <stepper-navigation
                @next="step = 7"
                @back="step = 5"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step
              :name="7"
              title="Financial and Economic Analyses"
              caption="Financial and Economic Analyses"
              prefix="7"
            >
              <financial-analysis :dense="dense" />

              <stepper-navigation
                @next="step = 8"
                @back="step = 6"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step
              :name="8"
              title="Financial Information"
              caption="Financial Information"
              prefix="8"
            >
              <financial-information></financial-information>

              <stepper-navigation
                @next="step = 9"
                @back="step = 7"
                withBack="true"
              ></stepper-navigation>
            </q-step>

            <q-step
              :name="9"
              title="Updates"
              caption="Applicable to Ongoing and Completed Projects Only"
              prefix="9"
            >
              <project-updates />

              <q-stepper-navigation>
                <q-btn
                  color="orange-10"
                  @click="step = 10"
                  label="Finish"
                  class="q-mr-sm"
                />
                <q-btn color="orange-5" flat @click="step = 8" label="Back" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="10"
              title="Submit"
              caption="Save project"
              prefix="10"
            >
              <div class="row q-pa-md q-gutter-md justify-center">
                <q-btn
                  flat
                  @click="step = 1"
                  label="Go back to Start"
                  color="orange-10"
                />
                <q-btn type="submit" label="Save Project" color="orange-10" />
              </div>
            </q-step>
          </q-stepper>
        </q-form>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import PageTitle from '../components/PageTitle';
import ProjectMixins from '../mixins/ProjectMixins';

export default {
  components: {
    PageTitle
  },
  name: 'PageEditProject',
  mixins: [ProjectMixins],
  methods: {
    ...mapActions('project', ['updateProject', 'fetchProject'])
  },
  computed: {
    ...mapGetters('project', ['getLoading']),
    ...mapFields('project', [
      'project',
      'project.title',
      'project.type_id',
      'project.project_status_id',
      'project.total_project_cost',
      'project.tier_id',
      'project.implementation_mode_id',
      'project.technical_readinesses',
      'project.updates',
      'project.updates_date'
    ]),
    programmingDocumentsDone() {
      return (
        this.pip ||
        this.cip ||
        this.trip ||
        this.rdip ||
        this.pcip ||
        this.afmip
      );
    },
    basicInformationDone() {
      return (
        !!this.title &&
        !!this.operating_unit_id &&
        !!this.description &&
        !!this.type_id &&
        !!this.total_project_cost
      );
    },
    spatialCoverageDone() {
      return !!this.spatial_coverage_id;
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Projects',
          url: '/pip'
        },
        {
          title: 'Edit Project'
        }
      ],
      dense: false,
      expanded: false,
      filteredProvinces: [],
      step: 1
    };
  },
  mounted() {
    this.fetchProject(this.$route.params.id);
  }
};
</script>
