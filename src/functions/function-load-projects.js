import { axiosInstance } from "boot/axios";
import { Loading } from "quasar";
import { showErrorMessage } from "./function-show-error-message";

export const loadProjects = ({
  current_page = 1,
  per_page = 12,
  deleted = false
}) => {
  Loading.show();
  return axiosInstance
    .post("/graphql", {
      query: `query projects($current_page: Int, $per_page: Int, $deleted: Boolean) {
        projects(current_page: $current_page, per_page: $per_page, deleted: $deleted) {
          data {
            id
            title
            operating_unit {
              name
              image
            }
            description
            total_project_cost
          }
          total
          per_page
          current_page
          last_page
        }
      }`,
      variables: {
        current_page: current_page,
        per_page: per_page,
        deleted: deleted
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => showErrorMessage(err.message))
    .finally(() => Loading.hide());
};
