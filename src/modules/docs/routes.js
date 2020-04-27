const DocumentationRoutes = {
  path: '/docs',
  component: () => import('./layouts/DocumentationLayout.vue'),
  children: [
    {
      path: '',
      name: 'docs-index',
      component: () => import('./pages/Introduction.vue')
    },
    {
      path: 'getting-started',
      name: 'docs-getting-started',
      component: () => import('./pages/GettingStarted.vue')
    },
    {
      path: 'features',
      name: 'docs-features',
      component: () => import('./pages/Features.vue')
    },
    {
      path: 'installation',
      name: 'docs-installation',
      component: () => import('./pages/Installation.vue')
    }
  ]
};

export default DocumentationRoutes;
