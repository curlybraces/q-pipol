import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const register = ({ name, email, password }) => {
  return axiosInstance
    .post("/graphql", {
      query: `mutation register(
      $name: String!
      $email: String!
      $password: String!
      $password_confirmation: String!
    ) {
      register(input: {
        name: $name
        email: $email
        password: $password
        password_confirmation: $password_confirmation
      }) {
        status
      }
    }`,
      variables: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password
      }
    })
    .then(res => {
      console.log(res.data);
      if (res.data.errors) {
        return Promise.reject(res.data.errors[0]);
      } else {
        return res.data.data.status;
      }
    })
    .catch(err => showErrorMessage(err.message));
};
