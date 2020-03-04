export function SET_USERS(state, value) {
  state.users = value;
}

export function UPDATE_USER(state, payload) {
  console.log(payload);
  const index = state.users.findIndex(user => user.id == payload.id);
  state.users[index].active = payload.active;
}
