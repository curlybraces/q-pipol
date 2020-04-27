const ActivityRoutes = {
  path: 'activity',
  name: 'activity',
  component: () =>
    import(/* webpackChunkName: 'ActivityPage' */ './pages/ActivityPage.vue'),
  meta: {
    requiresAuth: true
  }
};

export default ActivityRoutes;
