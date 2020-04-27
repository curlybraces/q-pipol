import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../../graphql/mutations';
import { LocalStorage } from 'quasar';
import { apolloClient } from '../../../boot/apollo-boost';
import { GET_CURRENT_USER } from '../../../graphql/queries';

export default {
  login(payload) {
    return apolloClient
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: payload
      })
      .then(({ data }) => {
        LocalStorage.set('token', data.login.access_token);

        // reset the store
        apolloClient.resetStore();

        return data;
      })
      .catch(err => {
        console.error(err);

        LocalStorage.set('token', '');
      });
  },
  register(payload) {
    return apolloClient
      .mutate({
        mutation: REGISTER_MUTATION,
        variables: payload
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  getCurrentUser() {
    return apolloClient
      .query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        LocalStorage.set('user', data.getCurrentUser);

        return data;
      })
      .catch(err => {
        console.error(err);
      });
  },
  logout() {}
};
