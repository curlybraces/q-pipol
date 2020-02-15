// This file has been archived in favor of implementation in boot/apollo.js
import Pusher from "pusher-js";
import { LocalStorage, Notify } from "quasar";

const TOKEN = LocalStorage.getItem("token");
const APP_KEY = "43f35a023f84d4edd751";
const APP_CLUSTER = "ap1";

// disable during production
Pusher.logToConsole = true;

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

const channel = pusher.subscribe("my-channel");

channel.bind("my-event", data => {
  Notify.create({
    message: data.message,
    position: "bottom-right",
    color: "primary",
    timeout: 0
  })
});

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$pusher = pusher;
};

export { pusher };
