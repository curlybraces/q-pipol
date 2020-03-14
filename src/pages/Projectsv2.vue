<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="q-pa-sm">
      <q-card square>
        <q-toolbar class="bg-primary text-white">
          <q-avatar icon="list" color="white" class="text-primary" />
          <q-toolbar-title>
            Projects
          </q-toolbar-title>
          <q-input
            class="col-6"
            dense
            standout
            dark
            rounded
            placeholder="Search"
            v-model="searchField"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-card-section v-if="loading">
          <q-inner-loading :showing="loading">
            <q-spinner-dots size="50px" color="primary" />
          </q-inner-loading>
        </q-card-section>
        <div class="q-pa-sm row item-start q-col-gutter-sm">
          <template v-if="Object.keys(projects).length > 0">
            <project-card
              v-for="(project, key) in projects"
              :key="key"
              :project="project"
            />
          </template>
          <q-item-section v-else>
            <q-banner>
              No project yet.
            </q-banner>
          </q-item-section>
        </div>
      </q-card>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="create" color="primary" to="/pip/new" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import ProjectCard from '../components/ProjectCard';

export default {
  name: 'Projects',
  components: { PageBreadcrumbs, ProjectCard },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Projects'
        }
      ],
      expanded: false
    };
  },
  computed: {
    ...mapState('projects', ['loading', 'search']),
    ...mapGetters('projects', ['projects']),
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
    ...mapActions('projects', ['fetchProjects', 'setSearch'])
  },
  mounted() {
    this.fetchProjects({
      first: 25
    });
  }
};
</script>
