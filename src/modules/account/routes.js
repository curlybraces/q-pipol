const AccountRoutes = {
	path: '',
	component: () => import('../shared/layouts/AppLayout.vue'),
	children: [
		{
			path: 'account',
			name: 'account',
			component: () =>
				import(/* webpackChunkName: 'AccountPage' */ './pages/AccountPage.vue'),
			meta: {
				requiresAuth: true
			}
		}
	]
};

export default AccountRoutes;