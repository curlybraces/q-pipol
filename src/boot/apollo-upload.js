import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import { LocalStorage } from 'quasar';

const link = createUploadLink({
  uri: 'https://da-ipms.herokuapp.com/graphql',
  headers: {
    authorization: LocalStorage.getItem('token')
      ? `Bearer ${LocalStorage.getItem('token')} `
      : ''
  }
});

const cache = new InMemoryCache();

export const uploadClient = new ApolloClient({
  link,
  cache
});
