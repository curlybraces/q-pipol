import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

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
      if (res.data.errors) {
        Promise.reject(res.data.errors[0]);
      } else {
        return res.data.data.me;
      }
    })
    .catch(err => showErrorMessage(err.message));
};
