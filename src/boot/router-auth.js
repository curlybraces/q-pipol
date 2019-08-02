export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn && to.path !== "/login") {
      next("login");
    } else if (loggedIn && to.path == "/login") {
      next("/");
    } else {
      next();
    }
  });
};
