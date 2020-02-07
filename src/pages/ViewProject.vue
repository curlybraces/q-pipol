<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <q-card square class="col q-mt-sm q-pa-md q-gutter-y-md">
        <pre>
          {{ project }}
        </pre>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from "boot/axios";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: {
    PageBreadcrumbs
  },
  name: "ViewProject",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Projects",
          url: "/pip"
        },
        {
          title: "View Project"
        }
      ],
      loading: true,
      readonly: true,
      title: "Title",
      project: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.$loading = true;
    axiosInstance
      .post("/graphql", {
        query: `query project($id: ID!) {
          project(id:$id) {
            id
            title
            operating_unit {
              name
            }
            spatial_coverage_id
            regions {
              id
            }
            total_project_cost
          }
        }`,
        variables: {
          id: this.id
        }
      })
      .then(res => {
        this.project = Object.assign({}, res.data.data.project);
        this.loading = false;
      });
  },
  mounted() {
    this.loading = true;
  }
};
</script>
