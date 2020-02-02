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
  Loading.show();
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
              id
              name
              image
            }
            position
            unit
          }
        }
      }`
    })
    .then(res => {
      console.log("Retrieving user info.");
      Loading.hide();
      if (res.data.errors) {
        Dialog.create({
          title: "Unauthenticated",
          message: "You are not logged in.",
          persistent: true
        }).onOk(() => {
          LocalStorage.remove("loggedIn");
          LocalStorage.remove("token");

          this.$router.push("/login");
        });
      } else {
        const { name, email, profile, roles } = res.data.data.me;

        commit("SET_TOKEN", LocalStorage.getItem("token"));
        commit("SET_LOGGED_IN", LocalStorage.getItem("loggedIn"));
        commit("SET_NAME", name);
        commit("SET_EMAIL", email);
        commit("SET_IMAGE", profile.operating_unit.image);
        commit("SET_OPERATING_UNIT", profile.operating_unit.id);
        commit("SET_POSITION", profile.position);
        commit("SET_UNIT", profile.unit);
        commit("SET_ROLES", roles);
      }
    })
    .finally(() => Loading.hide());
}

export function logoutUser() {
  LocalStorage.remove("token");
  LocalStorage.remove("loggedIn");

  this.$router.replace("/login");
}
