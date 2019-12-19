import { LocalStorage } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem("loggedIn");
    if (!loggedIn && to.path !== "/") {
      alert("Please login to continue.");
      next("/");
    } else {
      next();
    }
  });
};
