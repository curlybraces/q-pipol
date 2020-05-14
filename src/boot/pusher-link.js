/**
 * src/boot/pusher-link.js
 *
 * Defines a function to create pusher link which can be added to apollo link
 * 
 * Configuration is based on Lightouse-PHP documentation
 * See https://lighthouse-php.com/4.12/subscriptions/client-implementations.html#apollo
 */
import { ApolloLink, Observable } from 'apollo-link';

class PusherLink extends ApolloLink {
	constructor(options) {
		super();
		// Retain a handle to the Pusher client
		this.pusher = options.pusher;
	}
	
	request(operation, forward) {
		return new Observable((observer) => {
			// Check the result of the operation
			forward(operation).subscribe({
				next: (data) => {
					// If the operation has the subscription extension, it's a subscription
					const subscriptionChannel = this._getChannel(data, operation);
					
					if (subscriptionChannel) {
						this._createSubscription(subscriptionChannel, observer);
					} else {
						// No subscription found in the response, pipe data through
						observer.next(data);
						observer.complete();
					}
				},
			});
		});
	}
	
	_getChannel(data, operation) {
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
		// Subscribe for more update
		pusherChannel.bind('lighthouse-subscription', (payload) => {
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
