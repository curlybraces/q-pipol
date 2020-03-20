export function SET_LOGGED_IN(state, value) {
  state.loggedIn = value;
}

export function SET_TOKEN(state, value) {
  state.token = value;
}

export function SET_EMAIL(state, value) {
  state.email = value;
}

export function SET_NAME(state, value) {
  state.name = value;
}

export function SET_IMAGE_URL(state, value) {
  state.image_url = value;
}

export function SET_OPERATING_UNIT(state, value) {
  state.operating_unit = value;
}

export function SET_CONTACT_NUMBER(state, value) {
  state.contact_number = value;
}

export function SET_POSITION(state, value) {
  state.position = value;
}

export function SET_ROLE(state, value) {
  state.role = value;
}

export function SET_USER_LOADED(state, value) {
  state.userLoaded = value;
}

export function SET_UNREAD_NOTIFICATIONS(state, value) {
  state.unreadNotifications = value;
}

export function SET_NOTIFICATIONS(state, value) {
  state.notifications = value;
}

export function SET_ME(state, value) {
  state.me = value;
}

export function CLEAR_USER(state) {
  state.email = null;
  state.name = null;
  state.image_url = null;
  state.operating_unit = null;
  state.contact_number = null;
  state.position = null;
  state.role = null;
  state.me = {};
}
