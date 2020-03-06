export const contactsFiltered = state => {
  let contactsFiltered = [];

  if (state.search) {
    const searchWord = state.search.toLowerCase();
    contactsFiltered = state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchWord)
    );
    return contactsFiltered;
  }
  return state.contacts;
};
