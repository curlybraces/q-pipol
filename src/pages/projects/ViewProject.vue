<template>
  <q-page padding>
    <p>View Project</p>

    <q-list bordered separator class="rounded-borders">
      <q-item-label header>General Information</q-item-label>
      <list-item label="Title" :value="project.title" />
      <list-item label="Type" :value="papType" />
      <list-item label="Implementation Bases" :value="project.implementation_bases" />
      <list-item label="Description" :value="project.description" />
      <list-item label="Expected Outputs" :value="project.expected_outputs" />
      <list-item label="Implementation Period" :value="implementation_period" />
      <list-item label="Funding Source" :value="project_funder" />
      <list-item label="Spatial Coverage" :value="spatialCoverage" />
      <list-item label="Categorization" :value="categorization" />
      <list-item label="Total Cost" :value="totalCost" />
    </q-list>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
import ListItem from "../../components/ViewProject/ListItem";

export default {
  components: { ListItem },
  name: "PageViewProject",
  data() {
    return {
      project: {}
    };
  },
  computed: {
    papType() {
      return this.project.pap_type.name;
    },
    implementation_period() {
      return this.project.implementation_start + ' - ' + this.project.implementation_end;
    },
    project_funder() {
      return this.project.funding_source.name + ' > ' + this.project.funding_institution;
    },
    spatialCoverage() {
      return this.project.spatial_coverage.name;
    },
    categorization() {
      return this.project.categorization.name;
    },
    totalCost() {
      return 'PhP ' + Number(this.project.total_cost).toLocaleString();
    }
  },
  methods: {
    editTitle() {
      console.log('edit title');
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
