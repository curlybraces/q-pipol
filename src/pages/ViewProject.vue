<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="row">
      <q-card square class="col q-mt-sm q-pa-md q-gutter-y-md">
        <div class="row text-weight-light text-uppercase">
          General Information
          <q-space />
          <q-btn
            outline
            dense
            icon="edit"
            label="Edit Project"
            @click="readonly = !readonly"
          />
        </div>

        <div class="row q-col-gutter-x-md">
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="25px" color="primary" />
          </q-inner-loading>
          <div class="col">
            <q-input v-model="project.title" />
          </div>
        </div>

        <q-card-actions class="q-pa-none" align="right">
          <q-btn label="Next" color="primary" icon-right="chevron_right" />
        </q-card-actions>
      </q-card>
    </div>
    <pre>
      {{ project }}
    </pre>
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
      project: {}
    };
  },
  created() {
    this.$loading = true;
    axiosInstance
      .post("/graphql", {
        query: `query project {
          project(id:8) {
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
      }`
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
