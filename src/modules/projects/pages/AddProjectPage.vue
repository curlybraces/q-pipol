<template>
  <page-container>
    <page-title title="Add Program/Project" />

    <add-project></add-project>
  </page-container>
</template>

<script>
import AddProject from '../components/AddProject';
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';

export default {
  components: { PageContainer, PageTitle, AddProject }
};
</script>
