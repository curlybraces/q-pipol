<template>
  <q-page padding>
    <div class="row">
      <p>Add Activity</p>
      <q-space />
      <q-btn
        flat
        round
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
        class="q-ml-md"
      />
    </div>

    <card-component
      title="New or Expanded Locally Funded Programs/Projects"
      :onClick="addActivity"
    >
      <template v-slot:content>
        <select-component
          label="Program"
          v-model="form.program_uacs_code"
        ></select-component>

        <input-component
          label="Proposal/Project Name"
          v-model="form.title"
          hint="Proposal/project name must be as specific as possible. Include the intervention and the location of intervention"
        ></input-component>

        <options-component
          label="Categorization"
          :options="categorizations"
          v-model="form.categorization_id"
        ></options-component>

        <toggle-component
          label="Infrastructure"
          :options="[
            { label: 'Infrastructure', value: true },
            { label: 'Non-Infreastructure', value: false }
          ]"
        ></toggle-component>

        <input-component
          type="textarea"
          label="Description"
          hint="Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"
          v-model="form.description"
        ></input-component>

        <input-component
          type="number"
          label="Total Project Cost (in absolute PhP)"
          v-model="form.total_project_cost"
        />

        <input-component
          type="textarea"
          label="Expected Outputs"
          hint="Actual Deliverables, i.e. 100km of paved roads"
          v-model="form.expected_outputs"
        ></input-component>

        <select-component
          label="Spatial Coverage"
          :options="spatial_coverages"
          v-model="form.spatial_coverage"
        ></select-component>

        <select-component
          label="Region/s"
          :options="regions"
          :multiple="form.spatial_coverage == 2"
          :hint="
            form.spatial_coverage == 3
              ? 'Select region'
              : 'Select as many as applicable'
          "
          v-if="form.spatial_coverage == 2 || form.spatial_coverage == 3"
          v-model="form.regions"
        ></select-component>

        <select-component
          label="Province/s"
          :options="provinces"
          v-model="form.provinces"
        ></select-component>

        <select-component
          label="City and Municipalities"
          :option="city_municipalities"
          v-model="form.city_municipalities"
        ></select-component>

        <select-component
          label="Implementation Start"
          :options="implementation_periods"
          hint="Target year of start of implementation"
          v-model="form.implementation_start"
        ></select-component>

        <select-component
          label="Implementation End"
          v-if="form.implementation_start"
          :options="implementation_periods"
          hint="Target year of project completion"
          v-model="form.implementation_end"
        ></select-component>
      </template>
    </card-component>
  </q-page>
</template>

<script>
import InputComponent from "../../components/InputComponent";
import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";
import OptionsComponent from "../../components/OptionsComponent";
import ToggleComponent from "../../components/ToggleComponent";

export default {
  components: {
    ToggleComponent,
    OptionsComponent,
    SelectComponent,
    CardComponent,
    InputComponent
  },
  name: "PageAddActivity",
  data() {
    return {
      regions: [],
      spatial_coverages: [],
      categorizations: [],
      provinces: [],
      implementation_periods: [],
      city_municipalities: [],
      form: {}
    };
  },
  methods: {
    loadRegions() {
      this.$axios
        .get("/regions")
        .then(res => {
          this.regions = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadSpatialCoverages() {
      this.$axios
        .get("/spatial_coverages")
        .then(res => {
          this.spatial_coverages = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadImplementationBases() {
      this.$axios
        .get("/implementation_bases")
        .then(res => {
          this.implementation_bases = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadImplementationPeriods() {
      this.$axios
        .get("/implementation_periods")
        .then(res => {
          this.implementation_periods = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadCategorizations() {
      this.$axios
        .get("/categorizations")
        .then(res => {
          this.categorizations = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    addActivity() {
      console.log(this.form);
    }
  },
  mounted() {
    this.loadCategorizations();
    this.loadRegions();
    this.loadSpatialCoverages();
    this.loadImplementationPeriods();
  }
};
</script>

<style lang="stylus">
.my-sticky-column-table
  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child
    background-color #344955
    opacity 1

  td:first-child
    background-color #344955

  thead tr:first-child th:first-child,
  td:first-child
    position sticky
    left 0
    z-index 1
    color: #FFF
</style>
