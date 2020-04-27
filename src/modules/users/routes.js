const UsersRoutes = {
  path: 'admin',
  name: 'admin',
  component: () =>
    import(/* webpackChunkName: 'AdminPage' */ './pages/Users.vue'),
  meta: {
    is_admin: true,
    requiresAuth: true
  }
};

export default UsersRoutes;
