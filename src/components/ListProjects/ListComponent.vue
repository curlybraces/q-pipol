<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div class="row q-col-gutter-sm justify-start align-start">
      <div
        class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 flex"
        v-for="project in projects"
        :key="project.id"
      >
        <project :key="project.id" :project="project"></project>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const Project = () => import("./Project");

export default {
  components: { Project },
  name: "ListComponent",
  computed: {
    ...mapState("projects", ["search"]),
    ...mapGetters("projects", ["projects"])
  }
};
</script>

<style></style>
