const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "login", component: () => import("pages/Login.vue") },
      { path: "settings", component: () => import("pages/Settings.vue") }
    ]
  },
  {
    path: "/projects",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/projects/ListProjects.vue") },
      { path: "add", component: () => import("pages/projects/AddProject.vue") },
      {
        path: "edit",
        component: () => import("pages/projects/EditProject.vue")
      }
    ]
  },
  {
    path: "/programs",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/programs/ViewPrograms.vue") },
      {
        path: "add",
        component: () => import("pages/programs/AddSubproject.vue")
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
