import AuthRoutes from '../modules/auth/routes';
import DirectoryRoutes from '../modules/directory/routes';
import DashboardRoutes from '../modules/dashboard/routes';
import LandingRoute from '../modules/landing/routes';
import ProfileRoutes from '../modules/profile/routes';
import ProjectsRoutes from '../modules/projects/routes';
import SettingsRoute from '../modules/settings/routes';
import ActivityRoutes from '../modules/activities/routes';
import UsersRoutes from '../modules/users/routes';
import NotificationsRoutes from '../modules/notifications/routes';

const routes = [
  LandingRoute,
  {
    path: '/',
    component: () => import('@/ui/layouts/AppLayout.vue'),
    children: [
      UsersRoutes,
      ActivityRoutes,
      NotificationsRoutes,
      DashboardRoutes,
      SettingsRoute,
      ProfileRoutes,
      // ResourcesRoutes,
      ...ProjectsRoutes,
      DirectoryRoutes
    ]
  },
  AuthRoutes,
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
