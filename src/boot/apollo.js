import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from "apollo-boost";
import { LocalStorage } from "quasar";
import VueApollo from "vue-apollo";

const AUTH_TOKEN = LocalStorage.getItem("token");

const client = new ApolloClient({
  link: new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: "Bearer " + AUTH_TOKEN //Your Auth token extraction logic
      }
    });
    return forward(operation);
  }).concat(
    new HttpLink({
      uri: "http://localhost:8000/graphql" // Server URL
    })
  ),
  cache: new InMemoryCache()
});

console.log(client);

export const apolloProvider = new VueApollo({
  defaultClient: client,
  errorHandler({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
