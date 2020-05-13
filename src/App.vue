<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { GET_CURRENT_USER } from './graphql/queries'
import { ASSIGNED_ROLE, ASSIGNED_OPERATING_UNIT_TO_REVIEW } from '@/graphql/subscriptions'
import { Notify, LocalStorage } from 'quasar'
import { showSuccessNotification } from '@/functions/function-show-notifications'

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
  	this.$store.dispatch('auth/getCurrentUser');
    this.$q.dark.set(this.dark)
  }
};
</script>
