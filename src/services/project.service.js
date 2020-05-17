import { client } from '@/boot/apollo'
import { handleResponse, handleError } from '@/utils'

import { SEARCH_PROJECTS } from '@/graphql/queries'

export const projectService = {
	index() {
		// get all
	},
	show(payload) {
		// get based on id
	},
	search(payload) {
		return client.query({
			query: SEARCH_PROJECTS,
			variables: payload
		})
		.then(handleResponse)
		.catch(handleError)
	}
}