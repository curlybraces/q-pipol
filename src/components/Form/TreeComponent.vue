<template>
  <div class="row items-start q-my-md">
    <div class="col-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      {{ ticked }}<br />
      {{ expanded }}
      <q-tree
        :nodes="treeData"
        node-key="id"
        :tick-strategy="tickStrategy"
        label-key="name"
        :selected.sync="selected"
        :expanded.sync="expanded"
        :ticked.sync="ticked"
        @update:ticked="onUpdate"
        :no-nodes-label="noNodesLabel"
        default-expand-all
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
  computed: {},
  methods: {
    onUpdate() {
      this.$emit("input", this.ticked);
    }
  }
};
</script>

<style></style>
