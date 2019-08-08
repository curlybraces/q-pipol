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

    <list-component
      v-if="deletedProjects.length > 0"
      :items="deletedProjects"></list-component>
      
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListComponent from "../../components/ListProjects/ListComponent";

export default {
  components: { ListComponent },
  name: "PageDeletedProjects",
  data() {
    return {
    }
  },
  computed: {
    ...mapState("projects", ["deletedProjects","search"]),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions("projects", ["loadDeletedProjects","setSearch"])
  },
  mounted() {
    this.loadDeletedProjects();
  }
};
</script>

<style></style>
