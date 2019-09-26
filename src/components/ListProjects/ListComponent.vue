<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <!-- <q-list bordered separator class="rounded-borders" :dark="dark">
      <q-item :class="dark ? 'bg-info' : 'bg-primary'" header>
        <div class="text-h6 absolute-center text-white">
          Projects
        </div>
      </q-item>
      <project
        v-for="project in projects"
        :key="project.id"
        :project="project"
      ></project>
    </q-list>-->
    <div class="row q-col-gutter-sm justify-start align-start">
      <div
        class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 flex"
        v-for="project in projects"
        :key="project.id"
      >
        <q-card class="fit" bordered flat square>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">{{ project.title }}</div>
              <div class="text-subtitle2">{{ project.implementingAgency }}</div>
            </div>
          </q-img>
          <q-separator />
          <q-card-actions align="around">
            <q-btn size="12px" flat dense round icon="visibility" :to="'projects/' + project.id" />

            <q-btn
              size="12px"
              flat
              dense
              round
              icon="edit"
              color="green"
              @click="showEditProject = true"
            />

            <q-btn
              size="12px"
              flat
              dense
              round
              icon="rate_review"
              color="secondary"
              @click="showReviewProject = true"
            />

            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
              color="red"
              @click.stop="promptToDelete(project.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// const Project = () => import("./Project");

export default {
  // components: { Project },
  name: "ListComponent",
  computed: {
    ...mapState("projects", ["search"]),
    ...mapState("settings", ["dark"]),
    ...mapGetters("projects", ["projects"])
  }
};
</script>

<style></style>
