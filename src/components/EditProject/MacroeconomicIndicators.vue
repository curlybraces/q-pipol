<template>
  <card-component title="Responsiveness to Strategic Plans">
    <template v-slot:content>
      <select-component
        label="0-10 Point Socioeconomic Agenda"
        :multiple="true"
        :options="ten_point_agenda"
        v-model="project.ten_point_agenda"
      ></select-component>

      <select-component
        label="Sustainable Development Goals (SDG)"
        :multiple="true"
        :options="sustainable_development_goals"
        v-model="project.sustainable_development_goal"
      ></select-component>

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
import { mapActions, mapState, mapGetters } from "vuex";
import CardComponent from "../UI/CardComponent";
import SelectComponent from "../Form/SelectComponent";

export default {
  name: "PdpIndicators",
  components: {
    SelectComponent,
    CardComponent
  },
  data() {
    return {
      ticked: [],
      expanded: []
    };
  },
  computed: {
    ...mapState("dropdown", [
      "ten_point_agenda",
      "sustainable_development_goals",
      "pdp_chapters",
      "pdp_chapter"
    ]),
    ...mapGetters("dropdown", ["pdpOutcomesFiltered", "pdp_outcomes"]),
    ...mapState("projects", ["project"]),
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
    }
  },
  methods: {
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
    this.loadTenPointAgenda();
    this.loadSustainableDevelopmentGoals();
    this.loadPdpChapters();
    this.loadPdpOutcomes();
  }
};
</script>
