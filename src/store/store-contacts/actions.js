import { apolloClient } from "../../boot/apollo";
import {
  FETCH_CONTACTS,
  CREATE_CONTACT_MUTATION,
  UPDATE_CONTACT_MUTATION,
  DELETE_CONTACT_MUTATION
} from "../../constants/graphql";

export function fetchContacts({ commit }) {
  commit("SET_LOADING", true);
  apolloClient
    .query({
      query: FETCH_CONTACTS
    })
    .then(res => {
      commit("SET_CONTACTS", res.data.contacts);
      commit("SET_LOADING", false);
    })
    .catch(err => {
      console.log("An error occurred: ", err);
      commit("SET_ERROR", true);
      commit("SET_LOADING", false);
    });
}

export function createContact({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: CREATE_CONTACT_MUTATION,
      variables: {
        name: payload.name,
        designation: payload.designation,
        operating_unit_id: payload.operating_unit_id,
        email: payload.email,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number
      }
    })
    .then(res => {
      const newContact = {
        id: res.data.createContact.id,
        operating_unit: {
          name: res.data.createContact.operating_unit.name
        },
        ...payload
      }
      commit("ADD_CONTACT", newContact);
      return;
    });
}

export function deleteContact({ commit }, id) {
  return apolloClient
    .mutate({
      mutation: DELETE_CONTACT_MUTATION,
      variables: {
        id: id
      }
    })
    .then(() => {
      commit("DELETE_CONTACT", id);
      return;
    });
}

export function updateContact({}, payload) {
  console.log(payload);
  return apolloClient.mutate({
    mutation: UPDATE_CONTACT_MUTATION,
    variables: {
      id: payload.id,
      name: payload.name,
      designation: payload.designation,
      operating_unit_id: payload.operating_unit_id,
      email: payload.email,
      phone_number: payload.phone_number,
      fax_number: payload.fax_number
    }
  })
    .then(() => {
      return;
    });
}

export function setSearch({ commit }, value) {
  commit("SET_SEARCH", value);
}
