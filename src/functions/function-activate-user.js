import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const activateUser = ({ id, active }) => {
  return axiosInstance
    .post("/graphql", {
      query: `mutation activateUser(
        $id:ID!
        $active:Boolean!
        ) {
        activateUser(
          id: $id
          active: $active
        )
      }`,
      variables: {
        id: id,
        active: active
      }
    })
    .then(res => {
      if (res.data.errors) {
        return Promise.reject(res.data.errors[0]);
      } else {
        return res;
      }
    })
    .catch(err => {
      showErrorMessage(err.message);
    });
};
