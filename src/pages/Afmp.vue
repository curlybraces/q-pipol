<template>
  <q-page padding>
    <scrolling-card title="regions" :list="REGIONS"></scrolling-card>
    <scrolling-card title="programs" :list="PROGRAMS"></scrolling-card>
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
