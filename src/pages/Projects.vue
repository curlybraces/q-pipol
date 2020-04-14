<template>
  <q-page class="q-pt-lg">
    <page-title title="Projects">
      <q-btn
        label="Export to PDF"
        @click="printPDF"
        class="q-mr-sm"
        dense
      ></q-btn>
      <q-btn
        outline
        dense
        label="Add Project"
        :color="buttonColor"
        to="/projects/create"
        v-if="role === 'encoder'"
      ></q-btn>
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
    <template v-if="!$apollo.loading">
      <!-- when there are no items in the projects -->
      <template v-if="!projects.length">
        <q-banner>
          No project.
        </q-banner>
      </template>

      <!-- when there are items in the projects -->
      <template v-else>
        <q-list separator>
          <template v-for="project in projects">
            <project-item :project="project" :key="project.id" />
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
			<q-btn fab icon="add" color="primary" to="/projects/create" class="all-pointer-events" />
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
  // components: { , SortMenu, PageTitle,  },
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
      error: null
    };
  },
  computed: {
    ...mapState('auth', ['role']),
    ...mapState('settings', ['dark', 'buttonColor']),
		...mapGetters('auth',['isEncoder']),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    }
  },
  methods: {
    sortProjects() {
      const projects = this.projects;
      const sort = this.sort;
      const direction = this.direction;

      if (!sort && !direction) {
        return projects;
      } else {
        let projectsSorted = {},
          keysOrdered = Object.keys(projects);

        keysOrdered.sort((a, b) => {
          let projectAProp =
              sort !== 'total_project_cost'
                ? projects[a][sort].toLowerCase()
                : projects[a][sort],
            projectBProp =
              sort !== 'total_project_cost'
                ? projects[b][sort].toLowerCase()
                : projects[b][sort];

          if (direction === 'asc') {
            if (projectAProp > projectBProp) return 1;
            else if (projectAProp < projectBProp) return -1;
            else return 0;
          } else {
            if (projectAProp > projectBProp) return -1;
            else if (projectAProp < projectBProp) return 1;
            else return 0;
          }
        });

        keysOrdered.forEach(key => {
          projectsSorted[key] = projects[key];
        });

        return projectsSorted;
      }
    },
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
