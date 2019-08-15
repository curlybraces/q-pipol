<template>
  <modal
    title="PDP Indicators"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <div class="q-col-gutter-y-md">
        <q-select
          stack-label
          label="Main PDP Chapter"
          dense
          outlined
          :options="pdp_chapters"
          v-model="pdp_chapter"/>

        <q-select
          stack-label
          label="Other PDP Chapter"
          dense
          outlined
          :options="pdp_chapters"
          v-model="other_pdp_chapter"/>

        <q-tree
          :nodes="pdp_outcomes"
          node-key="value"
          tick-strategy="strict"
          :ticked.sync="ticked"
          default-expand-all
        >
        </q-tree
        >
      </div>
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "PdpIndicators",
  data() {
    return {
      pdp_chapter: "",
      other_pdp_chapter: "",
      ticked: []
    };
  },
  computed: {
    ...mapState("pdp_chapters",["pdp_chapters"]),
    ...mapState("pdp_outcomes", ["pdp_outcomes"])
  },
  methods: {
    ...mapActions("pdp_chapters",["loadPdpChapters"]),
    ...mapActions("pdp_outcomes", ["loadPdpOutcomes"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description, this.as_of);
    }
  },
  created() {
    this.loadPdpChapters();
    this.loadPdpOutcomes();
  }
};
</script>
