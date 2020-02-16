// For more info: https://lighthouse-php.com/master/subscriptions/client-implementations.html#apollo
// import Pusher from "pusher-js"; // enable pusher
import { ApolloLink, Observable } from "apollo-link"; // enable pusher

class PusherLink extends ApolloLink {
  constructor(options) {
    super();
    // Retain a handle to the Pusher client
    this.pusher = options.pusher;
  }

  request(operation, forward) {
    return new Observable(observer => {
      // Check the result of the operation
      forward(operation).subscribe({
        next: data => {
          const subscriptionChannel = this._getChannel(data, operation);
          // console.log("data: ",data,"operation: ",operation,"subscriptionChannel: ",subscriptionChannel);
          if (subscriptionChannel) {
            this._createSubscription(subscriptionChannel, observer);
            // console.log("triggered on existing subscriptionChannel: ", subscriptionChannel, "with observer: ", observer);
          } else {
            observer.next(data);
            // console.log(observer,"next");
            observer.complete();
            // console.log(observer,"completed");
          }
        }
      });
    });
  }

  _getChannel(data, operation) {
  	// console.log("getChannel: I am triggered")
    return !!data.extensions &&
      !!data.extensions.lighthouse_subscriptions &&
      !!data.extensions.lighthouse_subscriptions.channels
      ? data.extensions.lighthouse_subscriptions.channels[
          operation.operationName
        ]
      : null;
  }

  _createSubscription(subscriptionChannel, observer) {
    const pusherChannel = this.pusher.subscribe(subscriptionChannel);
    // console.log("pusherChannel: ", pusherChannel);
    // Subscribe for more update
    pusherChannel.bind("lighthouse-subscription", payload => {
    	// console.log("payload of lighthouse-subscription: ", payload)
      if (!payload.more) {
        // This is the end, the server says to unsubscribe
        this.pusher.unsubscribe(subscriptionChannel);
        observer.complete();
      }
      const result = payload.result;
      if (result) {
        // Send the new response to listeners
        observer.next(result);
      }
    });
  }
}

export default PusherLink;