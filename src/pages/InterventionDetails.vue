<template>
  <q-page padding>
    <div>Intervention Details</div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "InterventionDetails",
  data() {
    return {
      intervention: {}
    };
  },
  created() {
    axios
      .post("http://localhost:8000/graphql", {
        query: `query
            intervention($id: Int!) {
              intervention(id: $id) {
                id
                intervention
              }
            }
          `,
        variables: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        const {
          data: {
            data: {
              intervention: { id, intervention }
            }
          }
        } = res;
        console.log(id, intervention);
      })
      .catch(err => console.log(err.message));
  }
};
</script>
