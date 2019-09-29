import { LocalStorage } from "quasar";
// import { firebaseAuth } from "boot/firebase";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem("loggedIn");
    // if (!loggedIn && to.path !== "/login") {
    //   next("/login");
    // } else if (loggedIn && to.path == "/login") {
    //   next("/");
    // } else if (loggedIn && to.path == "/add" && !verifiedUser) {
    //   // check if user verified their email
    //   let user = firebaseAuth.currentUser;
    //   var verifiedUser = user.emailVerified;
    //   if (!verifiedUser) {
    //     Dialog.create({
    //       message: "Please verify your email to create/add projects."
    //     });
    //   } else {
    //     next();
    //   }
    // } else {
    //   next();
    // }
    if (!loggedIn && to.path !== "/") {
      next("/");
    } else {
      next();
    }
  });
};
