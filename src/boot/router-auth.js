import { LocalStorage, Dialog } from 'quasar';

export default async ({ router, store }) => {
	
	router.beforeEach((to, from, next) => {
		const token = LocalStorage.getItem('token')
		const user = store.state.auth.user
		const role = user ? (user.role ? user.role.name: 'guest') : 'guest'
		// console.log(`user: ${user} role: ${role}, token: ${!!token}`)

		if (to.matched.some(record => record.meta.requiresAuth)) {
			if (!token) {
				next({
					path: '/login',
					params: { nextUrl: to.fullPath }
				});
			} else {
				if (to.matched.some(record => record.meta.isAdmin)) {
					if (role === 'admin' || role === 'superadmin') {
						next();
					} else {
						Dialog.create({
							title: 'Restricted',
							message:
								'The page you are trying to access is restricted to admins only',
							cancel: true
						});
						// next({ name: 'home' });
						// redirect to origin page
						next({ name: 'dashboard' })
					}
				} else if (to.matched.some(record => record.meta.isEncoder)) {
					if (role === 'encoder') {
						next();
					} else {
						Dialog.create({
							title: 'Restricted',
							message:
								'The page you are trying to access is restricted to encoders only',
							cancel: true
						});
						// next({ name: 'home' });
						// redirect to origin page
						next({ name: 'index-project' })
					}
				} else if (to.matched.some(record => record.meta.isReviewer)) {
					if (role === 'reviewer') {
						next();
					} else {
						Dialog.create({
							title: 'Restricted',
							message:
								'The page you are trying to access is restricted to reviewers only',
							cancel: true
						});
						// next({ name: 'home' });
						// redirect to origin page
						next({ name: 'index-project' })
					}
				} else {
					return next()
				}
			}
		} else {
			return next();
		}
	});
};
