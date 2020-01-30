import { axiosInstance } from "boot/axios";
import { Loading, LocalStorage } from "quasar";

export const login = ({ email, password }) => {
  Loading.show();
  axiosInstance
    .post("/api/auth/login", {
      email: email,
      password: password
    })
    .then(res => {
      LocalStorage.set("jwt", res.data.access_token);
      LocalStorage.set("loggedIn", true);
    })
    .catch(err => console.log(err))
    .finally(() => Loading.hide());
};
