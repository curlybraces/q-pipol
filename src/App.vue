<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { GET_CURRENT_USER } from './graphql/queries'
import { ASSIGNED_ROLE, ASSIGNED_OPERATING_UNIT_TO_REVIEW, TRANSFERRED_PROJECT } from '@/graphql/subscriptions'
import { Notify, LocalStorage } from 'quasar'
import { showSuccessNotification } from '@/functions/function-show-notifications'
import gql from 'graphql-tag'

import { profileService } from './services/profile.service'

export default {
  name: 'App',
	apollo: {
  	$subscribe: {
  		assignedRole: {
  			query: ASSIGNED_ROLE,
				variables() {
					return {
						user_id: this.user_id
					}
				},
				updateQuery: (store, { subscriptionData }) => {
  				const data = store.readQuery({
						query: GET_CURRENT_USER
					})

					data.getCurrentUser.role = subscriptionData.role

					store.writeQuery({
						query: GET_CURRENT_USER,
						data
					})

				},
				result({ data }) {
  				console.log(data.assignedRole)
					Notify.create({
						message: `You have been assigned the role of ${data.assignedRole.role.name}.`,
						position: 'bottom-right',
						color: 'primary'
					})
				}
			},
			assignedOperatingUnitToReview: {
				query: ASSIGNED_OPERATING_UNIT_TO_REVIEW,
				variables() {
					return {
						user_id: this.user_id
					}
				},
				result({ data }) {
					const offices = data.assignedOperatingUnitToReview.reviews.map(ou => {
						return ou.acronym
					}).join(', ')
					showSuccessNotification({
						message: `You have been assigned to review ${offices}.`
					})
				}
			},
			transferredProject: {
				query: TRANSFERRED_PROJECT,
				variables() {
					return {
						user_id: this.user_id
					}
				},
				result({ data }) {
					console.log(data)
					showSuccessNotification({
						message: 'A new project was transferred to you',
						actions: [ 
							{ label: 'VIEW', color: 'white', handler: () => this.$router.push(`/projects/${data.transferredProject.id}`) },
						]
					})
				}
			}
		}
	},
	computed: {
  	...mapState('settings',['dark']),
		...mapGetters('auth',['user']),
		user_id() {
  		return this.user ? this.user.id: null
		}
	},
  created() {
  	const token = LocalStorage.getItem('token')
  	if (token && (token !== null || token !== '')) {
  		this.$store.dispatch('auth/getCurrentUser');
  	}
    this.$q.dark.set(this.dark)
    // testing if service works
    profileService.getCurrentUser().then(data => console.log(`profileService response data: ${JSON.stringify(data)}`))
  }
};
</script>
