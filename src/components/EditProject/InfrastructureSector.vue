<template>
  <div>
    <q-tree
      :nodes="infrastructure_sectors"
      node-key="value"
      tick-strategy="leaf"
      :ticked.sync="ticked"
      > </q-tree>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

  export default {
    name: "InfrastructureSector",
    data() {
      return {
        ticked: []
      }
    },
    computed: {
      ...mapState("infrastructure_sectors",["infrastructure_sectors"])
    },
    methods: {
      ...mapActions("infrastructure_sectors",["loadInfrastructureSectors"])
    },
    created() {
      this.loadInfrastructureSectors();
    }
  }
</script>
