import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";
import { Loading } from "quasar";

export const loginUser = ({ email, password }) => {
  Loading.show();
  return axiosInstance
    .post("/graphql", {
      query: `mutation loginUser(
        $email: String!
        $password: String!
      ) {
        loginUser(
          email: $email
          password: $password
        )
      }`,
      variables: {
        email: email,
        password: password
      }
    })
    .then(res => {
      if (res.data.errors) {
        return Promise.reject(res.data.errors[0]);
      } else {
        var token = res.data.data.loginUser;
        return token;
      }
    })
    .catch(error => {
      showErrorMessage(error.message);
    })
    .finally(() => Loading.hide());
};
