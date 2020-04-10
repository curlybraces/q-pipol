import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { LocalStorage } from 'quasar';
// see https://v4.apollo.vuejs.org/guide-composable/error-handling.html#error-policies for error handling

const uri = process.env.DEV
  ? 'https://da-ipms.herokuapp.com/graphql'
  : 'https://da-ipms.herokuapp.com/graphql';

const cache = new InMemoryCache({
  addTypename: true
});

export const apolloClient = new ApolloClient({
  uri: uri,
  cache,
  connectToDevTools: true,
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = LocalStorage.getItem('token') || '';
    operation.setContext({
      headers: {
        authorization: 'Bearer ' + token
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError: ', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log('graphQLErrors: ');
        console.dir(err);
      }
    }
  }
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
