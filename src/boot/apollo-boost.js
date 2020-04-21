import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import VueApollo from 'vue-apollo';
import { ApolloLink } from 'apollo-link';
import localforage from 'localforage';
import { CachePersistor, persistCache } from 'apollo-cache-persist';
import { LocalStorage } from 'quasar';

const uri = process.env.DEV
  ? // ? 'http://localhost:8000/graphql'
    'https://da-ipms.herokuapp.com/graphql'
  : 'https://da-ipms.herokuapp.com/graphql';

const cache = new InMemoryCache({ addTypename: true });

// set the driver for the cache storage
localforage.setDriver([localforage.INDEXEDDB]);

// define the persistor
export const persistor = new CachePersistor({
  cache,
  storage: localforage
});

// call the persist cache
persistCache({
  cache,
  storage: localforage
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = LocalStorage.getItem('token');
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri: uri
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, uploadLink]),
  cache
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
