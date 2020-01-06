const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'Index' */ "pages/Index.vue")
      },
      {
        path: "interventions/:id",
        component: () =>
          import(
            /* webpackChunkName: 'InterventionDetails' */ "pages/InterventionDetails.vue"
          )
      },
      {
        path: "interventions",
        name: "interventions",
        component: () =>
          import(
            /* webpackChunkName: 'Interventions' */ "pages/Interventions.vue"
          )
      },
      {
        path: "pip",
        name: "pip",
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
        name: "pipDetails",
        component: () =>
          import(/* webpackChunkName: 'ViewProject' */ "pages/ViewProject.vue")
      },
      {
        path: "cart",
        component: () => import(/* webpackChunkName: 'Cart' */ "pages/Cart.vue")
      },
      {
        path: "user",
        component: () => import(/* webpackChunkName: 'User' */ "pages/User.vue")
      },
      {
        path: "pbp",
        component: () =>
          import(/* webpackChunkName: 'Budget' */ "pages/Budget.vue")
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
