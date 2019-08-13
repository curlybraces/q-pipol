<template>
  <q-page padding>
    <p>View Project</p>

    <q-list bordered separator class="rounded-borders">
      <q-item-label header class="bg-primary text-white">General Information</q-item-label>
      <list-item label="Title" :value="project.title" @click="editTitle" :disabled="true"/>
      <list-item label="Type" :value="papType" @click="changePapType" />
      <list-item
        label="Implementation Bases"
        :value="project.implementation_bases"
        @click="updateImplementationBases"
      />
      <list-item label="Description" :value="project.description" />
      <list-item label="Expected Outputs" :value="project.expected_outputs" />
      <list-item label="Implementation Period" :value="implementation_period" />
      <list-item label="Funding Source" :value="project_funder" />
      <list-item label="Spatial Coverage" :value="spatialCoverage" />
      <list-item label="Categorization" :value="categorization" />
      <list-item label="Total Cost" :value="totalCost" />
    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white">Financial Information</q-item-label>
      <list-item label="Implementation Mode" :value="project.implementation_mode.name" />
      <list-item label="" />
    </q-list>

    <q-list bordered separator class="rounded-borders q-mt-md">
      <q-item-label header class="bg-primary text-white">Physical &amp; Financial Status</q-item-label>
      <list-item label="Updates" :value="project_updates" />
      <list-item label="Financial Accomplishments" />
    </q-list>

    <update-implementation-bases-dialog/>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
import ListItem from "../../components/ViewProject/ListItem";
import UpdateImplementationBasesDialog from "../../components/ViewProject/UpdateImplementationBasesDialog";

export default {
  components: { ListItem, UpdateImplementationBasesDialog },
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
      return (
        this.project.implementation_start +
        " - " +
        this.project.implementation_end
      );
    },
    project_funder() {
      return (
        this.project.funding_source.name +
        " > " +
        this.project.funding_institution
      );
    },
    spatialCoverage() {
      return this.project.spatial_coverage.name;
    },
    categorization() {
      return this.project.categorization.name;
    },
    totalCost() {
      return "PhP " + Number(this.project.total_cost).toLocaleString();
    },
    project_updates() {
      if (this.project.updates) {
        return this.project.updates + " (as of " + this.project.as_of + " )"
      } else {
        return "No updates yet."
      }
    }
  },
  methods: {
    editTitle() {
      console.log("edit title");
      this.$q.notify({
        message: "I got clicked!",
        position: "top"
      });
    },
    changePapType() {
      this.$q
        .bottomSheet({
          message: "Program or Project",
          grid: true,
          actions: [
            {
              label: "Program",
              icon: "brightness_high"
            },
            {
              label: "Project",
              icon: "access_time"
            }
          ]
        })
        .onOk(action => {
          console.log("Action chosen: ", action.label);
        });
    },
    updateImplementationBases() {
      this.$q.dialog({
        message: "Implementation Bases",
        persistent: true
      });
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
