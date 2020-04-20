<template>
	<q-page padding>
		<page-title :title="`Projects (${relayProjects.edges.length})`"></page-title>

		<template v-if="$apollo.loading">
			<q-inner-loading :showing="$apollo.loading">
				<q-spinner-tail size="50px" color="primary"></q-spinner-tail>
			</q-inner-loading>
		</template>

		<template v-else>
			<q-list separator>
				<template v-for="({ node }) in relayProjects.edges">
					<project-item :project="node" :key="node.id"></project-item>
				</template>
			</q-list>
		</template>

		<div class="row q-pa-sm">
			<q-btn @click="loadMore" v-if="!$apollo.loading && hasMore" label="Load More" color="primary"></q-btn>
		</div>
	</q-page>
</template>

<script>
	import PageTitle from '../components/PageTitle';
	import ProjectItem from '../components/Projects/ProjectItem';
	import {RELAY_PROJECTS_QUERY} from '../graphql/queries';

	export default {
		name: 'ProjectsPage',
		components: { PageTitle, ProjectItem },
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
					console.log(err)
				}
			}
		},
		data() {
			return {
				relayProjects: {},
				first: 10,
				after: '',
				hasMore: true
			}
		},
		methods: {
			loadProjects() {

			},
			loadMore() {
				const after = this.relayProjects.pageInfo.endCursor;

				console.log(this.first)
				console.log(after)

				this.$apollo.queries.relayProjects.fetchMore({
					variables: {
						first: this.first,
						after: after
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						console.log('previous result: ', previousResult)
						console.log('fetch more result: ', fetchMoreResult)

						const newProjects = fetchMoreResult.relayProjects.edges;
						console.log('projects to add: ', newProjects);
						const pageInfo = fetchMoreResult.relayProjects.pageInfo;
						console.log('page info: ', pageInfo);
						const hasNextPage = fetchMoreResult.relayProjects.pageInfo.hasNextPage;
						const endCursor = fetchMoreResult.relayProjects.pageInfo.endCursor;

						this.hasMore = hasNextPage;
						this.after = endCursor;

						console.log('__typename: ', previousResult.relayProjects.__typename)

						console.log('previous result to append to: ', ...previousResult.relayProjects.edges);
						console.log('incoming edges: ', ...newProjects);

						return {
							relayProjects: {
								__typename: previousResult.relayProjects.__typename,
								edges: [...previousResult.relayProjects.edges, ...newProjects],
								pageInfo
							}
						}
					}
				})
			}
		}
	}
</script>