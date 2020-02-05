import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const loginUser = ({ username, password }) => {
  return axiosInstance
    .post("/graphql", {
      query: `mutation login(
        $password: String!
        $username: String!
      ){
        login(
            input:{
              password:$password
              username:$username,
            }) {
            access_token
            user {
              id
              name
              email
            }
        }
      }`,
      variables: {
        username: username,
        password: password
      }
    })
    .then(res => {
      if (res.data.errors) {
        return Promise.reject(res.data.errors[0]);
      } else {
        var token = res.data.data.login.access_token;
        return token;
      }
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
};
