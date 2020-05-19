<template>
	<q-inner-loading :showing="loading">
		<q-spinner-tail size="50px" color="primary"></q-spinner-tail>
	</q-inner-loading>
</template>

<script>
	export default {
		name: 'InnerLoading',
		props: ['loading']
	}
</script>