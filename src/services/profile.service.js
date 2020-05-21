import { client } from '@/boot/apollo'
import { handleResponse, handleError } from '@/utils'

import { GET_CURRENT_USER } from '@/graphql/queries'
import {
  UPLOAD_USER_AVATAR_MUTATION,
  UPDATE_PROFILE_MUTATION,
  CHOOSE_AVATAR_MUTATION
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
    return client
      .mutate({
        mutation: UPDATE_PROFILE_MUTATION,
        variables: {
          name: name, 
          operating_unit_id: operating_unit_id, 
          position: position, 
          contact_number: contact_number
        },
        update: (store, {data: { updateUser } } ) => {
          const data = store.readQuery({
            query: GET_CURRENT_USER
          })

          data.getCurrentUser.name = updateUser.name
          data.getCurrentUser.position = updateUser.position
          data.getCurrentUser.contact_number = updateUser.contact_number
          data.getCurrentUser.operating_unit = updateUser.operating_unit

          console.log(data)

          store.writeQuery({
            query: GET_CURRENT_USER,
            data
          })
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  chooseAvatar({ image_id }) {
    return client.mutate({
      mutation: CHOOSE_AVATAR_MUTATION,
      variables: {
        image_id: image_id
      }
    })
    .then(handleResponse)
    .catch(handleError)
  }
}