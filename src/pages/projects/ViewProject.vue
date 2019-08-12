<template>
  <q-page padding>
    <p>View Project</p>

    <card-component title="General Information">
      <template v-slot:action>

      </template>
      <template v-slot:content>
        <div class="q-gutter-y-sm">
          <div class="row items-start">
            <div class="col-sm-3">
              Title:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.title }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Type:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.pap_type.name }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Implementation Bases:
            </div>
            <div class="col-sm-9 text-weight-bold">
              <span
                v-for="item in project.implementation_bases"
                :key="item.label"
              >
                {{ item.name }}
              </span>
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Description:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.description }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Expected Outputs:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.expected_outputs }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Implementation Period:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{
                project.implementation_start +
                  " - " +
                  project.implementation_end
              }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Funding Source:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.funding_source.label }} > {{ project.funding_institution }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Spatial Coverage:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.spatial_coverage.label }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Categorization:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.categorization.label }}
            </div>
          </div>

          <div class="row items-start">
            <div class="col-sm-3">
              Total Cost:
            </div>
            <div class="col-sm-9 text-weight-bold">
              {{ project.total_cost | monetize }}
            </div>
          </div>
        </div>
      </template>
    </card-component>

      <card-component title="General Information">
          <template v-slot:action>

          </template>
          <template v-slot:content>
            <q-list bordered separator class="rounded-borders">
              <q-item-label header>General Information</q-item-label>
              <list-item label="Title" :value="project.title" />
              <list-item label="Type" :value="project.pap_type.name" />
              <list-item label="Implementation Bases" :value="project.implementation_bases" />
              <list-item label="Description" :value="project.description" />
              <list-item label="Expected Outputs" :value="project.expected_outputs" />
              <list-item label="Implementation Period" :value="implementation_period" />
              <list-item label="Funding Source" :value="project_funder" />
              <list-item label="Spatial Coverage" :value="spatialCoverage" />
              <list-item label="Categorization" :value="categorization" />
              <list-item label="Total Cost" :value="project.total_cost" />
            </q-list>
          </template>
      </card-component>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
import CardComponent from "../../components/UI/CardComponent";
import ListItem from "../../components/ViewProject/ListItem";

export default {
  components: { CardComponent, ListItem },
  name: "PageViewProject",
  data() {
    return {
      project: {}
    };
  },
  computed: {
    implementation_period() {
      return this.project.implementation_start + ' - ' + this.project.implementation_end;
    },
    project_funder() {
      return this.project.funding_source.label + ' > ' + this.project.funding_institution;
    },
    spatialCoverage() {
      return this.project.spatial_coverage.label;
    },
    categorization() {
      return this.project.categorization.label;
    }
  },
  filters: {
    monetize(val) {
      return Number(val).toLocaleString();
    }
  },
  mounted() {
    this.$axios
      .get("/projects/" + this.$route.params.id)
      .then(res => {
        this.project = res.data;
      })
      .catch(e => {
        Notify.create({
          message: e.message,
          color: "negative",
          position: "top"
        });
      });
  }
};
</script>
