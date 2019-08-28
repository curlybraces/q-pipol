<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <q-list
      bordered
      separator
      class="rounded-borders"
      :dark="dark">
      <q-item
        :class="(dark) ? 'bg-info' : 'bg-primary' " header>
        <div
          class="text-h6 absolute-center text-white">
          Projects
        </div>
      </q-item>
      <project
        v-for="(project, key) in projects"
        :key="key"
        :project="project"
        :id="key"
      ></project>
    </q-list>
  </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Project from "./Project";

export default {
  components: { Project },
  name: "ListComponent",
  props: {
    project: Object
  },
  computed: {
    ...mapState("projects", ["search"]),
    ...mapState("settings",["dark"]),
    ...mapGetters("projects", ["projects"])
  }
};
</script>

<style></style>
