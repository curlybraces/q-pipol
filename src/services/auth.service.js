import { client } from '@/boot/apollo'
import { handleResponse } from '@/helpers/handle-response'
import { handleError } from '@/helpers/handle-error'

import { 
  REGISTER_MUTATION, 
  LOGIN_MUTATION, 
  LOGOUT_MUTATION, 
  UPDATE_PASSWORD_MUTATION, 
  RESEND_EMAIL_VERIFICATION_MUTATION,
  VERIFY_EMAIL_MUTATION,
  FORGOT_PASSWORD_MUTATION } from '@/graphql/mutations'

export const authService = {
  register(payload) {
    return client.query({
      mutation: REGISTER_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  },
  login(payload) {
    return client.mutate({
      query: LOGIN_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  },
  logout() {
    return client.mutate({
      mutation: LOGOUT_MUTATION,
      variables: {}
    })
    .then(handleResponse)
    .catch(handleError)
  },
  updatePassword(payload) {
    return client.mutate({
      mutation: UPDATE_PASSWORD_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  },
  forgotPassword(payload) {
    return client.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  },
  resendEmailVerification(payload) {
    return client.mutate({
      mutation: RESEND_EMAIL_VERIFICATION_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  },
  verifyEmail(payload) {
    return client.mutate({
      mutation: VERIFY_EMAIL_MUTATION,
      variables: payload
    })
    .then(handleResponse)
    .catch(handleError)
  }
}