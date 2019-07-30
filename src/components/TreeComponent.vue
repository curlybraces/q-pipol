<template>
  <div class="row items-start q-my-md">
    <div class="col-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-tree
        :nodes="treeData"
        node-key="id"
        :tick-strategy="tickStrategy"
        :selected.sync="selected"
        :ticked.sync="ticked"
        :expanded.sync="expanded"
        label-key="name"
        @update:ticked="onUpdate"
        :no-nodes-label="noNodesLabel"
        :default-expand-all="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeComponent",
  props: {
    treeData: Array,
    label: String,
    tickStrategy: {
      type: String,
      default: "strict"
    },
    noNodesLabel: {
      type: String,
      default: "No nodes to show"
    },
    ticked: {
      type: Array,
      default: null
    },
    selected: {
      type: Array,
      default: null
    },
    expanded: {
      type: Array,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    onUpdate() {
      this.$emit("input", this.ticked);
    }
  }
};
</script>

<style></style>
