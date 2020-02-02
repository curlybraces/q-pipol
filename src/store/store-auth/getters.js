export function isAdmin(state) {
  return state.roles.includes("admin");
}
