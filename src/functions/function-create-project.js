import axios from "boot/axios";
import { showErrorMessage } from "./function-show-error-message";
import { firebaseAuth } from "boot/firebase";
import { Loading } from "quasar";

export const createProject = ({
  classification,
  title,
  operating_unit,
  description,
  expected_outputs,
  spatial_coverage,
  regions,
  provinces,
  implementation_start_date,
  implementation_end_date,
  total_project_cost,
  status
}) => {
  Loading.show();

  var projectCost = parseFloat(total_project_cost.replace(/[^0-9.-]/g, ""));
  return axios
    .post("/graphql", {
      query: `mutation create_project(
        $classification: String,
        $title: String!,
        $operating_unit_id: Int,
        $description: String,
        $outcomes: String,
        $expected_outputs: String,
        $spatial_coverage: String,
        $regions: [Int],
        $provinces: [Int],
        $implementation_start_date: String,
        $implementation_end_date: String,
        $total_project_cost: Float,
        $status_update: String,
        $created_by: String!
      ) {
        create_project(
          classification: $classification,
          title: $title,
          operating_unit_id: $operating_unit_id,
          description: $description,
          outcomes: $outcomes,
          expected_outputs: $expected_outputs,
          spatial_coverage: $spatial_coverage,
          regions: $regions,
          provinces: $provinces,
          implementation_start_date: $implementation_start_date,
          implementation_end_date: $implementation_end_date,
          total_project_cost: $total_project_cost,
          status_update: $status_update,
          created_by: $created_by
        ) {
          id
        }
      }`,
      variables: {
        classification: classification,
        title: title,
        operating_unit_id: operating_unit,
        description: description,
        expected_outputs: expected_outputs,
        spatial_coverage: spatial_coverage,
        regions: regions,
        provinces: provinces,
        implementation_start_date: implementation_start_date,
        implementation_end_date: implementation_end_date,
        total_project_cost: projectCost,
        status_update: status,
        created_by: firebaseAuth.currentUser.email
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      showErrorMessage(err.message);
    })
    .finally(() => Loading.hide());
};
