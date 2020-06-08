<template>
  <page-container>
    <page-title title="Update Project"></page-title>

    <edit-project></edit-project>
  </page-container>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';
import EditProject from '../components/EditProject';

export default {
  components: {
    EditProject,
    PageContainer,
    PageTitle
  },
  name: 'PageEditProject'
};
</script>

<style scoped>
hr >>> .q-separator {
  width: 5px;
}
</style>
