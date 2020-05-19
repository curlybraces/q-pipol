const ProfileRoutes = {
  path: '',
  component: () => import('../shared/layouts/AppLayout.vue'),
  children: [
    {
      path: 'profile',
      name: 'profile',
      component: () =>
        import(/* webpackChunkName: 'ProfilePage' */ './pages/ProfilePage.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
};

export default ProfileRoutes;
