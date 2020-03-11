// import something here

// "async" is optional


import Vue from 'vue'
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost'
import {LocalStorage} from "quasar";

Vue.use(VueApollo);

//creating apollo client
const client = new ApolloClient({
  uri: "https://da-ipms.herokuapp.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer ' + LocalStorage.getItem("token") || null
      },
    });
  }
});


const apolloProvider = new VueApollo({
  defaultClient: client
});

export default async ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
}
