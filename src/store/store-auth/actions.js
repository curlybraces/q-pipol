import { Loading, Dialog, LocalStorage } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { axiosInstance, setAuthHeader } from "boot/axios";

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
          ) {
            id
          }
        }
      `,
      variables: {
        name: name,
        email: email,
        password: password
      }
    })
    .then(res => {
      if (res.data.data.createUser)
        Dialog.create({
          title: "Success",
          message: "You may now login"
        });
    })
    .catch(err => {
      showErrorMessage(err.message);
    })
    .finally(() => Loading.hide());
}

export function loginUser({ commit, dispatch }, { email, password }) {
  Loading.show();
  axiosInstance
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
      var token = res.data.data.loginUser;
      commit("SET_TOKEN", token);
      commit("SET_LOGGED_IN", true);
      LocalStorage.set("loggedIn", true);
      setAuthHeader(token);

      dispatch("retrieveUserInfo");

      this.$router.push("/");
    })
    .catch()
    .finally(() => Loading.hide());
}

export function retrieveUserInfo({ commit }) {
  axiosInstance
    .post("/graphql", {
      query: `query {
        me {
          name
          email
          roles {
            name
          }
          profile {
            operating_unit {
              name
            }
            position
            unit
          }
        }
      }`
    })
    .then(res => {
      const { name, email } = res.data.data.me;
      commit("SET_NAME", name);
      commit("SET_EMAIL", email);
    });
}

export function logoutUser() {
  LocalStorage.remove("token");
  LocalStorage.remove("loggedIn");

  this.$router.replace("/login");
}
