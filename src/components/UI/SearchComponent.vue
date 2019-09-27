<template>
  <div class="row full-width align-center">
    <q-input
      outlined
      dense
      rounded
      :dark="dark"
      class="col q-mb-md"
      clearable
      placeholder="Search in project titles..."
      v-model="searchField"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-btn flat round dense color="grey-8" icon="filter_list"></q-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SearchComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState("projects", ["search"]),
    ...mapState("settings", ["dark"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions("projects", ["setSearch"])
  }
};
</script>
