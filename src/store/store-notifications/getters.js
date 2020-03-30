export function notificationsCount(state) {
  return Object.keys(state.notifications).length;
}

export function unreadNotifications(state) {
  let unreadNotifications = {};
  const notifications = state.notifications;

  Object.keys(notifications).forEach(key => {
    let notification = notifications[key];

    if (!notification.read_at) {
      unreadNotifications[key] = notification;
    }
  });

  return unreadNotifications;
}
