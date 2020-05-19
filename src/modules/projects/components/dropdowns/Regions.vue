<template>
	<list-option-group
		label="Regions"
		v-model="model"
		:options="regions"
		:recode="true"
	/>
</template>

<script>
	import ListOptionGroup from '@/ui/form-inputs/ListOptionGroup'
	import { FETCH_REGIONS } from '@/graphql/queries'

	export default {
		components: { ListOptionGroup },
		name: 'Regions',
		props: ['value'],
		computed: {
			model: {
				get() {
					return this.$props.value
				},
				set(val) {
					this.$emit('input', val)
				}
			}
		},
		apollo: {
			regions: {
				query: FETCH_REGIONS
			}
		}
	}
</script>
