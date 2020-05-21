<template>
  <page-container>
    <page-title title="Endorse Projects"></page-title>
    <q-form @submit.prevent="handleSubmit" class="column q-gutter-y-sm q-pa-sm">
      <div class="row">
        <div class="col-8 q-pa-sm">
          <q-list separator bordered>
            <template v-for="project in selectedProjects">
              <project-item :project="project" :key="project.id"></project-item>
            </template>
          </q-list>
        </div>

        <div class="col-4 q-pa-md">
          <q-card class="q-pa-sm">
            <q-file v-model="file" label="Endorsement Letter" outlined>
              <template v-slot:append>
                <q-icon name="attachment" />
              </template>
            </q-file>

            <div class="row justify-end">
              <q-btn
                class="q-mt-sm full-width"
                label="Endorse"
                color="primary"
                type="submit"
              ></q-btn>
            </div>
          </q-card>
        </div>
      </div>
    </q-form>
  </page-container>
</template>

<script>
import { mapState } from 'vuex';
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';
import ProjectItem from '../components/ProjectItem';

export default {
  components: {
    PageContainer,
    PageTitle,
    ProjectItem
  },
  name: 'EndorseProjects',
  computed: {
    ...mapState('projects', ['selectedProjects'])
  },
  data() {
    return {
      file: null,
      error: null,
      loading: false
    };
  },
  methods: {
    handleSubmit() {
      let selectedProjectIds = [];

      this.selectedProjects.map(project => selectedProjectIds.push(project.id));

      this.$store.dispatch('projects/endorseProjects', {
        projects: selectedProjectIds,
        file: this.file
      });
    },
    clearError() {
      this.error = null;
    }
  }
};
</script>
