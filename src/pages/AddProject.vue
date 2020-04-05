<template>
  <q-page class="q-pt-lg">
    <page-title title="Add Project"></page-title>

    <add-edit-project></add-edit-project>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import PageTitle from '../components/PageTitle';
import AddEditProject from '../components/AddEditProject/shared/AddEditProject';

export default {
  components: { PageTitle, AddEditProject },
  name: 'AddProject',
  methods: {
    ...mapActions('project', ['clearProject'])
  },
  mounted() {
    this.clearProject();
  }
};
</script>
