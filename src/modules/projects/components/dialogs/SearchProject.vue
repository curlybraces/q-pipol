<template>
	<dialog-card>
		<dialog-header title="Search Projects" @close="$emit('close')"></dialog-header>

		
		<div class="q-pa-sm q-gutter-sm">
			<q-input dense type="text" v-model="search" outlined @keyup.enter="handleSearchProjects">
				<template v-slot:append>
					<q-icon name="search"></q-icon>
				</template>
			</q-input>
			
			<q-btn label="search" color="primary" @click="handleSearchProjects"></q-btn>
		</div>

		<div>
			<template v-if="loading">
				<q-inner-loading :showing="loading">
					<q-spinner-tail size="50px" color="primary"></q-spinner-tail>
					Searching...
				</q-inner-loading>
			</template>

			<template v-else>
				{{ error }}
				<q-list>
					<template v-if="!searchProjects.length">
						<q-item-label header>No project found.</q-item-label>
					</template>
					<template v-else>
					<q-item-label header>Search Results (maximum of 10 only)</q-item-label>
						<q-item v-for="({ id, title}, index) in searchProjects" :key="id" clickable :to="`/projects/${id}`">
							<q-item-section>
								<q-item-label>{{ index + 1 + '.' }} <span v-html="$options.filters.searchHighlight(title, search)"></span></q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-list>
			</template>	
		</div>
		
	</dialog-card>
</template>

<script>
	import DialogHeader from '@/modules/ui/components/Dialog/DialogHeader'
	import DialogCard from '@/modules/ui/components/Dialog/DialogCard'
	import gql from 'graphql-tag'

	export default {
		components: { DialogHeader, DialogCard },
		name: 'SearchProject',
		props: ['value'],
		data() {
			return {
				search: '',
				loading: false,
				searchProjects: {},
				error: ''
			}
		},
		methods: {
			handleSearchProjects() {
				const search = this.search ? this.search.toLowerCase(): ''
				if (search) {
					this.loading = true
					this.$apollo.query({
						query: gql`
							query searchProjects($search: String!) {
								searchProjects(search: $search) {
									id
									title
								}
							}
						`,
						variables: {
							search: search
						}
					})
					.then(({ data }) => {
						this.searchProjects = data.searchProjects
					})
					.catch(err => {
						this.error = err.message
					})
					.finally(() => this.loading = false)
				}
			}
		},
		filters: {
			searchHighlight(value, search) {
	      if (search) {
	        let searchRegExp = new RegExp(search, 'ig');
	        return value.replace(searchRegExp, match => {
	          return "<span class='bg-yellow-6'>" + match + '</span>';
	        });
	      }
	      return value;
	    }
		}
	}
</script>