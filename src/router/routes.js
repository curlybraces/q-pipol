import AccountRoutes from '../modules/account/routes';
import AuthRoutes from '../modules/auth/routes';
import DirectoryRoutes from '../modules/directory/routes';
import DocumentationRoutes from '../modules/docs/routes';
import DashboardRoutes from '../modules/dashboard/routes';
import LandingRoute from '../modules/landing/routes';
import ProjectsRoutes from '../modules/projects/routes';
import ResourcesRoutes from '../modules/resources/routes';
import SettingsRoute from '../modules/settings/routes';
import ActivityRoutes from '../modules/activities/routes';
import UsersRoutes from '../modules/users/routes';
import NotificationsRoutes from '../modules/notifications/routes';

const routes = [
  LandingRoute,
  {
    path: '/',
    component: () => import('../modules/shared/layouts/AppLayout.vue'),
    children: [
      UsersRoutes,
      ActivityRoutes,
      NotificationsRoutes
      // {
      // 	path: 'help',
      // 	name: 'help',
      // 	component: () =>
      // 		import(/* webpackChunkName: 'HelpPage' */ 'pages/Help.vue'),
      // 	meta: {
      // 		requiresAuth: true
      // 	}
      // },
      // {
      // 	path: 'gad',
      // 	name: 'gad',
      // 	component: () =>
      // 		import(
      // 			/* webpackChunkName: 'GenderResponsivenessPage' */ 'pages/GenderResponsiveness.vue'
      // 			)
      // },
      // {
      // 	path: 'gad-help',
      // 	name: 'gad-help',
      // 	component: () =>
      // 		import(/* webpackChunkName: 'GadHelpPage' */ 'pages/GadHelp.vue')
      // },
      // {
      // 	path: 'progress-tracker',
      // 	name: 'progress-tracker',
      // 	component: () =>
      // 		import(
      // 			/* webpackChunkName: 'ProgressTrackerPage' */ 'pages/ProgressTracker.vue'
      // 			)
      // }
    ]
  },
  DashboardRoutes,
  DocumentationRoutes,
  AccountRoutes,
  ...AuthRoutes,
  ResourcesRoutes,
  DirectoryRoutes,
  ProjectsRoutes,
  SettingsRoute,
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
