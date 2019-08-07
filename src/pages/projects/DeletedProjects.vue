<template>
  <q-page padding>
    <p>Deleted Projects</p>
    <q-input
      outlined
      dense
      rounded
      class="q-mb-md"
      clearable
      placeholder="Search in project titles..."
      @keydown.enter="search"
      v-model="searchField"
    >
      <template v-slot:append>
        <q-icon name="search" @click="search" />
      </template>
    </q-input>

    <list-component :items="deletedProjects"> </list-component>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListComponent from "../../components/ListProjects/ListComponent";

export default {
  components: { ListComponent },
  name: "PageDeletedProjects",
  computed: {
    ...mapState("projects", ["deletedProjects"])
  },
  methods: {
    ...mapActions("projects", ["loadDeletedProjects"])
  },
  mounted() {
    this.loadDeletedProjects();
  }
};
</script>

<style></style>
