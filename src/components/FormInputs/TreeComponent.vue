<template>
  <q-tree
    :nodes="options"
    node-key="value"
    :tick-strategy="tickStrategy"
    label-key="label"
    :selected.sync="selected"
    :expanded.sync="expanded"
    :ticked.sync="ticked"
    @update:ticked="onUpdate"
    :no-nodes-label="noNodesLabel"
    :dark="dark"
  />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TreeComponent",
  props: {
    options: Array,
    label: String,
    tickStrategy: {
      type: String,
      default: "strict"
    },
    noNodesLabel: {
      type: String,
      default: "No data to show"
    },
    selected: {
      type: Array
    },
    ticked: {
      type: Array
    },
    expanded: {
      type: Array
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  methods: {
    onUpdate() {
      this.$emit("input", this.ticked);
    }
  }
};
</script>
