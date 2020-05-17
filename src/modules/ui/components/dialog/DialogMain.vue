<template>
	<q-dialog
    v-model="show"
    full-height
    :position="$q.screen.xs ? void 0 : 'right'"
    persistent
    :maximized="$q.screen.xs"
    transition-show="jump-left"
    transition-hide="jump-right"
  >
  	<slot></slot>
  </q-dialog>
</template>

<script>
	export default {
		name: 'DialogMain',
		props: ['value'],
		computed: {
			show: {
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