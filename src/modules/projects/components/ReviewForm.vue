<template>
	<div class="column">
		<q-item class="bg-accent text-white">
			<q-item-section>
				<q-item-label>
					Review Project Form
				</q-item-label>
			</q-item-section>
			<q-item-section side>
				<div class="row">
					<q-btn flat round dense icon="open_in_new" @click="openURL(fullPath)" target="_blank" role="a"></q-btn>
					<q-btn flat round dense icon="close" @click="$emit('close')" />
				</div>
			</q-item-section>
		</q-item>

		<q-expansion-item icon="playlist_add_check" label="Sustainable Developments" expand-separator :caption="`${selected_sdgs.length} selected`">
			<q-list>
				<q-item tag="label" v-for="({ id, name }) in sustainable_development_goals" :key="id">
					<q-item-section avatar>
						<q-checkbox v-model="selected_sdgs" :val="id"></q-checkbox>
					</q-item-section>
					<q-item-section avatar>
						<q-avatar>
							<q-img :src="`statics/sdg/${id}.jpg`"></q-img>
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label>
							{{ name }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-expansion-item>

		<q-expansion-item icon="playlist_add_check" label="Ten Point Agenda" expand-separator :caption="`${selected_ten_point_agenda.length} selected`">
			<q-list>
				<q-item tag="label" v-for="({ id, name }) in ten_point_agenda" :key="id">
					<q-item-section avatar>
						<q-checkbox v-model="selected_ten_point_agenda" :val="id"></q-checkbox>
					</q-item-section>
					<q-item-section avatar>
						<q-avatar>
							<q-img :src="`statics/tpa/${id}.png`"></q-img>
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label :lines="2">
							{{ name }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-expansion-item>
	</div>
</template>

<script>
import gql from 'graphql-tag'
import { openURL } from 'quasar'

export default {
	name: 'ReviewForm',
	props: ['fullPath'],
	apollo: {
		sustainable_development_goals: {
			query: gql`{
				sustainable_development_goals {
					id
					name
				}
			}`
		},
		ten_point_agenda: {
			query: gql`{
				ten_point_agenda {
					id
					name
				}
			}`
		}
	},
	data() {
		return {
			sustainable_development_goals: [],
			ten_point_agenda: [],
			selected_sdgs: [],
			selected_ten_point_agenda: []
		}
	},
	methods: {
		openURL
	}
}
</script>
