import { Loading } from "quasar";
import axios from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const loadInterventions = ({ page = 2, limit = 12 }) => {
  Loading.show();

  return axios
    .post("/graphql", {
      query: `query interventions($limit: Int!, $page: Int!, $commodityGroup: [String!], $region: [String!], $program: [String!], $sortBy: String, $dir: String) {
              interventions(limit:$limit,page:$page,commodityGroup:$commodityGroup,region:$region,program:$program,sortBy:$sortBy,dir:$dir) {
                data {
                  id
                  commodityGroup
                  intervention
                  program
                  investmentTotal
                }
                total
                per_page
                current_page
              }
            }`,
      variables: {
        limit: limit,
        page: page
        // region: selectedRegions,
        // program: selectedPrograms,
        // commodityGroup: selectedCommodities,
        // sortBy: sortBy,
        // dir: dir
      }
    })
    .then(res => {
      // const {
      //   data: {
      //     data: {
      //       interventions: { data, total, per_page }
      //     }
      //   }
      // } = res;

      return res;
    })
    .catch(err => {
      showErrorMessage(err.message);
    })
    .finally(() => {
      Loading.hide();
    });
};
