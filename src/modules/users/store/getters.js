export function users(state, getters) {
  const users = getters.usersFiltered;
  if (users) {
    return users;
  }
  return state.users;
}

export function usersFiltered(state) {
  const usersFiltered = {};

  if (state.search) {
    const searchTerm = state.search.toLowerCase();

    Object.keys(state.users).forEach(key => {
      const user = state.users[key];
      const userNameLowerCase = user.name.toLowerCase();
      const roleNameLowerCase = user.role.name.toLowerCase();
      const operatingUnitNameLowerCase = user.operating_unit
        ? user.operating_unit.name.toLowerCase()
        : '';

      if (
        userNameLowerCase.includes(searchTerm) ||
        roleNameLowerCase.includes(searchTerm) ||
        operatingUnitNameLowerCase.includes(searchTerm)
      ) {
        usersFiltered[key] = user;
      }
    });
    return usersFiltered;
  }

  return state.users;
}
