import { axiosInstance } from "../boot/axios";
import { showErrorMessage } from "./function-show-error-message";

export const updateProfile = ({ name, operating_unit, unit, position }) => {
  console.log(name, operating_unit, unit, position);
  return axiosInstance
    .post("/graphql", {
      query: `mutation (
        $name: String!
        $operating_unit: Int!
        $unit: String!
        $position: String!
      ) {
        updateProfile(
          name:$name
          operating_unit_id: $operating_unit
          unit: $unit
          position: $position
        )
      }`,
      variables: {
        name: name,
        operating_unit: operating_unit,
        unit: unit,
        position: position
      }
    })
    .then(res => {
      if (res.data.errors) {
        Promise.reject(res.data.errors[0]);
      } else {
        return true;
      }
    })
    .catch(err => showErrorMessage(err.message));
};
