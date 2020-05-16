<template>
	<q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
		<slot></slot>
	</q-card>
</template>

<script>
	export default {
		name: 'DialogCard'
	}
</script>