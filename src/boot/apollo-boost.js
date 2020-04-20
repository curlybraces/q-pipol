import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import VueApollo from 'vue-apollo';
import localforage from 'localforage';
import { LocalStorage, Notify } from 'quasar';
// see https://v4.apollo.vuejs.org/guide-composable/error-handling.html#error-policies for error handling

const uri = process.env.DEV
  ? // ? 'http://localhost:8000/graphql'
    'https://da-ipms.herokuapp.com/graphql'
  : 'https://da-ipms.herokuapp.com/graphql';

const cache = new InMemoryCache({
  addTypename: true
});

localforage.setDriver([localforage.INDEXEDDB]);

persistCache({
  cache,
  storage: window.localStorage
});

export const apolloClient = new ApolloClient({
  uri: uri,
  cache,
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = LocalStorage.getItem('token') || '';
    operation.setContext({
      headers: {
        authorization: token ? 'Bearer ' + token : ''
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError: ', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log('graphQLErrors: ', err);
        if (err.extensions.category === 'authentication') {
          Notify.create({
            position: 'top',
            type: 'negative',
            message: 'You are not authenticated.'
          });
        }
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
