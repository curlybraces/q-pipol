<template>
  <q-page class="q-pt-lg">
    <page-title title="Projects">
      <q-btn
        outline
        label="Add Project"
        dense
        :color="buttonColor"
        to="/projects/new"
        v-if="role === 'encoder'"
      ></q-btn>
    </page-title>

    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Programs and Projects"
          v-model="searchField"
          :debounce="500"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-inner-loading :showing="loading && !projectCount">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>

      <template v-if="loading && !projectCount">
        <project-skeleton />
      </template>

      <template v-if="projectCount">
        <sort-menu></sort-menu>

        <q-separator />

        <q-list separator>
          <template v-for="(project, key) in sortedProjects">
            <project-item :project="project" :key="key"></project-item>
          </template>

          <q-item
            clickable
            @click="loadProjects"
            v-if="!loading && pageInfo.hasNextPage"
          >
            <q-item-section class="text-center">
              Load More
            </q-item-section>
          </q-item>

          <q-item v-if="loading">
            <q-inner-loading :showing="loading && projectCount > 0">
              <q-spinner-dots size="50px"></q-spinner-dots>
            </q-inner-loading>
          </q-item>

          <q-item v-if="!loading && !pageInfo.hasNextPage">
            <q-item-section class="text-center">
              This is the last page.
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PageTitle from '../components/PageTitle';
import SortMenu from '../components/Projects/SortMenu';
import ProjectSkeleton from '../components/Projects/ProjectSkeleton';
import ProjectItem from '../components/Projects/ProjectItem';

export default {
  name: 'Projects',
  components: { ProjectSkeleton, SortMenu, PageTitle, ProjectItem },
  data() {
    return {
      expanded: false,
      first: 25,
      endCursor: ''
    };
  },
  computed: {
    ...mapState('auth', ['role']),
    ...mapState('projects', [
      'loading',
      'search',
      'pageInfo',
      'sort',
      'direction'
    ]),
    ...mapState('settings', ['dark', 'buttonColor']),
    ...mapGetters('projects', ['projects', 'projectCount']),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    },
    sortedProjects() {
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
    }
  },
  methods: {
    ...mapActions('projects', ['fetchProjects', 'setSearch']),
    loadProjects() {
      const first = this.first;
      const endCursor =
        this.pageInfo.endCursor == undefined ? '' : this.pageInfo.endCursor;
      const hasNextPage =
        this.pageInfo.hasNextPage == undefined
          ? true
          : this.pageInfo.hasNextPage;

      if (hasNextPage) {
        console.log('loading more');
        this.fetchProjects({
          first: first,
          after: endCursor
        });
      } else {
        console.log('Nothing to load');
      }
    }
  },
  mounted() {
    if (!this.projectCount) {
      this.loadProjects();
    }
  }
};
</script>
