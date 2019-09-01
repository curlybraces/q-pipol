<template>
  <q-card>
    <q-toolbar class="bg-primary text-white">
      <q-avatar icon="edit" />
      <q-toolbar-title>Edit Project</q-toolbar-title>
      <q-btn
        dense
        flat
        round
        icon="close"
        @click="$emit('close')"
      />
    </q-toolbar>
    <add-edit-project :project="project"></add-edit-project>
  </q-card>
</template>

<script>
import AddEditProject from "./AddEditProject";

export default {
  components: { AddEditProject },
  name: "EditProject",
  props: {
    project: Object
  }
}
</script>