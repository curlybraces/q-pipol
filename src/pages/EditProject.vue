<template>
  <add-edit-project :project="project"></add-edit-project>
</template>

<script>
import { projectRef } from "boot/firebase";
import AddEditProject from "../components/AddEditProject";

export default {
  components: {
    AddEditProject
  },
  name: "EditProject",
  data() {
    return {
      project: {}
    };
  },
  created() {
    projectRef
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.project = doc.data();
      });
  }
};
</script>
