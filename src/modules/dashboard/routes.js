const DashboardRoutes = {
  path: 'dashboard',
  name: 'dashboard',
  component: () =>
    import(/* webpackChunkName: 'Index' */ './pages/Dashboard.vue'),
  meta: {
    requiresAuth: true
  }
}

export default DashboardRoutes;
