<template>
  <q-page>
    <div class="q-pa-md absolute full-height full-width column">
      <p>View Projects</p>

      <search-component v-if="projects.length > 0" />

      <div class="q-mb-md flex flex-center">
        <q-pagination
          v-model="current_page"
          color="primary"
          :max="total_pages"
          :boundary-links="true"
          @input="loadProjects"
        >
        </q-pagination>
      </div>

      <q-scroll-area
        v-if="projects.length > 0"
        class="q-scroll-area-projects"
        style="height:100px"
      >
        <list-component :items="projects" />
      </q-scroll-area>

      <no-project v-else />
    </div>

    <fab-component link="/projects/add" />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ListComponent from "../../components/ListProjects/ListComponent";
import NoProject from "../../components/ListProjects/NoProject";
import FabComponent from "../../components/UI/FabComponent";
import SearchComponent from "../../components/UI/SearchComponent";

export default {
  components: {
    FabComponent,
    ListComponent,
    SearchComponent,
    NoProject
  },
  name: "PageViewProjects",
  data() {
    return {
      current_page: 1
    };
  },
  computed: {
    ...mapState("projects",["total_pages"]),
    ...mapGetters("projects", ["projects", "projectsFiltered"])
  },
  methods: {
    ...mapActions("projects", ["loadProjects"])
  },
  mounted() {
    this.loadProjects();
  }
};
</script>

<style>
.q-scroll-area-projects {
  display: flex;
  flex-grow: 1;
}
</style>
