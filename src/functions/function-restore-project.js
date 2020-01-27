import { axiosInstance } from "boot/axios";
import { Loading } from "quasar";

export const restoreProject = ({ id }) => {
  Loading.show();
  axiosInstance
    .post("/graphql", {
      query: `mutation restore_project($id: Int!) {
      restore_project(id: $id) {
        id
      }
    }`,
      variables: {
        id: id
      }
    })
    .then(res => {
      console.log(res);
    })
    .finally(() => {
      Loading.hide();
    });
};
