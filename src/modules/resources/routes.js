const ResourcesRoutes = {
  path: 'resources',
  name: 'resources',
  component: () =>
    import(
      /* webpackChunkName: 'ResourcesPage' */ './pages/ResourcesPage.vue'
    ),
  meta: {
    requiresAuth: true
  }
}

export default ResourcesRoutes;
