const DirectoryRoutes = {
  path: 'directory',
  name: 'directory',
  component: () =>
    import(/* webpackChunkName: 'DirectoryPage' */ './pages/DirectoryPage.vue'),
  meta: {
    requiresAuth: true
  }
};

export default DirectoryRoutes;
