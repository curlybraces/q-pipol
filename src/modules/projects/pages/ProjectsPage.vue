<template>
  <page-container>
    <page-title title="Projects"></page-title>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>

      <search-component v-model="search" placeholder="Search titles"></search-component>

      <project-pagination 
        v-model="currentPage" 
        :max="paginatedProjects.paginatorInfo.lastPage" 
        :max-pages="10" 
        @input="setPage" />

      <template v-for="project in paginatedProjects.data">
        <project-item :project="project" :key="project.id"></project-item>
      </template>

      <project-pagination 
        v-model="currentPage" 
        :max="paginatedProjects.paginatorInfo.lastPage" 
        :max-pages="10" 
        @input="setPage" />

    </template>

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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { PAGINATED_PROJECTS } from 'src/graphql/queries'
import { TRANSFERRED_PROJECT } from '@/graphql/subscriptions'
import PageTitle from '../../ui/page/PageTitle'
import ProjectItem from '../components/ProjectItem'
import PageContainer from '../../ui/page/PageContainer'
import SearchComponent from '../../shared/components/SearchComponent'
import ProjectPagination from '../components/ProjectPagination'

const PER_PAGE = 10

export default {
  name: 'ProjectsPage',
  components: {
  	// EndorseProjects,
		PageContainer,
		PageTitle,
		ProjectItem,
		SearchComponent,
    ProjectPagination
		// NoItem
	},
  apollo: {
    paginatedProjects: {
      query: PAGINATED_PROJECTS,
      variables() {
        return {
          first: this.first,
          page: this.currentPage
        }
      },
      result({ data }) {
        this.lastPage = data.paginatedProjects.paginatorInfo.lastPage
      }
    }
  },
  data() {
    return {
      paginatedProjects: {},
      search: '',
      currentPage: 1,
      first: PER_PAGE,
      lastPage: null
    };
  },
  watch: {
    $route(to, from) {
      // set currentPage to the query page of destination
      // this will update the query since the variables is reactive
      this.currentPage = parseInt(to.query.page)
    }
  },
  computed: {
    ...mapGetters('auth', ['user','isEncoder'])
  },
  methods: {
    setPage(pageNumber) {
      console.log(`page: ${pageNumber}`)
      // this will change the route based on the incoming pageNumber
      this.$router.push({ name: 'index-project', query: { page: pageNumber } })
    }
  },
  created() {
    // set the current page to the query page param, 
    // if it is not defined, set it to 1
    const currentPage = (this.$route.query.page === undefined) ? 1 : parseInt(this.$route.query.page)
    
    // finally set currentPage to the variable defined
    this.currentPage = currentPage
  }
};
</script>
