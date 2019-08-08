<template>
  <q-page padding>
    <p>View Projects</p>
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

    <div class="q-pa-md absolute-top full-height full-width" style="margin-top:90px">
      <q-scroll-area style="height:400px">
        <list-component :items="projects"></list-component>
      </q-scroll-area>
    </div>

    <fab-component link="/projects/add" />
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ListComponent from "../../components/ListProjects/ListComponent";
import FabComponent from "../../components/UI/FabComponent";

export default {
  components: {
    FabComponent,
    ListComponent
  },
  name: "PageViewProjects",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("projects", ["projects", "projectsFiltered"]),
    ...mapState("projects", ["search"]),
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
    ...mapActions("projects", ["loadProjects", "setSearch"])
  },
  mounted() {
    this.loadProjects();
  }
};
</script>

<style>

</style>
