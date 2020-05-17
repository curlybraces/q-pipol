import { client } from '@/boot/apollo'
import { handleResponse, handleError } from '@/utils'

import { ALL_USERS } from '@/graphql/queries';
import {
  ASSIGN_ROLE_MUTATION,
  ASSIGN_OPERATING_UNIT_TO_REVIEW_MUTATION
} from '@/graphql/mutations';

export const userService = {
  index() {
    // get all users
    return client.query({
        query: ALL_USERS
      })
      .then(handleResponse)
      .catch(handleError)
  },
  store() {
    // create aa user
    // not applicable since user should register
  },
  show(payload) {
    // retrieve single user, payload must be id
    // again, non-existent since users are fetch in index
    // might consider thi though
  },
  update() {
    // update user
  },
  destroy() {
    // delete user
  },
  assignRole(payload) {
    return client.mutate({
        mutations: ASSIGN_ROLE_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError)
  },
  assignOperatingUnitToReview(payload) {
    return client.mutate({
        mutation: ASSIGN_OPERATING_UNIT_TO_REVIEW_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError)
  }
}