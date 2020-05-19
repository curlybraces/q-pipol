const AuthRoutes = [
  {
    path: '',
    component: () => import('./layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: 'LoginPage' */ './pages/Login.vue'),
        meta: {
          guest: true
        }
      },
      {
        path: 'email-verify',
        name: 'email-verify',
        component: () => import('./pages/EmailVerify.vue')
      }
    ]
  }
];

export default AuthRoutes;
