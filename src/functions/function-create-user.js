import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";
import { Loading } from "quasar";

export const createUser = ({ name, email, password, selectedRoles }) => {
  Loading.show();
  return axiosInstance
    .post("/graphql", {
      query: `
      mutation createUser(
        $name: String!
        $email: String!
        $password: String!
        $roles: ConnectRolesInput
      ) {
        createUser(
          name: $name
          email: $email
          password: $password
          roles: $roles
        ) {
          id
        }
      }
    `,
      variables: {
        name: name,
        email: email,
        password: password,
        roles: {
          connect: selectedRoles
        }
      }
    })
    .then(res => {
      if (res.data.errors) {
        return Promise.reject(res.data.errors[0]);
      }
      var user = res.data.data.createUser;
      return user;
    })
    .catch(error => {
      showErrorMessage(error.message);
    })
    .finally(() => Loading.hide());
};
