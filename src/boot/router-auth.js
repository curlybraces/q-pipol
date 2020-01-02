import { LocalStorage } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem("loggedIn");
    if (!loggedIn && to.path !== "/login") {
      next("/login");
    } else if (loggedIn && to.path == "/login") {
      next("/");
    } else {
      next();
    }
  });
};
