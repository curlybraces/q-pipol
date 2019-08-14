<template>
  <modal title="Funding Source">
    <template v-slot:content>
      <div class="column q-col-gutter-y-md">
        <q-select
          outlined
          dense
          label="Main Funding Source"
          stack-label
          :options="funding_sources"
          v-model="funding_source"
          />

        <q-select
          outlined
          dense
          label="Funding Institution"
          stack-label
          :options="funding_institutions"
          v-model="funding_institution"
          />

        <q-select
          outlined
          dense
          label="Other Funding Source"
          stack-label
          :options="funding_sources"
          v-model="other_funding_source"
          />
      </div>
    </template>
  </modal>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Modal from "./Modal/Modal";

  export default {
    components: {
      Modal
    },
    name: "FundingSource",
    data() {
      return {
        funding_source: "",
        other_funding_source: "",
        funding_institution: ""
      }
    },
    computed: {
      ...mapState("funding_sources",["funding_sources"]),
      ...mapState("funding_institutions",["funding_institutions"])
    },
    methods: {
      ...mapActions("funding_sources",["loadFundingSources"]),
      ...mapActions("funding_institutions",["loadFundingInstitutions"])
    },
    created() {
      this.loadFundingSources();
      this.loadFundingInstitutions();
    }
  }
</script>
