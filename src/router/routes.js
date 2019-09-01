const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "notifications",
        component: () => import("pages/Notifications.vue")
      },
      {
        path: "directory",
        component: () => import("pages/Directory.vue")
      },
      {
        path: "help",
        component: () => import("pages/Help.vue")
      },
      {
        path: "settings",
        component: () => import("pages/Settings.vue")
      },
      {
        path: "account",
        component: () => import("pages/Account.vue")
      },
      {
        path: "about",
        component: () => import("pages/About.vue")
      },
      {
        path: "add",
        component: () => import("pages/projects/AddProject.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Auth.vue")
      }
    ]
  },
  {
    path: "/projects",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/projects/ListProjects.vue")
      },
      {
        path: "add",
        component: () => import("pages/projects/AddProject.vue")
      },
      {
        path: "recycle",
        component: () => import("pages/projects/DeletedProjects.vue")
      },
      {
        path: ":id",
        component: () => import("pages/projects/ViewProject.vue")
      }
    ]
  },
  {
    path: "/review",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "ranked",
        component: () => import("pages/review/RankedProjects")
      },
      {
        path: "programmed",
        component: () => import("pages/review/ProgrammedProjects")
      }
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
