<template>
  <q-page>
    <div class="q-pa-md absolute full-height full-width column">
      <q-breadcrumbs separator=">" class="q-my-md">
        <q-breadcrumbs-el icon="list" label="Projects" />
      </q-breadcrumbs>

      <template v-if="projectsDownloaded">
        <search-component />

        <no-project v-if="!Object.keys(projects).length && !search" />

        <q-scroll-area
          v-if="Object.keys(projects).length"
          class="q-scroll-area-projects"
          style="height:100px"
        >
          <list-component :items="projects" />
        </q-scroll-area>

        <p v-if="!Object.keys(projects).length && search">
          No search results found.
        </p>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="3em"
          ></q-spinner>
        </span>
      </template>
    </div>

    <fab-component link="/projects/add" />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
  computed: {
    ...mapState("projects", ["search","projectsDownloaded"]),
    ...mapGetters("projects", ["projects"])
  }
};
</script>

<style>
.q-scroll-area-projects {
  display: flex;
  flex-grow: 1;
}
</style>
