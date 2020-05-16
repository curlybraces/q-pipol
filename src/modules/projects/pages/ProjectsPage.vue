<template>
  <page-container>
    <page-title title="Projects"></page-title>

    <search-component v-model="search" placeholder="Search titles"></search-component>

    <template v-if="!!initialLoading">
      <q-inner-loading :showing="!!initialLoading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
      <template v-if="!relayProjects.edges.length">
        <no-item icon="cancel" message="You have no projects to show. If you have added a project but was not
          listed here even after refreshing. Please seek our assistance."></no-item>
      </template>

      <template v-else>
  			<div class="row justify-between items-center q-pa-sm">
  				<div>
  					{{ `Showing ${relayProjects.edges ? relayProjects.edges.length : 0} of ${relayProjects.pageInfo ? relayProjects.pageInfo.total : 0 } projects` }}
  				</div>
  				<div>
  					<q-btn
							v-if="isEncoder"
  						color="primary"
  						label="Endorse"
  						@click="endorseProjectDialog = true"
  						icon-right="chevron_right" />
  				</div>
  			</div>

        <div class="q-pa-sm">
    			<q-list separator bordered>
            <q-item-label header v-if="this.search.length >= 3"
              >Found <b>{{ filteredProjects.length }}</b> titles that match
              <span class="text-negative">{{ search }}...</span></q-item-label
            >
            <template v-for="{ node } in filteredProjects">
              <project-item :project="node" :key="node.id"></project-item>
            </template>
            <q-item
              :clickable="hasMore && !loadingMore"
              v-if="!initialLoading && relayProjects.edges.length"
              class="text-center"
              @click="loadMore"
            >
							<template v-if="!!loadingMore">
								<q-inner-loading :showing="!!loadingMore" >
									<q-spinner-dots color="primary" size="50px"></q-spinner-dots>
								</q-inner-loading>
							</template>
							<template v-else>
								<q-item-section class="text-primary">
									{{ hasMore ? 'Load More...' : 'End' }}
								</q-item-section>
							</template>
            </q-item>
          </q-list>
        </div>
      </template>
    </template>

		<q-dialog
			v-model="endorseProjectDialog"
			full-height
			:position="$q.screen.xs ? void 0 : 'right'"
			persistent
			:maximized="$q.screen.xs"
			transition-show="jump-left"
			transition-hide="jump-right">
			<endorse-projects
				:projects="relayProjects.edges"
				@close="endorseProjectDialog = false" />
		</q-dialog>

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
import { RELAY_PROJECTS_QUERY } from 'src/graphql/queries'
import { TRANSFERRED_PROJECT } from '@/graphql/subscriptions'
const EndorseProjects = () => import(/* webpackChunkName: 'EndorseProjects' */ '../components/EndorseProjects')
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '../../ui/page/PageTitle');
const ProjectItem = () =>
  import(/* webpackChunkName: 'ProjectItem' */ '../components/ProjectItem');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageContainer' */ '../../ui/page/PageContainer');
const SearchComponent = () => import(/* webpackChunkName: 'SearchComponent' */ '../../shared/components/SearchComponent')
const NoItem = () => import(/* webpackChunkName: 'NoItem' */ '../../shared/components/NoItem')


export default {
  name: 'ProjectsPage',
  components: {
  	EndorseProjects,
		PageContainer,
		PageTitle,
		ProjectItem,
		SearchComponent,
		NoItem
	},
  apollo: {
    relayProjects: {
      query: RELAY_PROJECTS_QUERY,
      variables: {
        first: 10,
        after: ''
      },
      result({ data, loading }) {
        this.hasMore = data.relayProjects ? data.relayProjects.pageInfo.hasNextPage : false;
        this.initialLoading = loading
      },
      error(err) {
        console.log(err);
      },
      subscribeToMore: {
        document: TRANSFERRED_PROJECT,
        // Variables passed to the subscription. Since we're using a function,
        // they are reactive
        variables () {
          return {
            user_id: this.user.id,
          }
        },
        // Mutate the previous result
        updateQuery: (previousResult, { subscriptionData } ) => {
          const pageInfo = previousResult.relayProjects.pageInfo
          pageInfo.hasMore = true
          pageInfo.hasNextPage = true
          pageInfo.total += 1

          console.log(pageInfo)

          const updateProjects = {
            relayProjects: {
              __typename: previousResult.relayProjects.__typename,
              edges: [...previousResult.relayProjects.edges],
              pageInfo
            }
          }

          return updateProjects;
        },
      }
    }
  },
  data() {
    return {
	    initialLoading: 0,
	    loadingMore: false,
      relayProjects: {},
      first: 10,
      after: '',
      hasMore: true,
      search: '',
	    endorseProjectDialog: false
    };
  },
  computed: {
    ...mapGetters('auth', ['user','isEncoder']),
    filteredProjects() {
      let filteredProjects = [];

      if (this.search.length >= 3) {
        const search = this.search.trim().toLowerCase();
        const projectsToFilter = this.relayProjects.edges;

        filteredProjects = projectsToFilter.filter(({ node }) => {
          const title = node.title.toLowerCase();

          return title.includes(search);
        });

        return filteredProjects;
      }

      filteredProjects = this.relayProjects ? this.relayProjects.edges: [];

      return filteredProjects;
    },
    finalizedProjects() {
      return []
    }
  },
  methods: {
    loadProjects() {},
    loadMore() {
      const after = this.relayProjects.pageInfo.endCursor;

      // console.log(this.first);
      // console.log(after);

			this.loadingMore = true;

      this.$apollo.queries.relayProjects.fetchMore({
        variables: {
          first: this.first,
          after: after
        },
	      notifyOnNetworkStatusChange: true,
	      updateQuery: (previousResult, { fetchMoreResult }) => {
          // console.log('previous result: ', previousResult);
          // console.log('fetch more result: ', fetchMoreResult);

          const newProjects = fetchMoreResult.relayProjects.edges;
          // console.log('projects to add: ', newProjects);
          const pageInfo = fetchMoreResult.relayProjects.pageInfo;
          // console.log('page info: ', pageInfo);
          const hasNextPage =
            fetchMoreResult.relayProjects.pageInfo.hasNextPage;
          const endCursor = fetchMoreResult.relayProjects.pageInfo.endCursor;

          this.hasMore = hasNextPage;
          this.after = endCursor;

          // console.log('__typename: ', previousResult.relayProjects.__typename);

          // console.log(
          //   'previous result to append to: ',
          //   ...previousResult.relayProjects.edges
          // );
          // console.log('incoming edges: ', ...newProjects);

					this.loadingMore = false;

          return {
            relayProjects: {
              __typename: previousResult.relayProjects.__typename,
              edges: [...previousResult.relayProjects.edges, ...newProjects],
              pageInfo
            }
          };
        },
        error(error) {
          console.log(`fetchMore error: ${error}`)
        }
      });
    }
  },
  created() {
    const page = this.$route.query.page
    
    console.dir(page)
  }
};
</script>
