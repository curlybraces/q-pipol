<template>
  <modal title="Funding Source">
    <template v-slot:content>
      <div class="column q-col-gutter-y-md">
        <q-select
          outlined
          dense
          v-model="funding_source"
          />
        <q-select
          outlined
          dense
          v-model="other_funding_source"
          />
      </div>
    </template>
  </modal>
</template>

<script>
  import Modal from "./Modal/Modal";
  export default {
    components: {
      Modal
    },
    name: "FundingSource",
    data() {
      return {
        funding_source: "",
        other_funding_source: ""
      }
    }
  }
</script>
