import { apolloClient as client, apolloClient } from '../boot/apollo-boost';
import {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  UPLOAD_USER_AVATAR_MUTATION,
  UPDATE_PROFILE_MUTATION
} from 'src/graphql/mutations';

export default {
  /**
   * Registers user based on provided details
   *
   * @param { name, email, password, password_confirmation } payload
   * @returns void
   */
  register(payload) {
    return client.mutate({
      mutation: REGISTER_MUTATION,
      variables: payload
    });
  },
  /**
   * Logins user based on email and password provided
   *
   * @param { email, password } payload
   * @returns response
   */
  login(payload) {
    return client.mutate({
      mutation: LOGIN_MUTATION,
      variables: payload
    });
  },
  /**
   * Sends email to provided email
   *
   * @param { email } payload
   * @returns void
   */
  forgotPassword(payload) {
    return client.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: payload
    });
  },
  /**
   * Uploads image for user
   *
   * @param { image } payload
   * @returns response
   */
  uploadAvatar(payload) {
    return client.mutate({
      mutation: UPLOAD_USER_AVATAR_MUTATION,
      variables: payload
    });
  },
  /**
   * Updates current user profile
   *
   * @param { } payload
   * @returns response
   */
  updateProfile(payload) {
    return apolloClient.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: payload
    });
  }
};
