const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'LandingPage' */ 'pages/Landing.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: 'Index' */ 'pages/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () =>
          import(/* webpackChunkName: 'AdminPage' */ 'pages/Admin.vue'),
        meta: {
          is_admin: true,
          requiresAuth: true
        }
      },
      {
        path: 'programs',
        name: 'programs',
        component: () =>
          import(/* webpackChunkName: 'Programs' */ 'pages/Programs.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'directory',
        name: 'directory',
        component: () =>
          import(/* webpackChunkName: 'Programs' */ 'pages/DirectoryPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects',
        name: 'projects',
        component: () =>
          import(
            /* webpackChunkName: 'ProjectsPage' */ 'pages/PaginatedProjectsPage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'account',
        name: 'account',
        component: () =>
          import(/* webpackChunkName: 'AccountPage' */ 'pages/AccountPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'resources',
        name: 'resources',
        component: () =>
          import(
            /* webpackChunkName: 'ResourcesPage' */ 'pages/ResourcesPage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects/create',
        name: 'create-project',
        component: () =>
          import(
            /* webpackChunkName: 'CreateProject' */ 'pages/CreateProject.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects/add',
        name: 'add-project',
        component: () =>
          import(
            /* webpackChunkName: 'AddProjectPage' */ 'pages/AddProjectPage.vue'
          )
      },
      // {
      //   path: 'projects/new',
      //   name: 'new-project',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'AddProjectPage' */ 'pages/AddProject.vue'
      //     ),
      //   meta: {
      //     requiresAuth: true,
      //     is_encoder: true
      //   }
      // },
      {
        path: 'projects/:id/edit',
        name: 'edit-project',
        component: () =>
          import(
            /* webpackChunkName: 'UpdateProjectPage' */ 'pages/EditProject.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects/:id/review',
        name: 'review-project',
        component: () =>
          import(
            /* webpackChunkName: 'ReviewProject' */ 'pages/ReviewProject.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects/:id',
        name: 'view-project',
        component: () =>
          import(/* webpackChunkName: 'ViewProject' */ 'pages/ViewProject.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects/deleted',
        name: 'deleted-projects',
        component: () =>
          import(
            /* webpackChunkName: 'DeletedProjects' */ 'pages/DeletedProjects.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () =>
          import(
            /* webpackChunkName: 'SettingsPage' */ 'pages/SettingsPage.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () =>
          import(/* webpackChunkName: 'ActivityPage' */ 'pages/Activity.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () =>
          import(/* webpackChunkName: 'ReportsPage' */ 'pages/Reports.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'help',
        name: 'help',
        component: () =>
          import(/* webpackChunkName: 'HelpPage' */ 'pages/Help.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () =>
          import(
            /* webpackChunkName: 'NotificationsPage'*/ 'pages/Notifications.vue'
          )
      },
      {
        path: 'gad',
        name: 'gad',
        component: () =>
          import(
            /* webpackChunkName: 'GenderResponsivenessPage' */ 'pages/GenderResponsiveness.vue'
          )
      },
      {
        path: 'gad-help',
        name: 'gad-help',
        component: () =>
          import(/* webpackChunkName: 'GadHelpPage' */ 'pages/GadHelp.vue')
      },
      {
        path: 'progress-tracker',
        name: 'progress-tracker',
        component: () =>
          import(
            /* webpackChunkName: 'ProgressTrackerPage' */ 'pages/ProgressTracker.vue'
          )
      }
    ]
  },
  {
    path: '/docs',
    component: () => import('layouts/DocumentationLayout.vue'),
    children: [
      {
        path: '',
        name: 'docs-index',
        component: () => import('pages/docs/Introduction.vue')
      },
      {
        path: 'getting-started',
        name: 'docs-getting-started',
        component: () => import('pages/docs/GettingStarted.vue')
      },
      {
        path: 'features',
        name: 'docs-features',
        component: () => import('pages/docs/Features.vue')
      },
      {
        path: 'installation',
        name: 'docs-installation',
        component: () => import('pages/docs/Installation.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: 'LoginPage' */ 'pages/Login.vue'),
        meta: {
          guest: true
        }
      }
    ]
  },
  {
    path: '/email-verify',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'email-verify',
        component: () => import('pages/EmailVerify.vue')
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
