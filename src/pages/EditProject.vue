<template>
  <q-page class="q-pt-lg">
    <page-title title="Edit Project"></page-title>

    <template v-if="getLoading">
      <q-inner-loading :showing="getLoading">
        <q-spinner-dots color="primary" size="50px"></q-spinner-dots>
      </q-inner-loading>
    </template>
    <template v-else>
      <add-edit-project></add-edit-project>
    </template>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageTitle from '../components/PageTitle';
import AddEditProject from '../components/AddEditProject/shared/AddEditProject';

export default {
  components: {
    AddEditProject,
    PageTitle
  },
  name: 'PageEditProject',
  methods: {
    ...mapActions('project', ['updateProject', 'fetchProject', 'loading'])
  },
  computed: {
    ...mapGetters('project', ['getLoading'])
  },
  mounted() {
    this.fetchProject(this.$route.params.id);
  }
};
</script>
