import { apolloClient } from '../boot/apollo-boost';
import { ALL_USERS } from '../graphql/queries';

const usersService = {
  get() {
    return apolloClient
      .query({
        query: ALL_USERS
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
  create() {},
  read() {},
  update() {},
  delete() {}
};

export default usersService;
