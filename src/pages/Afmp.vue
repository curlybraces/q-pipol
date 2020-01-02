<template>
  <q-page padding>
    <div class="row">
      <scrolling-card title="regions" :list="REGIONS"> </scrolling-card>
    </div>
  </q-page>
</template>

<script>
import ScrollingCard from "../components/ScrollingCard";
import { REGIONS, PROGRAMS } from "../data/dropdown-values.js";

export default {
  components: {
    "scrolling-card": ScrollingCard
  },
  name: "PageAfmp",
  data() {
    return {
      REGIONS,
      PROGRAMS
    };
  }
};
</script>

<style scoped></style>
