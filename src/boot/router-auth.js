import { LocalStorage, Dialog } from 'quasar';

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    const token = LocalStorage.getItem('token');
    const role = LocalStorage.getItem('role');
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!token || token == '') {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        });
      } else {
        if (to.matched.some(record => record.meta.is_admin)) {
          if (role == 'admin' || role == 'superadmin') {
            next();
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to admins only',
              cancel: true
            });
            next({ name: 'home' });
          }
        }
        if (to.matched.some(record => record.meta.is_encoder)) {
          if (role == 'encoder') {
            next();
          } else {
            Dialog.create({
              title: 'Restricted',
              message:
                'The page you are trying to access is restricted to encoders only',
              cancel: true
            });
            next({ name: 'home' });
          }
        }
        else {
          next();
        }
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      if (!token) {
        next();
      } else {
        next({ name: 'home' });
      }
    } else {
      next();
    }
  });
};
