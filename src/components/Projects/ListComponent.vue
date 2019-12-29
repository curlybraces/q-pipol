<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <q-card flat>
      <q-toolbar>
        <q-toolbar-title>Projects</q-toolbar-title>
      </q-toolbar>
      <q-list separator>
        <template v-if="finalizedProjects.length">
          <project
            v-for="project in finalizedProjects"
            :key="project.id"
            id="project.id"
            v-bind="project"
          ></project>
        </template>
        <no-project v-else></no-project>
      </q-list>
    </q-card>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    project: () => import(/* webpackChunkName: 'Project' */ "./Project"),
    "no-project": () =>
      import(/* webpackChunkName: 'NoProject' */ "./NoProject")
  },
  name: "ListComponent",
  data() {
    return {
      tab: "new"
    };
  },
  computed: {
    ...mapGetters("projects", ["projects"]),
    newProjects() {
      return this.projects.filter(project => {
        if (typeof project.status === "undefined" || project.status == "new") {
          return true;
        }
      });
    },
    encodedProjects() {
      return this.projects.filter(project => {
        if (typeof project.status !== "undefined") {
          return project.status == "encoded";
        }
      });
    },
    reviewedProjects() {
      return this.projects.filter(project => {
        if (typeof project.status !== "undefined") {
          return project.status == "reviewed";
        }
      });
    },
    finalizedProjects() {
      return this.projects.filter(project => {
        if (typeof project.status !== "undefined") {
          return project.status == "finalized";
        }
      });
    }
  }
};
</script>
