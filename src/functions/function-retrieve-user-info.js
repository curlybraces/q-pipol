import { axiosInstance } from "boot/axios";
import { Dialog, LocalStorage } from "quasar";

export const retrieveUserInfo = () => {
  return axiosInstance
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
        return res.data.data.me;
      }
    });
};
