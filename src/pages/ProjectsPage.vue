<template>
  <q-page class="q-pt-lg">
    <page-title title="Projects">
      <q-btn icon="build" flat round color="primary">
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list>
            <q-item @click="printPDF">
              <q-item-section avatar>
                <q-avatar><q-icon name="print"></q-icon></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Export to PDF</q-item-label>
              </q-item-section>
            </q-item>
            <q-item @click="printPDF" to="/projects/add" v-if="isEncoder">
              <q-item-section avatar>
                <q-avatar><q-icon name="add"></q-icon></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Add Project</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </page-title>

    <q-dialog v-model="uploadFileAndSubmit">
      <q-card style="width: 300px">
        <q-form enctype="multipart/form-data" @submit.prevent="doSomething">
          Upload File and Submit
          <q-input @input="handleFile" type="file" />

          <q-btn type="submit" label="Submit" />
        </q-form>
      </q-card>
    </q-dialog>

    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Programs and Projects"
          v-model="searchField"
          :debounce="500"
					hint="This only works for projects loaded in the list below."
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- show while loading -->
    <template v-if="$apollo.loading">
      <project-skeleton />
    </template>

    <!-- show when loaded -->
    <template else>
      <!-- when there are no items in the projects -->
      <template v-if="!projects.length">
        <q-banner dense class="q-ma-sm bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="cancel" color="red" />
          </template>
          You have no projects to show. If you have added a project but was not
          listed here even after refreshing. Please seek our assistance.
          <template v-slot:action>
            <q-btn
              flat
              color="red"
              label="Add a New Project"
              to="/projects/add"
              v-if="isEncoder"
            />
          </template>
        </q-banner>
      </template>

      <!-- when there are items in the projects -->
      <template v-else>
        <q-list separator>
          <template v-for="project in filteredProjects">
            <project-item
              :project="project"
              :key="project.id"
              :search="searchField"
            />
          </template>
        </q-list>
      </template>
    </template>

    <!-- show when error -->
    <template v-if="error">
      <div>
        {{ error }}
      </div>
    </template>

    <q-page-sticky position="bottom" :offset="[18, 18]" v-if="isEncoder">
      <q-btn
        fab
        icon="add"
        color="primary"
        to="/projects/add"
        class="all-pointer-events"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PageTitle from '../components/PageTitle';
import ProjectSkeleton from '../components/Projects/ProjectSkeleton';
import ProjectItem from '../components/Projects/ProjectItem';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GET_PROJECTS } from '../graphql/queries';

export default {
  components: { PageTitle, ProjectSkeleton, ProjectItem },
  name: 'Projects',
  apollo: {
    projects: {
      query: GET_PROJECTS,
      error(error) {
        this.error = error;
      }
    }
  },
  data() {
    return {
      uploadFileAndSubmit: false,
      fileIsValid: false,
      printPreview: true,
      projects: [],
      error: null,
      searchField: null
    };
  },
  computed: {
    ...mapState('auth', ['role']),
    ...mapState('settings', ['dark', 'buttonColor']),
    ...mapGetters('auth', ['isEncoder']),
    filteredProjects() {
      const searchText = this.searchField
        ? this.searchField.trim().toLowerCase()
        : null;
      const projects = this.projects;
      let filteredProjects = [];

      if (searchText) {
        filteredProjects = projects.filter(project =>
          project.title.toLowerCase().includes(searchText)
        );

        return filteredProjects;
      }
      return projects;
    }
  },
  methods: {
    checkFile(file) {
      const uploadedFile = file;
      if (
        uploadedFile.type === 'application/pdf' ||
        uploadedFile.size < 5242880
      ) {
        return true;
      }
      return false;
    },
    handleFile(file) {
      if (this.checkFile(file[0])) {
        console.log('file is good');
      }
    },
    doSomething() {
      //
    },
    printPDF() {
      const doc = new jsPDF('p', 'in', 'a4');

      doc.setFontSize(11);

      let projectArray = [];

      Object.keys(this.projects).forEach(key => {
        let project = this.projects[key];

        projectArray.push(project);
      });

      doc.autoTable({
        body: projectArray,
        columnStyles: {
          id: { cellWidth: 'wrap' },
          title: { cellWidth: 'auto' },
          description: { cellWidth: 'auto' },
          total_project_cost: { halign: 'right', cellWidth: 'wrap' }
        },
        columns: [
          { header: 'ID', dataKey: 'id' },
          { header: 'Title', dataKey: 'title' },
          { header: 'Description', dataKey: 'description' },
          { header: 'Total Project Cost', dataKey: 'total_project_cost' }
        ],
        margin: {
          top: 1,
          left: 1,
          right: 1,
          bottom: 1
        },
        tableWidth: 'auto'
      });

      doc.save('projects.pdf');
    }
  }
};
</script>
