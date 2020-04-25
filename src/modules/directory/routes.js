const DirectoryRoutes = {
	path: '',
	component: () => import('../shared/layouts/AppLayout.vue'),
	children: [
		{
			path: 'directory',
			name: 'directory',
			component: () =>
				import(/* webpackChunkName: 'DirectoryPage' */ './pages/DirectoryPage.vue'),
			meta: {
				requiresAuth: true
			}
		}
	]
};

export default DirectoryRoutes;