import { apolloClient } from "../../boot/apollo";
import {
  FETCH_CONTACTS,
  CREATE_CONTACT_MUTATION,
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
  console.log(commit);
  return apolloClient
    .mutate({
      mutation: CREATE_CONTACT_MUTATION,
      variables: {
        name: payload.name,
        designation: payload.designation,
        operating_unit_id: payload.office,
        email: payload.email,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number
      }
    })
    .then(() => {
      return;
    });
}

export function deleteContact({}, id) {
  return apolloClient
    .mutate({
      mutation: DELETE_CONTACT_MUTATION,
      variables: {
        id: id
      }
    })
    .then(() => {
      return;
    });
}

export function setSearch({ commit }, value) {
  commit("SET_SEARCH", value);
}
