const ProfileRoutes = {
  path: 'profile',
  name: 'profile',
  component: () =>
    import(/* webpackChunkName: 'ProfilePage' */ './pages/ProfilePage.vue'),
  meta: {
    requiresAuth: true
  }
}

export default ProfileRoutes;
