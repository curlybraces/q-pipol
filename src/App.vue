<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import gql from 'graphql-tag'
import {GET_CURRENT_USER} from './graphql/queries'
import { Notify } from 'quasar'

export default {
  name: 'App',
	apollo: {
  	$subscribe: {
  		assignedRole: {
  			query: gql`subscription assignRole($user_id: ID) {
					assignedRole(user_id: $user_id) {
						id
						role {
							id
							name
						}
					}
				}`,
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
			}
		}
	},
	computed: {
  	...mapState('settings',['dark']),
		...mapGetters('auth',['user']),
		user_id() {
  		return this.user.id
		}
	},
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  created() {
    this.getCurrentUser();
    this.$q.dark.set(this.dark)
  }
};
</script>
