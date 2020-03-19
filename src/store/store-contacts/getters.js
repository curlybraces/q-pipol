export const contactsFiltered = (state, getters) => {
  // initiate empty object for filtered projects
  let contactsSorted = getters.contactsSorted,
    contactsFiltered = {};

  if (state.search) {
    const searchWord = state.search.toLowerCase();
    Object.keys(contactsSorted).forEach(key => {
      let contact = contactsSorted[key];
      let contactNameLowerCase = contact.name.toLowerCase();

      if (contactNameLowerCase.includes(searchWord)) {
        contactsFiltered[key] = contact;
      }
    });
    return contactsFiltered;
  }

  return contactsSorted;
};

export const contactsSorted = state => {
  let contactsSorted = {},
    keysOrdered = Object.keys(state.contacts);

  keysOrdered.sort((a, b) => {
    let taskAProp = state.contacts[a][state.sort].toLowerCase(),
      taskBProp = state.contacts[b][state.sort].toLowerCase();

    if (taskAProp > taskBProp) return 1
    else if (taskAProp < taskBProp) return -1
    else return 0;
  });

  keysOrdered.forEach(key => {
    contactsSorted[key] = state.contacts[key]
  });

  return contactsSorted;
};
