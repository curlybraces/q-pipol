<template>
  <q-page padding>
    <tree-component label="PDP" :treeData="pdp" tickStrategy="leaf" v-model="selected" />
    <q-btn @click="onSubmit">Submit</q-btn>
  </q-page>
</template>

<script>
import TreeComponent from "../components/TreeComponent";
export default {
  components: { TreeComponent },
  name: "PageIndex",
  data() {
    return {
      pdp: [],
      selected: []
    };
  },
  methods: {
    loadPdpData() {
      this.$axios
        .get("/test")
        .then(res => {
          this.pdp = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onSubmit() {
      alert(this.selected);
    }
  },
  mounted() {
    this.loadPdpData();
  }
};
</script>
