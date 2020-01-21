import axios from "boot/axios";
import { Loading } from "quasar";

export const loadProjects = ({ current_page = 1 }) => {
  Loading.show();
  return axios
    .post("/graphql", {
      query: `query projects($current_page: Int) {
        projects(current_page: $current_page) {
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
      }`,
      variables: {
        current_page: current_page
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err.message))
    .finally(() => Loading.hide());
};
