import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import { LocalStorage } from 'quasar';

const token = LocalStorage.getItem('token');

const uri = process.env.DEV
  ? // ? 'http://localhost:8000/graphql'
    'https://da-ipms.herokuapp.com/graphql'
  : 'https://da-ipms.herokuapp.com/graphql';

const link = createUploadLink({
  uri: uri,
  headers: {
    authorization: token ? `Bearer ${token} ` : ''
  }
});

const cache = new InMemoryCache();

export const uploadClient = new ApolloClient({
  link,
  cache
});
