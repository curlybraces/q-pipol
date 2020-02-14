// This file has been archived in favor of implementation in boot/apollo.js
import Pusher from "pusher-js";
import { LocalStorage } from "quasar";

const TOKEN = LocalStorage.getItem("token");
const APP_KEY = "50ea5b3a34026db27886";
const APP_CLUSTER = "ap1";

const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
  forceTLS: true,
  auth: {
    headers: {
      Authorization: TOKEN ? `Bearer ${TOKEN}` : null
    }
  }
});

pusher.connection.bind("error", function(err) {
  if (err.error.data.code === 4004) {
    console.log("Over the limit");
    pusher.disconnect();
  }
});

const channel = pusher.subscribe("test-event");

console.log(channel);

channel.bind("status", data => {
  console.log(data);
});

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$pusher = pusher;
};

export { pusher };
