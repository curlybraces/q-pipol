import { apolloClient } from "../../boot/apollo";
import {
  FETCH_CONTACTS,
  CREATE_CONTACT_MUTATION
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
        office: payload.office,
        email: payload.email,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number
      }
    })
    .then(() => {
      return;
    });
}
