import axios from "boot/axios";
import { firebaseAuth } from "boot/firebase";
import { Loading } from "quasar";

export const createProject = ({
  classification,
  title,
  implementing_agency,
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
  axios
    .post("/graphql", {
      query: `mutation create_project(
        $classification: String,
        $title: String!,
        $implementing_agency: String,
        $description: String,
        $expected_outputs: String,
        $spatial_coverage: String,
        $regions: [Int],
        $provinces: [Int],
        $implementation_start_date: String,
        $implementation_end_date: String,
        $total_project_cost: Float,
        $status: String,
        $created_by: String!
      ) {
        create_project() {
          id
        }
      }`,
      variables: {
        classification: classification,
        title: title,
        implementing_agency: implementing_agency,
        description: description,
        expected_outputs: expected_outputs,
        spatial_coverage: spatial_coverage,
        regions: regions,
        provinces: provinces,
        implementation_start_date: implementation_start_date,
        implementation_end_date: implementation_end_date,
        total_project_cost: total_project_cost,
        status: status,
        created_by: firebaseAuth.currentUser.email
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.message))
    .finally(() => Loading.hide());
};
