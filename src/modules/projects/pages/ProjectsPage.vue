<template>
  <page-container>
    <page-title title="Projects">
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
      <template v-if="paginatedProjects.data">
        <template v-if="paginatedProjects.data.length">
          <project-pagination
            v-model="currentPage"
            :max="
              paginatedProjects.paginatorInfo
                ? paginatedProjects.paginatorInfo.lastPage
                : 1
            "
            :max-pages="10"
            @input="setPage"
          />

          <q-list separator bordered>
            <template v-for="project in paginatedProjects.data">
              <project-item 
                :project="project" 
                :key="project.id">
              </project-item>
            </template>
          </q-list>

          <project-pagination
            v-model="currentPage"
            :max="
              paginatedProjects.paginatorInfo
                ? paginatedProjects.paginatorInfo.lastPage
                : 1
            "
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
    paginatedProjects: {
      query: PAGINATED_PROJECTS,
      variables() {
        return {
          first: PER_PAGE,
          page: this.currentPage
        };
      }
    }
  },
  data() {
    return {
      paginatedProjects: {},
      search: '',
      currentPage: 1,
      first: PER_PAGE,
      lastPage: null,
      searchProjectDialog: false
    };
  },
  // watch: {
  //   $route(to, from) {
  //     console.log('i am triggered from route change');
  //     // set currentPage to the query page of destination
  //     // this will update the query since the variables is reactive
  //     // this.loadProjects(parseInt(to.query.page))
  //   }
  // },
  computed: {
    ...mapGetters('auth', ['user', 'isEncoder'])
  },
  methods: {
    setPage(pageNumber) {
      // this will change the route based on the incoming pageNumber
      this.$router.push({ name: 'index-project', query: { page: pageNumber } });
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

    // this.loadProjects(currentPage)
  }
};
</script>
