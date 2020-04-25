const SettingsRoute = {
	path: '',
	component: () => import('../shared/layouts/AppLayout.vue'),
	children: [
		{
			path: 'settings',
			name: 'settings',
			component: () =>
				import(
					/* webpackChunkName: 'SettingsPage' */ './pages/SettingsPage.vue'
					),
			meta: {
				requiresAuth: true
			}
		}
	]
};

export default SettingsRoute;