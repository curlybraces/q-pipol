const ProjectsRoutes = [
    {
      path: 'projects',
      name: 'index-project',
      component: () =>
        import(
          /* webpackChunkName: 'ProjectsPage' */ './pages/ProjectsPage.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'projects/endorse',
      name: 'endorse-projects',
      component: () =>
        import(
          /* webpackChunkName: 'EndorseProjects' */ './pages/EndorseProjects.vue'
        ),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'projects/deleted',
      name: 'deleted-projects',
      component: () =>
        import(
          /* webpackChunkName: 'DeletedProjects' */ './pages/DeletedProjects.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true
      }
    },
    {
      path: 'projects/add',
      name: 'add-project',
      component: () =>
        import(
          /* webpackChunkName: 'AddProjectPage' */ './pages/AddProjectPage.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true
      }
    },
    {
      path: 'projects/:id/edit',
      name: 'edit-project',
      component: () =>
        import(
          /* webpackChunkName: 'UpdateProjectPage' */ './pages/EditProject.vue'
        ),
      meta: {
        requiresAuth: true,
        isEncoder: true
      }
    },
    {
      path: 'projects/:id/review',
      name: 'review-project',
      component: () =>
        import(
          /* webpackChunkName: 'ReviewProject' */ './pages/ReviewProject.vue'
        ),
      meta: {
        requiresAuth: true,
        isReviewer: true
      }
    },
    {
      path: 'projects/:id',
      name: 'view-project',
      component: () =>
        import(/* webpackChunkName: 'ViewProject' */ './pages/ViewProject.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]

export default ProjectsRoutes;
