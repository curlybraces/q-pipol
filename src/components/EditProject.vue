<template>
  <q-card :class="dark ? 'bg-grey-10' : 'bg-white'">
    <q-toolbar :class="(dark ? 'bg-info' : 'bg-primary') + ' text-white'">
      <q-avatar icon="edit" />
      <q-toolbar-title>Edit Project</q-toolbar-title>
      <q-btn dense flat round icon="close" @click="$emit('close')" />
    </q-toolbar>
    <add-edit-project :project="projectToUpdate"> </add-edit-project>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
const AddEditProject = () =>
  import(
    /* webpackChunkName: 'AddEditProject' */ "../components/AddEditProject"
  );

export default {
  components: {
    AddEditProject
  },
  name: "EditProject",
  props: {
    project: Object
  },
  data() {
    return {
      projectToUpdate: {}
    };
  },
  methods: {
    onSubmit() {
      console.log(this.projectToUpdate);
    }
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  mounted() {
    Object.assign(this.projectToUpdate, this.project);
  }
};
</script>
