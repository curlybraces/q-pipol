import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const updateForgottenPassword = ({ email, token, password }) => {
  axiosInstance
    .post("/graphql", {
      query: `mutation updateForgottenPassword(input:{
        $email: String!
        $token:String!
        $password:String!
      }) {
        updateForgottenPassword(
          input: {
            email:$email
            token:$token
            password:$password
            password_confirmation:$password
          }
      }) {
        status
        message
      }`,
      variables: {
        email: email,
        token: token,
        password: password
      }
    })
    .then(res => {
      if (res.data.errors) {
        Promise.reject(res.data.errors[0]);
      } else {
        return res.data.data;
      }
    })
    .catch(err => {
      showErrorMessage(err.message);
    });
};
