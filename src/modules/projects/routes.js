const ProjectsRoutes = [
  {
    path: 'projects',
    name: 'index-project',
    component: () =>
      import(/* webpackChunkName: 'ProjectsPage' */ './pages/ProjectsPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'projects/draft',
    name: 'draft-projects',
    component: () =>
      import(
        /* webpackChunkName: 'DraftProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'draft'
    }
  },
  {
    path: 'projects/finalized',
    name: 'finalized-projects',
    component: () =>
      import(
        /* webpackChunkName: 'FinalizedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'finalized'
    }
  },
  {
    path: 'projects/endorsed',
    name: 'endorsed-projects',
    component: () =>
      import(
        /* webpackChunkName: 'EndorsedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'endorsed'
    }
  },
  {
    path: 'projects/validated',
    name: 'validated-projects',
    component: () =>
      import(
        /* webpackChunkName: 'ValidatedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'validated'
    }
  },
  {
    path: 'projects/reviewed',
    name: 'reviewed-projects',
    component: () =>
      import(
        /* webpackChunkName: 'ReviewedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'reviewed'
    }
  },
  {
    path: 'projects/accepted',
    name: 'accepted-projects',
    component: () =>
      import(
        /* webpackChunkName: 'AcceptedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'accepted'
    }
  },
  {
    path: 'projects/approved',
    name: 'approved-projects',
    component: () =>
      import(
        /* webpackChunkName: 'ApprovedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'approved'
    }
  },
  {
    path: 'projects/encoded',
    name: 'encoded-projects',
    component: () =>
      import(
        /* webpackChunkName: 'EncodedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'encoded'
    }
  },
  {
    path: 'projects/returned',
    name: 'returned-projects',
    component: () =>
      import(
        /* webpackChunkName: 'ReturnedProjects' */ './pages/ProjectsPage.vue'
      ),
    meta: {
      requiresAuth: true
    },
    props: {
      status: 'returned'
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
        /* webpackChunkName: 'EditProjectPage' */ './pages/EditProjectPage.vue'
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
];

export default ProjectsRoutes;
