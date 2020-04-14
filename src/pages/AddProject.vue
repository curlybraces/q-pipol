<template>
  <q-page class="q-pt-lg">
    <page-title title="Add Project" />

    <add-project></add-project>
  </q-page>
</template>

<script>
import AddProject from '../components/AddEditProject/AddProject';
import PageTitle from '../components/PageTitle';

export default {
  components: { PageTitle, AddProject }
};
</script>
