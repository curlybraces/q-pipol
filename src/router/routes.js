import AccountRoutes from '../modules/account/routes';
import AuthRoutes from '../modules/auth/routes';
import DirectoryRoutes from '../modules/directory/routes';
import DocumentationRoutes from '../modules/docs/routes';
import IndexRoutes from '../modules/index/routes';
import LandingRoute from '../modules/landing/routes';
import ProjectsRoutes from '../modules/projects/routes';
import ResourcesRoutes from '../modules/resources/routes';
import SettingsRoute from '../modules/settings/routes';

const routes = [
	LandingRoute,
	{
		path: '/',
		component: () => import('../modules/shared/layouts/AppLayout.vue'),
		children: [
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
				path: 'activity',
				name: 'activity',
				component: () =>
					import(
						/* webpackChunkName: 'ActivityPage' */ 'pages/ActivityPage.vue'
						),
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
	IndexRoutes,
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