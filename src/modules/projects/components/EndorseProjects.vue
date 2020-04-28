<template>
	<q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
		<q-toolbar class="bg-info text-white">
			<q-toolbar-title class="absolute-center text-subtitle1"
			>Endorse Projects</q-toolbar-title
			>
			<q-space />
			<q-btn
					flat
					round
					dense
					icon="close"
					@click="$emit('close')"
			></q-btn>
		</q-toolbar>
		<q-separator></q-separator>
		<div class="row q-pa-sm text-center text-negative" v-if="error">
			<q-banner inline-actions class="text-white bg-red">
				{{ error }}
				<template v-slot:action>
					<q-btn flat round dense icon="close" color="white" @click="clearError" />
				</template>
			</q-banner>
		</div>
		<q-form @submit.prevent="handleSubmit" class="column q-gutter-y-sm q-pa-sm">
			<q-list separator bordered>
				<q-item v-for="({ node }) in projects" :key="node.id" tag="label" v-ripple>
					<q-item-section avatar>
						<q-checkbox v-model="selectedProjects" :val="node.id" color="secondary" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ node.title }}</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
			<q-file v-model="file" label="Endorsement Letter" outlined>
				<template v-slot:append>
					<q-icon name="attachment"/>
				</template>
			</q-file>
			<q-btn class="full-width" label="Submit" color="primary" type="submit" :loading="loading"></q-btn>
		</q-form>
	</q-card>
</template>

<script>
	import {ENDORSE_PROJECTS_MUTATION} from '../../../graphql/mutations'
	import {showSuccessNotification} from '../../../functions/function-show-notifications'

	export default {
		name: 'EndorseProjects',
		props: {
			projects: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				selectedProjects: [],
				file: null,
				error: null,
				loading: false
			}
		},
		methods: {
			handleSubmit() {
				if (!this.selectedProjects.length || !this.file) {
					this.error = 'Please select at least one project and attach endorsement letter'
					return
				}
				this.loading = true;
				this.$apollo.mutate({
					mutation: ENDORSE_PROJECTS_MUTATION,
					variables: {
						projects: this.selectedProjects,
						file: this.file
					}
				})
					.then(({ data }) => {
						const numProjects = data.endorseProjects.projects.length
						showSuccessNotification({
							message: `Successfully endorsed ${numProjects} projects.`
						})
						this.$emit('close')
					})
					.catch(err => {
						this.error = err.message
					})
					.finally(() => this.loading = false)
			},
			clearError() {
				this.error = null
			}
		}
	}
</script>
