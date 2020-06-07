<template>
  <page-container>
    <page-title :title="`${status.toUpperCase()} Projects`">
      <q-btn
        color="primary"
        label="search"
        @click="searchProjectDialog = true"
      ></q-btn>
    </page-title>

    <template v-if="$apollo.loading">
      <q-list>
        <project-skeleton v-for="i in 10" :key="i"></project-skeleton>
      </q-list>
    </template>

    <template v-else>
      <template v-if="projects.data">
        <template v-if="projects.data.length">
          <project-pagination
            v-model="currentPage"
            :max="projects.paginatorInfo ? projects.paginatorInfo.lastPage : 1"
            :max-pages="10"
            @input="setPage"
          />

          <q-list separator bordered>
            <template v-for="project in projects.data">
              <project-item :project="project" :key="project.id">
              </project-item>
            </template>
          </q-list>

          <project-pagination
            v-model="currentPage"
            :max="projects.paginatorInfo ? projects.paginatorInfo.lastPage : 1"
            :max-pages="10"
            @input="setPage"
          />
        </template>

        <div v-else>
          <no-item icon="cancel" message="No project found."></no-item>
        </div>
      </template>
    </template>

    <search-project
      v-model="searchProjectDialog"
      @close="searchProjectDialog = false"
    />

    <!-- Back to top button -->
    <q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="isEncoder">
      <q-btn
        fab
        icon="add"
        color="primary"
        to="/projects/add"
        class="all-pointer-events"
      />
    </q-page-sticky>
  </page-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { PAGINATED_PROJECTS } from 'src/graphql/queries';
import PageTitle from '@/ui/page/PageTitle';
import ProjectItem from '../components/ProjectItem';
import PageContainer from '@/ui/page/PageContainer';
import ProjectPagination from '../components/ProjectPagination';
import SearchProject from '../components/dialogs/SearchProject';
import NoItem from '@/ui/components/NoItem';
import ProjectSkeleton from '../components/ProjectSkeleton';
import { PROCESSING_STATUS } from '@/constants/processing_status';

const PER_PAGE = 10;

export default {
  name: 'ProjectsPage',
  components: {
    PageContainer,
    PageTitle,
    ProjectItem,
    ProjectPagination,
    SearchProject,
    NoItem,
    ProjectSkeleton
  },
  apollo: {
    projects: {
      query: PAGINATED_PROJECTS,
      variables() {
        return {
          processing_status_id: this.processing_status_id,
          first: PER_PAGE,
          page: this.currentPage
        };
      }
    }
  },
  props: ['status'],
  data() {
    return {
      projects: {},
      search: '',
      currentPage: 1,
      first: PER_PAGE,
      lastPage: null,
      searchProjectDialog: false
    };
  },
  computed: {
    ...mapGetters('auth', ['user', 'isEncoder']),
    processing_status_id() {
      const status = this.$props.status;

      if (!status) {
        return 1;
      }

      return PROCESSING_STATUS[status];
    }
  },
  methods: {
    setPage(pageNumber) {
      // this will change the route based on the incoming pageNumber
      // console.log(this.$route)
      this.$router.push({
        name: this.$route.name,
        query: { page: pageNumber }
      });
    }
  },
  created() {
    // set the current page to the query page param,
    // if it is not defined, set it to 1
    const currentPage =
      this.$route.query.page === undefined
        ? 1
        : parseInt(this.$route.query.page);

    this.currentPage = currentPage;

    console.log(this.$props);

    // this.loadProjects(currentPage)
  }
};
</script>
