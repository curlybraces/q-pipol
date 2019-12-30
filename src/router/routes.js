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
        path: "afmp/:id",
        component: () =>
          import(
            /* webpackChunkName: 'InterventionDetails' */ "pages/InterventionDetails.vue"
          )
      },
      {
        path: "afmp",
        component: () => import(/* webpackChunkName: 'Afmp' */ "pages/Afmp.vue")
      },
      {
        path: "pip",
        component: () =>
          import(/* webpackChunkName: 'Projects' */ "pages/Projects.vue")
      },
      {
        path: "directory",
        component: () =>
          import(/* webpackChunkName: 'Directory' */ "pages/Directory.vue")
      },
      {
        path: "help",
        component: () => import(/* webpackChunkName: 'Help' */ "pages/Help.vue")
      },
      {
        path: "settings",
        component: () =>
          import(/* webpackChunkName: 'Settings' */ "pages/Settings.vue")
      },
      {
        path: "account",
        component: () =>
          import(/* webpackChunkName: 'Account' */ "pages/Account.vue")
      },
      {
        path: "add",
        component: () =>
          import(/* webpackChunkName: 'AddProject' */ "pages/AddProject.vue")
      },
      {
        path: "pip/:id/edit",
        component: () =>
          import(/* webpackChunkName: 'EditProject' */ "pages/EditProject.vue")
      },
      {
        path: "pip/:id",
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
        component: () =>
          import(/* webpackChunkName: 'Login' */ "pages/Login.vue")
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
