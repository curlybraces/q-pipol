// import something here
import { Notify } from "quasar";

window.addEventListener("offline", () => {
  Notify.create({
    progress: true,
    message: "You are offline. Some features of the application may not work.",
    color: "end",
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    timeout: 5000,
    actions: [
      {
        label: "LEARN MORE",
        color: "yellow",
        handler: () => {
          /* ... */
        }
      }
    ]
  });
});

// "async" is optional
export default async (
  {
    /* app, router, Vue, ... */
  }
) => {
  // something to do
};
