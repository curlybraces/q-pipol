const AuthRoutes = [
	{
		path: '/login',
		component: () => import('./layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'login',
				component: () =>
					import(/* webpackChunkName: 'LoginPage' */ './pages/Login.vue'),
				meta: {
					guest: true
				}
			}
		]
	},
	{
		path: '/email-verify',
		component: () => import('./layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'email-verify',
				component: () => import('./pages/EmailVerify.vue')
			}
		]
	},
];

export default AuthRoutes;