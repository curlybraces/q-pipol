<template>
	<q-list bordered>
		<q-item class="bg-accent text-white">
			<q-item-section>
				<q-item-label>
					Review Project Form
				</q-item-label>
			</q-item-section>
		</q-item>

		<q-separator/>

		<q-item-label header>Responsiveness</q-item-label>

		<q-expansion-item icon="playlist_add_check" label="PDP Chapters" expand-separator :caption="`${selected_pdp_chapters.length} selected`">
			<q-list>
				<q-item tag="label" v-for="({ id, name }) in pdp_chapters" :key="id">
					<q-item-section avatar>
						<q-checkbox v-model="selected_pdp_chapters" :val="id"></q-checkbox>
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

		<q-expansion-item icon="playlist_add_check" label="PDP RM Indicators" expand-separator :caption="`${selected_pdp_indicators.length} selected`">
			<template v-if="filteredIndicators.length">
				<q-tree 
					:nodes="filteredIndicators" 
					nodeKey="value" 
					tick-strategy="leaf" 
					:ticked.sync="selected_pdp_indicators" 
					default-expand-all
				/>
			</template>
			<q-item v-else>
				<q-item-section>
					<q-item-label>Select PDP Chapters first.</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

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

		<q-expansion-item icon="playlist_add_check" label="Implementation Bases" expand-separator :caption="`${selected_bases.length} selected`">
			<q-list>
				<q-item tag="label" v-for="({ id, name }) in bases" :key="id">
					<q-item-section avatar>
						<q-checkbox v-model="selected_bases" :val="id"></q-checkbox>
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

		<q-expansion-item icon="playlist_add_check" label="New Thinking" expand-separator :caption="`${selected_paradigms.length} selected`">
			<q-list>
				<q-item tag="label" v-for="({ id, name }) in paradigms" :key="id">
					<q-item-section avatar>
						<q-checkbox v-model="selected_paradigms" :val="id"></q-checkbox>
					</q-item-section>
					<q-item-section avatar>
						<q-avatar>
							<q-img :src="`statics/nt/${id}.png`"></q-img>
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

		<q-expansion-item label="Readiness" class="text-grey-7">

			<q-item tag="label">
				<q-item-section avatar>
					<q-checkbox v-model="within_period"></q-checkbox>
				</q-item-section>
				<q-item-section>
					<q-item-label>To be implemented within 2017-2022</q-item-label>
				</q-item-section>
			</q-item>

			<q-item>
				<single-select label="Level of Readiness" v-model="readiness_level_id" :options="readinesses"></single-select>
			</q-item>

		</q-expansion-item>

		<q-expansion-item label="Typology" class="text-grey-7">
			<q-item>
				<typology v-model="typology_id"></typology>
			</q-item>
			<q-item tag="label">
				<q-item-section avatar>
					<q-checkbox v-model="cip"></q-checkbox>
				</q-item-section>
				<q-item-section>
					Core Investment Program/Project
				</q-item-section>
			</q-item>
			<q-item v-if="cip">
				<single-select label="CIP Type" v-model="cip_type_id" :options="cip_types"></single-select>
			</q-item>
			<q-item tag="label">
				<q-item-section avatar>
					<q-checkbox v-model="trip"></q-checkbox>
				</q-item-section>
				<q-item-section>
					Three-Year Rolling Infrastructure Program
				</q-item-section>
			</q-item>
		</q-expansion-item>
	</q-list>
</template>

<script>
import gql from 'graphql-tag'
import { openURL } from 'quasar'
import Typology from './dropdowns/Typology'
import SingleSelect from '@/modules/ui/form-inputs/SingleSelect'
import { PDP_INDICATORS } from '@/constants/pdp' 

export default {
	components: { SingleSelect, Typology },
	name: 'ReviewForm',
	props: ['id'],
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
		},
		paradigms: {
			query: gql`{
				paradigms {
					id
					name
				}
			}`
		},
		bases: {
			query: gql`{
				bases {
					id
					name
				}
			}`
		},
		readinesses: {
			query: gql`{
				readinesses {
					id
					name
				}
			}`
		},
		cip_types: {
			query: gql`{
				cip_types {
					id
					name
				}
			}`
		},
		pdp_chapters: {
			query: gql`{
				pdp_chapters {
					id
					name
				}
			}`
		}
	},
	data() {
		return {
			bases: [],
			sustainable_development_goals: [],
			ten_point_agenda: [],
			paradigms: [],
			readinesses: [],
			cip_types: [],
			pdp_chapters: [],
			selected_pdp_chapters: [],
			pdp_indicators: PDP_INDICATORS,
			selected_sdgs: [],
			selected_ten_point_agenda: [],
			selected_paradigms: [],
			selected_bases: [],
			typology_id: null,
			within_period: false,
			readiness_level_id: null,
			cip: false,
			trip: false,
			cip_type_id: null,
			selected_pdp_indicators: []
		}
	},
	computed: {
		filteredIndicators() {
			let filteredIndicators = []

			const pdpIndicators = this.pdp_indicators
			const selectedPdpChapters = this.selected_pdp_chapters

			if (!selectedPdpChapters.length) {
				filteredIndicators = []
			} else {
				filteredIndicators = pdpIndicators.filter(chapter => {
					return selectedPdpChapters.includes(chapter.value.toString())
				})
			}

			return filteredIndicators
		}
	}
}
</script>
