// Basic Installation: https://vue-apollo.netlify.com/guide/installation.html#_1-apollo-client
// Pusher Integration: https://medium.com/sjk5766/laravel-graphql-subscription-vue-apollo-or-nuxt-338108ffb1cb
// Hasura reference: https://hasura.io/learn/graphql/vue/apollo-client/

import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { LocalStorage } from 'quasar';

const uri = process.env.DEV
  ? 'https://da-ipms.herokuapp.com/graphql'
  : 'https://da-ipms.herokuapp.com/graphql';

const httpLink = new HttpLink({
  uri: uri
});

const cache = new InMemoryCache({
  addTypename: false
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = LocalStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
  connectToDevTools: true
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
