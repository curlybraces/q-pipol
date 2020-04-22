<template>
  <page-container>
    <page-title title="Add Program/Project" />

    <add-project></add-project>
  </page-container>
</template>

<script>
import { mapActions } from 'vuex';
import AddProject from '../components/AddEditProject/AddProject';
import PageTitle from '../components/PageTitle';
import PageContainer from '../components/PageContainer';

export default {
  components: { PageContainer, PageTitle, AddProject },
  methods: {
    ...mapActions('project', ['clearProject'])
  },
  mounted() {
    this.clearProject();
  }
};
</script>
