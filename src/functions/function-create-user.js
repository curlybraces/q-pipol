import { axiosInstance } from "boot/axios";
import { Loading } from "quasar";

export const createUser = ({ name, email, password }) => {
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
      console.log(err);
    })
    .finally(() => Loading.hide());
};
