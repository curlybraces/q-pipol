import { LocalStorage } from "quasar";

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    // check if token exist
    // note that this does not check validity of token.
    const token = LocalStorage.getItem("token");
    if (!token && to.path !== "/login") {
      next("/login");
    } else if (token && to.path == "/login") {
      next("/");
    } else {
      next();
    }
  });
};
