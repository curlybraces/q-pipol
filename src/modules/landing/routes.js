const LandingRoute = {
  path: '/',
  component: () => import('./layouts/LandingLayout.vue'),
  children: [
    {
      path: '',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: 'LandingPage' */ './pages/Landing.vue')
    }
  ]
};

export default LandingRoute;
