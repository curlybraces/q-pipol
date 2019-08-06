<template>
  <card-component label="Responsiveness to the Philippine Development Plan">

    <select-component
      :options="pdp_chapters"
      v-model="pdp_chapter_id">
    </select-component>

    <tree-component
      label="PDP Outcomes and Output Indicators"
      :treeData="pdp_indicators"
      v-model="pdp_indicators_selected"
    ></tree-component>
  </card-component>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TreeComponent from "../TreeComponent";
import CardComponent from "../CardComponent";

export default {
  name: 'PdpIndicators',
  components: {CardComponent, TreeComponent},
  data() {
    return {
      pdp_chapter_id: null,
      pdp_indicators_selected: []
    }
  },
  computed: {
    ...mapState('dropdown',['pdp_chapters','pdp_indicators']),
    pdp_chapter: {
      get() {
        return this.pdp_chapter_id
      },
      set(value) {
        this.setPdpChapter(value);
      }
    }
  },
  methods: {
    ...mapActions('dropdown',['loadPdpChapters','loadPdpOutcomes','setPdpChapter'])
  },
  mounted() {
    this.loadPdpChapters();
  }
}
</script>
