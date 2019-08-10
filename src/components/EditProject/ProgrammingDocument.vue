<template>
  <card-component title="Project for Inclusion in Which Programming Document">
    <template v-slot:content>
      <options-component
        label="PIP Category"
        :options="pip_types"
        v-model="pip_type_id"
      ></options-component>

      <options-component
        label="CIP Category"
        :options="cip_types"
        v-model="cip_type_id"
      ></options-component>

      <options-component
        label="RDIP"
        :options="[{ label: 'RDIP', value: 1 }, { label: 'No', value: 0 }]"
        v-model="rdip"
      ></options-component>

      <checkbox-component
        label="0-10 Point Socioeconomic Agenda"
        :multiple="true"
        :options="ten_point_agenda"
        v-model="project.ten_point_agenda"
      ></checkbox-component>

      <checkbox-component
        label="Ten Point Agenda"
        :options="ten_point_agenda"
      ></checkbox-component>

      <checkbox-component
        label="Sustainable Development Goals (SDG)"
        :multiple="true"
        :options="sustainable_development_goals"
        v-model="project.sustainable_development_goal"
      ></checkbox-component>

      <select-component
        label="PDP Chapter"
        :options="pdp_chapters"
        v-model="project.pdpChapterField"
      >
      </select-component>

      <div class="row items-start q-my-md">
        <div class="col-3 text-primary text-weight-bold gt-sm">
          PDP Outcomes and Outputs
        </div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <q-tree
            :nodes="pdp_outcomes"
            node-key="id"
            tick-strategy="leaf-filtered"
            label-key="name"
            v-model="project.pdp_indicators"
            :expanded.sync="expanded"
            :ticked.sync="ticked"
            no-nodes-label="Nothing to show."
            default-expand-all
          />
        </div>
      </div>

      <select-component
        label="Other PDP Chapter"
        :options="pdp_chapters"
        v-model="project.other_pdp_chapter"
      >
      </select-component>
    </template>
  </card-component>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import CardComponent from "../UI/CardComponent";
import SelectComponent from "../Form/SelectComponent";
import OptionsComponent from "../Form/OptionsComponent";
import CheckboxComponent from "../Form/CheckboxComponent";

export default {
  components: {
    OptionsComponent,
    SelectComponent,
    CardComponent,
    CheckboxComponent
  },
  name: "ProgrammingDocument",
  data() {
    return {
      ticked: [],
      expanded: []
    };
  },
  computed: {
    ...mapState("projects", ["project"]),
    ...mapState("dropdown", [
      "pip_types",
      "cip_types",
      "ten_point_agenda",
      "sustainable_development_goals",
      "pdp_chapters",
      "pdp_chapter"
    ]),
    ...mapGetters("dropdown", ["pdpOutcomesFiltered", "pdp_outcomes"]),
    pdpChapterField: {
      get() {
        return this.pdp_chapter;
      },
      set(value) {
        // reset ticked values
        this.ticked = [];
        this.setPdpChapter(value);
      }
    },
    pdp_indicators() {
      return this.ticked;
    },
    pip_type_id: {
      get() {
        return this.project.pip_type_id;
      },
      set(val) {
        this.setPipType(val);
      }
    },
    cip_type_id: {
      get() {
        return this.project.cip_type_id;
      },
      set(val) {
        this.setCipType(val);
      }
    },
    trip: {
      get() {
        return this.project.trip;
      },
      set(val) {
        this.setTrip(val);
      }
    },
    rdip: {
      get() {
        return this.project.rdip;
      },
      set(val) {
        this.setRdip(val);
      }
    }
  },
  methods: {
    ...mapActions("dropdown", ["loadPipTypes", "loadCipTypes"]),
    ...mapMutations("projects", [
      "setPipType",
      "setCipType",
      "setTrip",
      "setRdip"
    ]),
    ...mapActions("dropdown", [
      "loadTenPointAgenda",
      "loadSustainableDevelopmentGoals",
      "loadPdpChapters",
      "loadPdpOutcomes",
      "setPdpChapter"
    ]),
    onUpdate() {
      this.pdp_indicators = this.ticked;
    }
  },
  mounted() {
    this.loadPipTypes();
    this.loadCipTypes();
    this.loadTenPointAgenda();
    this.loadSustainableDevelopmentGoals();
    this.loadPdpChapters();
    this.loadPdpOutcomes();
  }
};
</script>
