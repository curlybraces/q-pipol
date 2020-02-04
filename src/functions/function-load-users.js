import { axiosInstance } from "boot/axios";
import { showErrorMessage } from "../functions/function-show-error-message";

export const loadUsers = ({ page = 1 }) => {
  return axiosInstance
    .post("/graphql", {
      query: `query users($page:Int!) {
            users(page:$page) {
              data {
                id
                name
                email
                active
              }
              paginatorInfo {
                currentPage
                lastPage
                total
              }
            }
          }`,
      variables: {
        page: page
      }
    })
    .then(res => {
      return res.data.data;
    })
    .catch(err => showErrorMessage(err.message));
};
