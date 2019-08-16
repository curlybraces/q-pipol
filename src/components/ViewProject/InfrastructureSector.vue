<template>
  <modal
    title="Infrastructure Sector"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <q-tree
        :nodes="infrastructure_sectors"
        node-key="value"
        tick-strategy="leaf"
        :ticked.sync="ticked"
      >
      </q-tree
      >`
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "InfrastructureSector",
  data() {
    return {
      ticked: []
    };
  },
  computed: {
    ...mapState("infrastructure_sectors", ["infrastructure_sectors"])
  },
  methods: {
    ...mapActions("infrastructure_sectors", ["loadInfrastructureSectors"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.ticked);
    }
  },
  created() {
    this.loadInfrastructureSectors();
  }
};
</script>
