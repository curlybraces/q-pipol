<template>
  <div>
    <q-list bordered> </q-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FundComponent",
  data() {
    return {
      fundingSource: []
    };
  },
  computed: {
    ...mapState("funding_sources", ["fundingSources"])
  },
  methods: {
    submit() {
      console.log(this.fundingSource);
    }
  }
};
</script>
