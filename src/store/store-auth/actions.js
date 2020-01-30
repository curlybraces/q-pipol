import { Loading } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { axiosInstance } from "boot/axios";

export function createUser({}, { name, email, password }) {
  Loading.show();
  axiosInstance
    .post("/graphql", {
      query: `
        mutation createUser(
          $name: String!
          $email: String!
          $password: String!
        ) {
          createUser(
            name: $name
            email: $email
            password: $password
          )
        }
      `,
      variables: {
        name: name,
        email: email,
        password: password
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      showErrorMessage(err.message);
    })
    .finally(() => Loading.hide());
}

export function loginUser({}, payload) {
  Loading.show();
  console.log(payload);
}

export const logoutUser = () => {
  Loading.show();
};
