import axios from "axios";
import { Loading, Dialog } from "quasar";
import { firebaseAuth } from "../boot/firebase";

export const createProject = ({
  title,
  classification,
  implementing_agency,
  description,
  expected_outputs,
  spatial_coverage,
  regions,
  provinces,
  implementation_start_date,
  implementation_end_date,
  total_project_cost,
  status_update
}) => {
  Loading.show();

  return axios
    .post("/graphql", {
      query: `mutation create_project(
          $title:String!,
          $classification:String,
          $implementing_agency: String,
          $description: String,
          $expected_outputs: String,
          $spatial_coverage: String,
          $regions: [String],
          $provinces: [String],
          $implementation_start_date: String,
          $implementation_end_date: String,
          $total_project_cost: Float,
          $status_update: String,
          $created_by:String!
          ) {
        create_project(
          title:$title,
          classification:$classification,
          implementing_agency:$implementing_agency,
          description:$description,
          expected_outputs:$expected_outputs,
          spatial_coverage:$spatial_coverage,
          regions:$regions,
          provinces:$provinces,
          implementation_start_date:$implementation_start_date,
          implementation_end_date:$implementation_end_date,
          total_project_cost:$total_project_cost,
          status_update:$status_update,
          created_by:$created_by
          ) {
          id
        }
      }`,
      variables: {
        title: title,
        classification: classification,
        implementing_agency: implementing_agency,
        description: description,
        expected_outputs: expected_outputs,
        spatial_coverage: spatial_coverage,
        regions: regions,
        provinces: provinces,
        implementation_start_date: implementation_start_date,
        implementation_end_date: implementation_end_date,
        total_project_cost: total_project_cost,
        status_update: status_update,
        created_by: firebaseAuth.currentUser.email
      }
    })
    .then(res => {
      return res.data.data.create_project.id;
    })
    .catch(err => {
      Dialog.create({
        title: "Error",
        message: err.message
      });
    })
    .finally(() => {
      Loading.hide();
    });
};
