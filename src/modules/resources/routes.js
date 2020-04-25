const ResourcesRoutes = {
	path: '',
	component: () => import('../shared/layouts/AppLayout.vue'),
	children: [
		{
			path: 'resources',
			name: 'resources',
			component: () => import(
				/* webpackChunkName: 'ResourcesPage' */ './pages/ResourcesPage.vue'
			),
			meta: {
				requiresAuth: true
			}
		}
	]
};

export default ResourcesRoutes;