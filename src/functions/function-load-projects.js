import axios from "boot/axios";
import { Loading } from "quasar";

export const loadProjects = () => {
  Loading.show();
  return axios
    .post("/graphql", {
      query: `query projects {
        projects {
          data {
            id
            title
            implementing_agency
          }
          total
          per_page
          current_page
          last_page
        }
      }`
    })
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err.message))
    .finally(() => Loading.hide());
};
