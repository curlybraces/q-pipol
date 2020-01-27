import { axiosInstance } from "../boot/axios";
import { Loading } from "quasar";
import { showErrorMessage } from "./function-show-error-message";

export const deleteProject = ({ id }) => {
  Loading.show();
  return axiosInstance
    .post("/graphql", {
      query: `mutation delete_project($id: Int!)
      {
        delete_project(id: $id) {
          id
        }
      }`,
      variables: {
        id: id
      }
    })
    .then(res => {
      console.log(res);
      if (!res.data.data.delete_project) {
        showErrorMessage(
          "Something went wrong. The project you are trying to delete may no longer exist."
        );
      }
    })
    .catch(err => {
      console.log(err.message);
    })
    .finally(() => Loading.hide());
};
