import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import VueApollo from 'vue-apollo';
import { ApolloLink } from 'apollo-link';
import localforage from 'localforage';
import { CachePersistor, persistCache } from 'apollo-cache-persist';
import {
	LocalStorage,
	Notify,
	Dialog,
	Loading
} from 'quasar';
import store from '../store'

// define the link that apollo will connect to
const uri = process.env.DEV
  ? 'http://localhost:8000/graphql'
  : 'https://da-ipms.herokuapp.com/graphql';

// Create cache
const cache = new InMemoryCache({
  addTypename: true
});

// set the driver for the cache storage
localforage.setDriver([localforage.INDEXEDDB]);

// define the persistor
export const persistor = new CachePersistor({
  cache,
  storage: localforage
});

// this function determines the size of the localforage database
persistor.getSize().then(size => console.log(size));

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

// create link for error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ debugMessage, message, locations, path }) => {
      // if unauthenticated, notify user and allow them to logout
      if (debugMessage === 'Unauthenticated.') {
        console.log('Token is not valid.')
        Dialog.create({
          title: 'Invalid Token',
          message: 'You are no longer logged in.'
        })
        .onOk(() => {
          store.dispatch('auth/signoutUser')
        })
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    });
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    Notify.create({
	    message: 'A network error occurred.',
	    color: 'negative',
	    position: 'top-right'
    })
  }
});

const uploadLink = createUploadLink({
  uri: uri
});

export const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, uploadLink]),
  cache
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

export default async ({ app, Vue }) => {
  Vue.use(VueApollo);
  // if this starts acting up, just delete this
  await persistCache({
	  cache,
	  storage: localforage
  }).then(() => {
  	app.apolloProvider = apolloProvider
  })
  // app.apolloProvider = apolloProvider;
};
