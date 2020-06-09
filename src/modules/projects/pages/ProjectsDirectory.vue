<template>
	<page-container>
		<page-title title="Projects Directory"></page-title>
		<inner-loading v-if="$apollo.loading"></inner-loading>
		<template v-else>
			<div class="row q-pa-sm q-col-gutter-sm">
				<div class="col-3" v-for="p in processing_statuses" :key="p.id">
					<q-card square bordered flat @click="goTo(p.name)" class="cursor-pointer">
						<q-item>
							<q-item-section>
								<q-item-label class="text-uppercase">
									{{p.name}}
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-avatar class="bg-dark text-white">
									{{p.count_projects}}
								</q-avatar>
							</q-item-section>
						</q-item>
					</q-card>
				</div>
			</div>
		</template>	
	</page-container>
</template>

<script>
import gql from 'graphql-tag';
import PageContainer from '@/ui/page/PageContainer';
import PageTitle from '@/ui/page/PageTitle';
import InnerLoading from '@/ui/components/InnerLoading';

export default {
	components: {PageContainer, PageTitle, InnerLoading},
	name: 'ProjectsDirectory',
	apollo: {
		processing_statuses: {
			query: gql`
				query processing_statuses {
					processing_statuses {
						id
						name
						count_projects
					}
				}
			`
		}
	},
	data() {
		return {
			processing_statuses: []
		}
	},
	methods: {
		goTo(link) {
			this.$router.push(`/projects/${link}`)
		}
	}
}
</script>