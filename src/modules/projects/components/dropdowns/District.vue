<template>
	<single-select
			v-model="model"
			label="District"
			:options="districts"
	/>
</template>

<script>
	import SingleSelect from '@/ui/form-inputs/SingleSelect'
	import { FETCH_DISTRICTS} from '@/graphql/queries'

	export default {
		components: { SingleSelect },
		name: 'District',
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
			districts: {
				query: FETCH_DISTRICTS
			}
		},
		data() {
			return {
				districts: []
			}
		}
	}
</script>
