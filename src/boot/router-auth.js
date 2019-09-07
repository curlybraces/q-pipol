import { LocalStorage, Dialog } from "quasar";
import { firebaseAuth } from "boot/firebase";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem("loggedIn");
    if (loggedIn) {
      var verifiedUser = firebaseAuth.currentUser.emailVerified;
    }
    if (!loggedIn && to.path !== "/login") {
      next("/login");
    } else if (loggedIn && to.path == "/login") {
      next("/");
    } else if (loggedIn && to.path == "/add" && !verifiedUser) {
      Dialog.create({
        message: "Please verify your email to create/add projects."
      });
    } else {
      next();
    }
  });
};
