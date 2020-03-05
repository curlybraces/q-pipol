import {apolloClient} from "../../boot/apollo";
import {FETCH_CONTACTS} from "../../constants/graphql";

export function fetchContacts({commit}) {
  commit("SET_LOADING", true);
  apolloClient.query({
    query: FETCH_CONTACTS
  })
  .then(res => {
    commit("SET_CONTACTS",res.data.contacts);
    commit("SET_LOADING", false);
  })
    .catch(err => {
      console.log("An error occurred: ",err);
      commit("SET_ERROR",true);
      commit("SET_LOADING",false);
    });
}

