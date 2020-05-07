<template>
	<td class="text-right">
		{{ value | formatMoney }}
	</td>
</template>

<script>
	export default {
		name: 'TableData',
		props: ['value'],
		filters: {
			formatMoney(val) {
				if (!val) {
					return 0.00
				}
				return val.toLocaleString('en-GB', { maximumFractionDigits: 2 })
			}
		}
	}
</script>
