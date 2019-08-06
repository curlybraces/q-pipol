<template>
  <card-component label="Responsiveness to the Philippine Development Plan">

    <select-component :options="pdp_chapters" v-model="pdp_chapter"></select-component>

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
      pdp_chapter: null,
      pdp_indicators_selected: []
    }
  },
  computed: {
    ...mapState('dropdown',['pdp_chapters','pdp_indicators'])
  },
  methods: {
    ...mapActions('dropdown',['loadPdpChapters','loadPdpIndicators'])
  },
  mounted() {
    this.loadPdpChapters();
  }
}
</script>