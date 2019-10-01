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
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="new" label="New" />
        <q-tab name="reviewed" label="Reviewed" />
        <q-tab name="encoded" label="Encoded" />
        <q-tab name="finalized" label="Finalized" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="new">
          <q-list separator>
            <template v-if="newProjects.length">
              <project
                :key="project.id"
                v-for="project in newProjects"
                id="project.id"
                :project="project"
              ></project>
            </template>
            <no-project v-else></no-project>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="reviewed">
          <q-list separator>
            <template v-if="reviewedProjects.length">
              <project
                v-for="project in reviewedProjects"
                :key="project.id"
                id="project.id"
                :project="project"
              ></project>
            </template>
            <no-project v-else></no-project>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="encoded">
          <q-list separator>
            <template v-if="encodedProjects.length">
              <project
                v-for="project in encodedProjects"
                :key="project.id"
                id="project.id"
                :project="project"
              ></project>
            </template>
            <no-project v-else></no-project>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="finalized">
          <q-list separator>
            <template v-if="finalizedProjects.length">
              <project
                v-for="project in finalizedProjects"
                :key="project.id"
                id="project.id"
                :project="project"
              ></project>
            </template>
            <no-project v-else></no-project>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
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
    ...mapGetters("projects", [
      "projects",
      "newProjects",
      "encodedProjects",
      "reviewedProjects",
      "finalizedProjects"
    ])
  }
};
</script>

<style></style>
