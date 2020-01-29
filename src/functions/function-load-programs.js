import { axiosInstance } from "boot/axios";

export const loadPrograms = () => {
  axiosInstance
    .post("/graphql", {
      query: ``,
      variables: {}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
    .finally(() => console.log("done"));
};
