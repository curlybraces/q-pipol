<template>
  <q-page padding>
    <q-card :class=" dark ? 'bg-grey-10': 'bg-white' ">
      <q-toolbar :class="(dark ? 'bg-info': 'bg-primary') + ' text-white'">
        <q-avatar icon="note_add" />
        <q-toolbar-title>Add Project</q-toolbar-title>
      </q-toolbar>
      <add-edit-project :project="project"></add-edit-project>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddEditProject from "../../components/AddEditProject";

export default {
  components: {
    AddEditProject
  },
  name: "PageAddProject",
  data() {
    return {
      project: {
        pdp: [],
        newThinkings: [],
        sustainableDevelopmentGoals: [],
        tenPointAgenda: []
      }
    };
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  methods: {
    ...mapActions("projects", ["addProject"])
  }
};
</script>
