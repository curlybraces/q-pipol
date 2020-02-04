import { axiosInstance } from "boot/axios";
import { Loading } from "quasar";
import { showErrorMessage } from "./function-show-error-message";

export const loadProjects = ({ current_page = 1 }) => {
  Loading.show();
  return axiosInstance
    .post("/graphql", {
      query: `query projects($currentPage: Int) {
        projects(page: $currentPage) {
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
          paginatorInfo {
            currentPage
            total
            perPage
            lastPage
          }
        }
      }`,
      variables: {
        currentPage: current_page
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => showErrorMessage(err.message))
    .finally(() => Loading.hide());
};
