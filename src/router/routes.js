const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'Index' */ 'pages/Index.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        component: () =>
          import(/* webpackChunkName: 'Admin' */ 'pages/Admin.vue')
      },
      {
        path: 'programs',
        name: 'programs',
        component: () =>
          import(/* webpackChunkName: 'Programs' */ 'pages/Programs.vue')
      },
      {
        path: 'directory',
        name: 'directory',
        component: () =>
          import(/* webpackChunkName: 'Programs' */ 'pages/Directory.vue')
      },
      {
        path: 'pip',
        name: 'pip',
        // component: () =>
        //   import(/* webpackChunkName: 'Projects' */ "pages/Projects.vue")
        component: () =>
          import(/* webpackChunkName: 'Projects' */ 'pages/Projectsv2.vue')
      },
      {
        path: 'account',
        component: () =>
          import(/* webpackChunkName: 'Account' */ 'pages/Account.vue')
      },
      {
        path: 'resources',
        component: () =>
          import(/* webpackChunkName: 'Resources' */ 'pages/Resources.vue')
      },
      {
        path: 'pip/new',
        component: () =>
          import(/* webpackChunkName: 'AddProject' */ 'pages/AddProject.vue')
      },
      {
        path: 'pip/:id/edit',
        name: 'EditProject',
        component: () =>
          import(
            /* webpackChunkName: 'UpdateProject' */ 'pages/EditProject.vue'
          )
      },
      {
        path: 'pip/:id',
        name: 'pipDetails',
        component: () =>
          import(/* webpackChunkName: 'ViewProject' */ 'pages/ViewProject.vue')
      },
      {
        path: 'trash',
        component: () =>
          import(
            /* webpackChunkName: 'DeletedProjects' */ 'pages/DeletedProjects.vue'
          )
      },
      {
        path: 'settings',
        component: () =>
          import(/* webpackChunkName: 'Settings' */ 'pages/Settings.vue')
      },
      {
        path: 'activity',
        component: () =>
          import(/* webpackChunkName: 'Activity' */ 'pages/Activity.vue')
      },
      {
        path: 'reports',
        component: () =>
          import(/* webpackChunkName: 'Reports' */ 'pages/Reports.vue')
      },
      {
        path: 'help',
        component: () => import(/* webpackChunkName: 'Help' */ 'pages/Help.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: 'Login' */ 'pages/Login.vue')
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('pages/Error404.vue')
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
