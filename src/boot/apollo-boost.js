// // import something here
//
// // "async" is optional
//
// import Vue from "vue";
// import VueApollo from "vue-apollo";
// import ApolloClient from "apollo-boost";
// // import { onError } from 'apollo-link-error';
// import { LocalStorage } from "quasar";
//
// Vue.use(VueApollo);
//
// //creating apollo client
// const client = new ApolloClient({
//   uri: "https://da-ipms.herokuapp.com/graphql",
//   request: operation => {
//     operation.setContext({
//       headers: {
//         authorization: "Bearer " + LocalStorage.getItem("token") || null
//       }
//     });
//   }
// });
//
// const apolloProvider = new VueApollo({
//   defaultClient: client
// });
//
// export default async ({ app, Vue }) => {
//   Vue.use(VueApollo);
//   app.apolloProvider = apolloProvider;
// };

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import VueApollo from "vue-apollo";
import { LocalStorage, Notify } from "quasar";

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: "Movie", id })
    }
  }
});

const request = async operation => {
  const token = await LocalStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: "Bearer " + token
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
      if (networkError) {
        console.log("throw log out");
        Notify.create({
          title: networkError
        });
      }
    }),
    requestLink,
    new HttpLink({
      uri: "https://da-ipms.herokuapp.com/graphql"
    })
  ]),
  cache
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

export default async ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
