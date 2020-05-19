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
  uploadUserAvatar({ image }) {
    return client.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: {
        image: image
      }
    })
    .then(handleResponse)
    .catch(handleError)
  },
  updateProfile({ name, operating_unit_id, position, contact_number }) {
    return client.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: {
        name: name, 
        operating_unit_id: operating_unit_id, 
        position: position, 
        contact_number: contact_number
      }
    })
    .then(handleResponse)
    .catch(handleError)
  }
}