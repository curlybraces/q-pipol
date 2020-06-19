import { client } from 'boot/apollo'
import {
	FETCH_VERSIONS,
	FETCH_VERSION
} from '@/graphql/queries'
import { handleResponse, handleError } from '@/utils'

export const versionService = {
	index() {
		return client
			.query({
				query: FETCH_VERSIONS
			})
			.then(handleResponse)
			.catch(handleError)
	},
	get(id) {
		return client
			.query({
				query: FETCH_VERSION,
				variables: {
					id: id
				}
			})
			.then(handleResponse)
			.catch(handleError)
	},
	create(payload) {
		console.log(payload)
	},
	update(payload) {
		console.log(payload)
	},
	delete(id) {
		console.log(id)
	}
}