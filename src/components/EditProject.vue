<template>
  <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
    <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
      <q-avatar icon="edit" />
      <q-toolbar-title>Edit Project</q-toolbar-title>
      <q-btn dense flat round icon="close" @click="$emit('close')" />
    </q-toolbar>
    <add-edit-project :project="project"></add-edit-project>
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
  computed: {
    ...mapState("settings", ["dark"])
  }
};
</script>
