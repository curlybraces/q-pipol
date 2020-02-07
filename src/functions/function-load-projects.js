import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const loadProjects = ({ current_page = 1 }) => {
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
      if (res.data.errors) {
        return Promise.reject(res.data.errors[0]);
      } else {
        return res.data.data.projects;
      }
    })
    .catch(err => showErrorMessage(err.message));
};
