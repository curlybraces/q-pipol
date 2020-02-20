// Basic Installation: https://vue-apollo.netlify.com/guide/installation.html#_1-apollo-client
// Pusher Integration: https://medium.com/sjk5766/laravel-graphql-subscription-vue-apollo-or-nuxt-338108ffb1cb

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloLink } from "apollo-link";
import VueApollo from "vue-apollo";
import { LocalStorage } from "quasar";

const uri = process.env.DEV
  ? "http://localhost:8000/graphql"
  : "https://da-ipms.herokuapp.com/graphql";

const getHeaders = () => {
  const headers = {};
  const token = LocalStorage.getItem("token");
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const httpLink = new HttpLink({
  uri: uri,
  fetch,
  headers: getHeaders()
});

const cache = new InMemoryCache();

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   const token = LocalStorage.getItem("token");
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : null
//     }
//   });

//   return forward(operation);
// });

const apolloClient = new ApolloClient({
  // link: authMiddleware.concat(httpLink),
  link: httpLink,
  cache,
  connectToDevTools: true
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
  // errorHandler({ graphQLErrors, networkError }) {
  //   if (graphQLErrors) {
  //     graphQLErrors.map(({ message, locations, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       )
  //     );
  //   }
  //   if (networkError) {
  //     console.log(`[Network error]: ${networkError}`);
  //   }
  // }
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
