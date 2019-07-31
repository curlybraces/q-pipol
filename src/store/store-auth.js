const state = {

}

const mutations = {

}

const actions = {
	registerUser( context, payload) {
		this.$axios.post('/register', payload)
			.then(res => {
				console.log(res.data)
			})
			.catch(e => {
				console.log(e.message)
			});
	}
}

const getters = {

}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}