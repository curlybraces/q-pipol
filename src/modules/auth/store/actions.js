import { LocalStorage, Loading, Dialog } from 'quasar';
import { client, persistor } from 'boot/apollo';
import {
  CHECK_EMAIL_AVAILABILITY_QUERY,
  GET_CURRENT_USER
} from '@/graphql/queries';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  RESEND_EMAIL_VERIFICATION_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  VERIFY_EMAIL_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  UPLOAD_USER_AVATAR_MUTATION,
  UPDATE_PROFILE_MUTATION
} from '@/graphql/mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications';

export function register({ commit }, payload) {
  Loading.show()
  client
    .mutate({
      mutation: REGISTER_MUTATION,
      variables: payload
    })
    .then(res => {
      commit('SET_LOADING', false);
      console.log(res);
      Dialog.create({
        title: 'Registration Successful',
        message: 'You have successfully registered. Please check your email.',
        persistent: true,
        ok: true
      });
    })
    .catch(err => {
      commit('SET_LOADING', false);
      commit('SET_ERROR', err.message);
    })
    .finally(() => Loading.hide());
}

export function signinUser({ commit }, payload) {
  // clear token so it does not get sent to server
  LocalStorage.set('token', '');

  commit('CLEAR_ERROR');

  Loading.show()

  client
    .mutate({
      mutation: LOGIN_MUTATION,
      variables: payload
    })
    .then(({ data }) => {
      LocalStorage.set('token', data.login.access_token);

      commit('SET_LOADING', false);

      this.$router.go();

      // reset the store
      client.resetStore();
    })
    .catch(err => {
      console.error(err.message)
      LocalStorage.set('token', '');
    })
    .finally(() => Loading.hide());
}

export function getCurrentUser({ commit }) {
  commit('SET_LOADING', true);

  client
    .query({
      query: GET_CURRENT_USER
    })
    .then(({ data }) => {
      LocalStorage.set('user', data.getCurrentUser);

      commit('SET_USER', data.getCurrentUser);

      commit('SET_LOADING', false);
    })
    .catch(err => {
      console.error(err);
      commit('SET_LOADING', false);
    });
}

export function clearError({ commit }) {
  commit('CLEAR_ERROR')
}

export async function signoutUser({ commit }) {
  // see https://github.com/apollographql/apollo-cache-persist/issues/34#issuecomment-371177206 for info in purging cache

  // clear client store, this will not refetch queries unlike resetStore
  client.clearStore();

  persistor.purge();

  // remove token and user from localStorage
  LocalStorage.remove('token');
  LocalStorage.remove('user');

  // remove user data from store
  commit('CLEAR_USER');

  // clear the token
  commit('CLEAR_TOKEN');

  // redirect to login page
  this.$router.replace('/login');
}

export function hideValidateEmailReminder({ commit }, val) {
  LocalStorage.set('showValidateEmailReminder', val);
  commit('SET_SHOW_VALIDATE_EMAIL_REMINDER', val);
}

export function setImageUrl({ commit }, payload) {
  Loading.show()
  return client
    .mutate({
      mutation: UPDATE_IMAGE_URL_MUTATION,
      variables: {
        image_url: payload
      }
    })
    .then(() => {
      showSuccessNotification({
        message: 'Successfully updated avatar.',
        icon: 'check'
      });

      LocalStorage.set('image_url', payload);

      commit('SET_IMAGE_URL', payload);
    })
    .catch(err => console.log(err.message))
    .finally(() => Loading.hide());
}

export function updateProfile({ commit }, payload) {
  Loading.show()

  client
    .mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: payload,
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
    .then(() => {
      showSuccessNotification({
        message: 'Successfully updated profile.'
      });

      return;
      // this.$router.go();
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => Loading.hide());
}

export function forgotPassword({}, email) {
  Loading.show()
  return client
    .mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: {
        email: email
      }
    })
    .then(({ data }) => {
      if (data.forgotPassword.status === 'EMAIL_NOT_SENT') {
        showErrorNotification({
          message: data.forgotPassword.message
        })
      } else {
        showSuccessNotification({
          message: data.forgotPassword.message
        });
      }
    })
    .catch(err => {
      console.log(err.message);
    })
    .finally(() => Loading.hide());
}

export function resendEmailVerification({}, payload) {
  const email = payload;

  Loading.show()

  return client
    .mutate({
      mutation: RESEND_EMAIL_VERIFICATION_MUTATION,
      variables: {
        email: email
      }
    })
    .then(res => {
      showSuccessNotification({
        message: res.data.resendEmailVerification.message
      });
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => Loading.hide());;
}

export function verifyEmail({ commit, dispatch }, token) {
  return client
    .mutate({
      mutation: VERIFY_EMAIL_MUTATION,
      variables: {
        token: token
      }
    })
    .then(res => {
      console.log(res.data.verifyEmail);
      if (res.data.verifyEmail.access_token) {
        commit('SET_LOGGED_IN', true);

        LocalStorage.set('loggedIn', true);
        LocalStorage.set('token', res.data.verifyEmail.access_token);

        dispatch('populateUser');

        setTimeout(() => this.$router.push('/'), 1000);
      }
    })
    .catch(err => console.error(err.message));
}

export function updatePassword({ dispatch }, payload) {
  const { old_password, password, password_confirmation } = payload;

  Loading.show();

  client
    .mutate({
      mutation: UPDATE_PASSWORD_MUTATION,
      variables: {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
      }
    })
    .then(res => {
      console.log(res.data.updatePassword);
      if (res.data.updatePassword.status === 'PASSWORD_UPDATED') {
        dispatch('signoutUser');
      } else {
        return Promise.reject();
      }
    })
    .catch(err => {
      console.error(err.message)
    })
    .finally(() => Loading.hide());
}

export function checkEmailAvailability({}, payload) {
  return client
    .query({
      query: CHECK_EMAIL_AVAILABILITY_QUERY,
      variables: {
        email: payload
      }
    })
    .then(res => {
      if (res.data.checkEmailAvailability.status === 'AVAILABLE') {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => console.log(err.message))
    .finally(() => Loading.hide());
}

export function uploadUserAvatar({}, payload) {
  Loading.show()

	client
		.mutate({
			mutation: UPLOAD_USER_AVATAR_MUTATION,
			variables: payload,
			update: (store, { data: { uploadUserAvatar } }) => {
				const data = store.readQuery({
					query: GET_CURRENT_USER
				});
				
				data.getCurrentUser.image_url = uploadUserAvatar.image_url;
				
				store.writeQuery({
					query: GET_CURRENT_USER,
					data
				});
			}
		})
		.then(() => {
			showSuccessNotification({
				message: 'Successfully changed user image.'
			});
		})
		.catch(err => {
			console.error(err.message);
		})
    .finally(() => Loading.hide());
}
