import { client } from '@/boot/apollo'
import { LOGIN_MUTATION } from '@/graphql/mutations'

const  authService = {
  register() {},
  login(payload) {
  	return client
  		.mutate({
  			mutation: LOGIN_MUTATION,
  			variables: payload
  		})
  		.then(({ data }) => data)
  		.catch(err => console.error(err))
  },
  logout() {}
};

export default authService