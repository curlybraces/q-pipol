<template>
  <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
    <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
      <q-avatar icon="edit" />
      <q-toolbar-title>Edit Project</q-toolbar-title>
      <q-btn dense flat round icon="close" @click="$emit('close')" />
    </q-toolbar>
    <add-edit-project :project="projectToUpdate"></add-edit-project>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import AddEditProject from "./AddEditProject";

export default {
  components: { AddEditProject },
  name: "EditProject",
  props: {
    project: Object
  },
  data() {
    return {
      projectToUpdate: {}
    }
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  mounted() {
    this.projectToUpdate = Object.assign({}, this.project)
  }
};
</script>
