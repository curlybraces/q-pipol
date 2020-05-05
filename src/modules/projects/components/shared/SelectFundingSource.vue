<template>
	<single-select label="Main Funding Source" :options="funding_sources" v-model="operating_unit_id" :rules="rules"></single-select>
</template>

<script>
	import { FETCH_OPERATING_UNITS } from 'src/graphql/queries'
	import SingleSelect from '../../../ui/form-inputs/SingleSelect'

	export default {
		components: {
			SingleSelect
		},
		name: 'SelectOu',
		apollo: {
			operating_units: {
				query: FETCH_OPERATING_UNITS
			}
		},
		props: [
			'value',
			'rules'
		],
		data() {
			return {
				operating_units: []
			}
		},
		computed: {
			operating_unit_id: {
				get() {
					return this.$props.value
				},
				set(val) {
					this.$emit('input',val)
				}
			}
		}
	}
</script>