const IndexRoutes = {
	path: '/',
	component: () => import('../shared/layouts/AppLayout.vue'),
	children: [
		{
			path: 'dashboard',
			name: 'dashboard',
			component: () =>
				import(/* webpackChunkName: 'Index' */ './pages/Dashboard.vue'),
			meta: {
				requiresAuth: true
			}
		}
	]
};

export default IndexRoutes;