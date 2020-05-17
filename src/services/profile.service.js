import { client } from '@/boot/apollo'
import { handleResponse, handleError } from '@/utils'

import { GET_CURRENT_USER } from '@/graphql/queries'
import {
  UPLOAD_USER_AVATAR_MUTATION,
  UPDATE_PROFILE_MUTATION
} from '@/graphql/mutations'

export const profileService = {
  getCurrentUser() {
    return client
      .query({
        query: GET_CURRENT_USER
      })
      .then(handleResponse)
      .catch(handleError)
  },
  uploadUserAvatar(payload) {
    return client.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  },
  updateProfile(payload) {
    return client.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  }
}