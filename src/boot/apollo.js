// Basic Installation: https://vue-apollo.netlify.com/guide/installation.html#_1-apollo-client
// Pusher Integration: https://medium.com/sjk5766/laravel-graphql-subscription-vue-apollo-or-nuxt-338108ffb1cb

import { ApolloClient } from "apollo-client";
// import Pusher from "pusher-js"; // enable pusher
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink  } from "apollo-link";
// import { Observable } from "apollo-link"; // enable pusher
import VueApollo from "vue-apollo";
import { LocalStorage } from "quasar";

// Pusher configuration
// class PusherLink extends ApolloLink {
//   constructor(options) {
//     super();
//     this.pusher = options.pusher;
//   }

//   request(operation, forward) {
//     return new Observable(observer => {
//       // Check the result of the operation
//       forward(operation).subscribe({
//         next: data => {
//           const subscriptionChannel = this._getChannel(data, operation);
//           console.log("subscriptionChannel: ",subscriptionChannel);
//           if (subscriptionChannel) {
//             this._createSubscription(subscriptionChannel, observer);
//           } else {
//             observer.next(data);
//             observer.complete();
//           }
//         }
//       });
//     });
//   }

//   _getChannel(data, operation) {
//     return !!data.extensions &&
//       !!data.extensions.lighthouse_subscriptions &&
//       !!data.extensions.lighthouse_subscriptions.channels
//       ? data.extensions.lighthouse_subscriptions.channels[
//           operation.operationName
//         ]
//       : null;
//   }

//   _createSubscription(subscriptionChannel, observer) {
//     const pusherChannel = this.pusher.subscribe(subscriptionChannel);
//     // Subscribe for more update
//     pusherChannel.bind("lighthouse-subscription", payload => {
//       if (!payload.more) {
//         // This is the end, the server says to unsubscribe
//         this.pusher.unsubscribe(subscriptionChannel);
//         observer.complete();
//       }
//       const result = payload.result;
//       if (result) {
//         // Send the new response to listeners
//         observer.next(result);
//       }
//     });
//   }
// }

// const PUSHER_API_KEY = "43f35a023f84d4edd751";
// const PUSHER_CLUSTER = "ap1";
// const auth_token = LocalStorage.getItem("token");

const uri = process.env.DEV
  ? "http://localhost:8000/graphql"
  : "https://e-planning.daplanningcentral.net/graphql";

// const pusherLink = new PusherLink({
//   // Enter your API_KEY and CLUSTER.
//   pusher: new Pusher(PUSHER_API_KEY, {
//     cluster: PUSHER_CLUSTER,
//     forceTLS: true,
//     authEndpoint: `${uri}/subscriptions/auth`,
//     auth: {
//       headers: {
//         authorization: auth_token ? `Bearer ${auth_token}` : null
//       }
//     }
//   })
// });

const httpLink = new HttpLink({
  uri: uri
});

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = LocalStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  });

  return forward(operation);
});

// const link = ApolloLink.from([pusherLink, httpLink]);

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  // link: authMiddleware.concat(link), // with pusher
  cache,
  connectToDevTools: true
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
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
