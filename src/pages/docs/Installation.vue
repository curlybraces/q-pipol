<template>
	<q-page padding>
		<q-markdown :src="installation"/>
	</q-page>
</template>

<script>
	import installation from '../../markdowns/installation.md';

	export default {
		name: 'InstallationPage',
		data() {
			return {
				installation: installation
			}
		}
	}
</script>