<template>
  <q-page>
    <div class="q-pa-md absolute full-height full-width column">
      <q-banner dense class="bg-red-2 q-mb-md" v-if="!emailVerified">
        <template v-slot:avatar>
          <q-icon name="warning" color="red" />
        </template>
        Your email is not verified. You can only view projects. Click the link
        below to verify your email to add/update projects.
        <template
          v-slot:action
        >
          <q-btn flat color="red" label="VERIFY EMAIL" @click="sendEmailVerification" />
        </template>
      </q-banner>
      <template v-if="projectsDownloaded">
        <search-component />

        <no-project v-if="!projects.length && !search" />

        <q-scroll-area v-if="projects.length" class="q-scroll-area-projects" style="height:100px">
          <list-component :items="projects" />
        </q-scroll-area>

        <p v-if="!projects.length && search">No search results found.</p>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em"></q-spinner>
        </span>
      </template>
    </div>

    <fab-component />

    <welcome-dialog />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import WelcomeDialog from "../components/ListProjects/WelcomeDialog";
import ListComponent from "../components/ListProjects/ListComponent";
import NoProject from "../components/ListProjects/NoProject";
import FabComponent from "../components/UI/FabComponent";
import SearchComponent from "../components/UI/SearchComponent";

export default {
  components: {
    WelcomeDialog,
    FabComponent,
    ListComponent,
    SearchComponent,
    NoProject
  },
  name: "PageViewProjects",
  computed: {
    ...mapState("projects", ["search", "projectsDownloaded"]),
    ...mapState("auth", ["emailVerified"]),
    ...mapGetters("projects", ["projects"])
  },
  methods: {
    ...mapActions("auth", ["sendEmailVerification"])
  }
};
</script>

<style>
.q-scroll-area-projects {
  display: flex;
  flex-grow: 1;
}
</style>
