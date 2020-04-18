export function SET_LOADING(state, payload) {
  state.loading = payload;
}

export function SET_ERROR(state, payload) {
  state.error = payload;
}

export function CLEAR_ERROR(state) {
  state.error = null;
}

export function SET_ERROR_MESSAGE(state, payload) {
  state.errorMessage = payload;
}

export function SET_USER(state, payload) {
  state.user = payload;
}

export function CLEAR_USER(state) {
  state.user = null;
}

export function CLEAR_TOKEN(state) {
  state.token = null;
}

export function SET_LOGGED_IN(state, payload) {
  state.loggedIn = payload;
}

export function SET_TOKEN(state, payload) {
  state.token = payload;
}

export function SET_EMAIL(state, payload) {
  state.email = payload;
}

export function SET_ID(state, payload) {
  state.id = payload;
}

export function SET_NAME(state, payload) {
  state.name = payload;
}

export function SET_IMAGE_URL(state, payload) {
  state.image_url = payload;
}

export function SET_OPERATING_UNIT(state, payload) {
  state.operating_unit = payload;
}

export function SET_OPERATING_UNIT_ID(state, payload) {
  state.operating_unit_id = payload;
}

export function SET_VERIFIED(state, payload) {
  state.verified = payload;
}

export function SET_CONTACT_NUMBER(state, payload) {
  state.contact_number = payload;
}

export function SET_POSITION(state, payload) {
  state.position = payload;
}

export function SET_ROLE(state, payload) {
  state.role = payload;
}

export function SET_USER_LOADED(state, payload) {
  state.userLoaded = payload;
}

export function SET_UNREAD_NOTIFICATIONS(state, payload) {
  state.unreadNotifications = payload;
}

export function SET_NOTIFICATIONS(state, payload) {
  state.notifications = payload;
}

export function SET_ME(state, payload) {
  state.me = payload;
}

export function SET_SHOW_VALIDATE_EMAIL_REMINDER(state, payload) {
  state.showValidateEmailReminder = payload;
}
