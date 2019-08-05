const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "login", component: () => import("pages/Auth.vue") },
      { path: 'notifications', component: () => import('pages/Notifications.vue') },
      { path: "help", component: () => import("pages/Help.vue") },
      { path: "settings", component: () => import("pages/Settings.vue") },
      { path: "about", component: () => import("pages/About.vue") }
    ]
  },
  {
    path: "/projects",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/projects/ListProjects.vue") },
      { path: "add", component: () => import("pages/projects/AddProject.vue") },
      { path: ":id", component: () => import("pages/projects/EditProject.vue") }
    ]
  },
  {
    path: "/programs",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/programs/ViewActivities.vue")
      },
      {
        path: "add-activities",
        component: () => import("pages/programs/AddActivity.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
