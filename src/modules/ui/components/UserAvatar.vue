<template>
	<q-avatar color="secondary">
		<img :src="getCurrentUser.image_url" />
	</q-avatar>
</template>

<script>
	import { GET_CURRENT_USER } from '../../../graphql/queries'

	export default {
		name: 'UserAvatar',
		apollo: {
			getCurrentUser: {
				query: GET_CURRENT_USER
			}
		},
		data() {
			return {
				getCurrentUser: {}
			}
		}
	}
</script>