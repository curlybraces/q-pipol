// import { apolloClient } from '../boot/apollo-boost'

export default {
  get() {
    // return all projects
  },
  getProject(id) {
    // return project with id
    console.log(id);
  },
  update(payload) {
    // update project with id and data
    console.log(payload);
  },
  delete(id) {
    // delete id
    console.log(id);
  },
  restore(id) {
    // restore project with id
    console.log(id);
  },
  // others
  finalize(id) {
    //
    console.log(id);
  },
  review(payload) {
    console.log(payload);
  }
};
