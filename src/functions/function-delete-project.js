import { axiosInstance } from "../boot/axios";
import { Loading } from "quasar";
import { showErrorMessage } from "./function-show-error-message";

export const deleteProject = ({ id }) => {
  Loading.show();
  return axiosInstance
    .post("/graphql", {
      query: `mutation deleteProject($id: ID!)
      {
        deleteProject(id: $id)
      }`,
      variables: {
        id: id
      }
    })
    .then(res => {
      if (res.data.errors) {
        Promise.reject(res.data.errors[0]);
      } else {
        return res.data.data.deleteProject;
      }
    })
    .catch(err => {
      showErrorMessage(err.message);
    })
    .finally(() => Loading.hide());
};
