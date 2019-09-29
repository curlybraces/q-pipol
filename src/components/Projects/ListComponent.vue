<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <q-card>
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
          <q-tab name="finalized" label="Finalized" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="new">
            <q-list bordered separator>
              <template
                v-for="project in projects"
                >
                <project
                  :key="project.id"
                  id="project.id"
                  :project="project"></project>
              </template>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="reviewed">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="finalized">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
    </q-card>

  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    "project": () => import(/* webpackChunkName: 'Project' */ "./Project")
  },
  name: "ListComponent",
  data() {
    return {
      tab: "new"
    }
  },
  computed: {
    ...mapGetters("projects", ["projects"])
  }
};
</script>

<style></style>
