<template>
  <q-page>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="q-pa-sm">
      <q-input
        class="col"
        dense
        outlined
        rounded
        placeholder="Search"
        v-model="searchField"
      >
        <template v-slot:append>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <div class="q-pa-sm row q-gutter-md">
      <div v-if="loading">Loading projects...</div>

      <project-card
        v-for="(project, key) in projects"
        :key="key"
        :project="project"
      />
    </div>
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
