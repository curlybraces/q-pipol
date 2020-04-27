const NotificationsRoutes = {
  path: 'notifications',
  name: 'notifications',
  component: () =>
    import(
      /* webpackChunkName: 'NotificationsPage'*/ './pages/Notifications.vue'
    )
};

export default NotificationsRoutes;
