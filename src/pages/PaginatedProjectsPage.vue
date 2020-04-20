<template>
  <q-page padding>
    <page-title
      :title="`Projects (Total: ${relayProjects.edges.length})`"
    ></page-title>

    <div class="row justify-center">
      <q-input
				ref="searchBox"
        class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
        outlined
        placeholder="Search titles"
        v-model="search"
        :debounce="500"
        :rules="[val => val >= 3 || 'Please input at least 3 characters.']"
        lazy-rules
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
    </div>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
      <q-list separator>
        <q-item-label header v-if="this.search.length >= 3"
				>Found <b>{{ filteredProjects.length }}</b> titles that contains
          <span class="text-negative">{{ search }}...</span></q-item-label
        >
        <template v-for="{ node } in filteredProjects">
          <project-item :project="node" :key="node.id"></project-item>
        </template>
      </q-list>
    </template>

    <div class="row q-pa-sm">
      <q-btn
        @click="loadMore"
        v-if="!$apollo.loading && hasMore"
        label="Load More"
        color="primary"
      ></q-btn>
    </div>

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
import { mapGetters } from 'vuex';
import PageTitle from '../components/PageTitle';
import ProjectItem from '../components/Projects/ProjectItem';
import { RELAY_PROJECTS_QUERY } from '../graphql/queries';
import FindListener from '../mixins/FindListener';

export default {
  name: 'ProjectsPage',
  components: { PageTitle, ProjectItem },
	mixins: [FindListener],
  apollo: {
    relayProjects: {
      query: RELAY_PROJECTS_QUERY,
      variables: {
        first: 10,
        after: ''
      },
      result({ data }) {
        this.hasMore = data.relayProjects.pageInfo.hasNextPage;
      },
      error(err) {
        console.log(err);
      }
    }
  },
  data() {
    return {
      relayProjects: {},
      first: 10,
      after: '',
      hasMore: true,
      search: ''
    };
  },
  computed: {
	  ...mapGetters('auth',['isEncoder']),
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

      filteredProjects = this.relayProjects.edges;

      return filteredProjects;
    }
  },
  methods: {
    loadProjects() {},
    loadMore() {
      const after = this.relayProjects.pageInfo.endCursor;

      console.log(this.first);
      console.log(after);

      this.$apollo.queries.relayProjects.fetchMore({
        variables: {
          first: this.first,
          after: after
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log('previous result: ', previousResult);
          console.log('fetch more result: ', fetchMoreResult);

          const newProjects = fetchMoreResult.relayProjects.edges;
          console.log('projects to add: ', newProjects);
          const pageInfo = fetchMoreResult.relayProjects.pageInfo;
          console.log('page info: ', pageInfo);
          const hasNextPage =
            fetchMoreResult.relayProjects.pageInfo.hasNextPage;
          const endCursor = fetchMoreResult.relayProjects.pageInfo.endCursor;

          this.hasMore = hasNextPage;
          this.after = endCursor;

          console.log('__typename: ', previousResult.relayProjects.__typename);

          console.log(
            'previous result to append to: ',
            ...previousResult.relayProjects.edges
          );
          console.log('incoming edges: ', ...newProjects);

          return {
            relayProjects: {
              __typename: previousResult.relayProjects.__typename,
              edges: [...previousResult.relayProjects.edges, ...newProjects],
              pageInfo
            }
          };
        }
      });
    }
  }
};
</script>
