import { LocalStorage, Dialog } from 'quasar';

let user = {}, token = ''

const getRole = async () => {
	token = await LocalStorage.getItem('token')
	user = await LocalStorage.getItem('user')
	const role = user.role ? user.role.name: ''
	return { token, role }
}

export default ({ router }) => {
	getRole().then(({ role, token}) => {
		// console.log('role: ', role)
		// console.log('token', token)
		router.beforeEach((to, from, next) => {
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
					}
					if (to.matched.some(record => record.meta.isEncoder)) {
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
					} else {
						next();
					}
					if (to.matched.some(record => record.meta.isReviewer)) {
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
	})
};
