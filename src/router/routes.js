const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import(/* webpackChunkName: 'Index' */ "pages/Index.vue")
      },
      {
        path: "projects",
        component: () =>
          import(/* webpackChunkName: 'Projects' */ "pages/Projects.vue")
      },
      {
        path: "directory",
        component: () => import("pages/Directory.vue")
      },
      {
        path: "help",
        component: () => import("pages/Help.vue")
      },
      {
        path: "settings",
        component: () =>
          import(/* webpackChunkName: 'Settings' */ "pages/Settings.vue")
      },
      {
        path: "account",
        component: () => import("pages/Account.vue")
      },
      {
        path: "add",
        component: () =>
          import(/* webpackChunkName: 'AddProject' */ "pages/AddProject.vue")
      },
      {
        path: "projects/:id/edit",
        component: () =>
          import(/* webpackChunkName: 'EditProject' */ "pages/EditProject.vue")
      },
      {
        path: "projects/:id",
        component: () =>
          import(/* webpackChunkName: 'ViewProject' */ "pages/ViewProject.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import(/* webpackChunkName: 'Auth' */ "pages/Auth.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
