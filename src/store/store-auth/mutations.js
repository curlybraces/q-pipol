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

export function SET_IMAGE(state, value) {
  state.image = value;
}

export function SET_OPERATING_UNIT(state, value) {
  state.operating_unit = value;
}

export function SET_UNIT(state, value) {
  state.unit = value;
}

export function SET_POSITION(state, value) {
  state.position = value;
}

export function SET_ROLES(state, value) {
  value.forEach(val => state.roles.push(val.name));
}
