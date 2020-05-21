const SettingsRoute = {
  path: 'settings',
  name: 'settings',
  component: () =>
    import(/* webpackChunkName: 'SettingsPage' */ './pages/SettingsPage.vue'),
  meta: {
    requiresAuth: true
  }
};

export default SettingsRoute;
