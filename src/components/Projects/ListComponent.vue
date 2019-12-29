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
        <template v-if="projects.length">
          <project
            v-for="project in projects"
            :key="project.id"
            :id="project.id"
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
  computed: {
    ...mapGetters("projects", ["projects"])
  }
};
</script>
