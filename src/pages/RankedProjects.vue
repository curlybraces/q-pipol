<template>
  <q-page padding>
    <q-card :dark="dark">
      <q-toolbar class="bg-primary text-white">
        <q-avatar>
          <q-icon name="sort" />
        </q-avatar>
        <q-toolbar-title>Ranked Projects</q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-table
          :grid="$q.screen.lt.md"
          :data="projects"
          :columns="columns"
          row-key="projectTitle"
          :loading="loading"
          wrap-cells
        >
          <template v-slot:item="props">
            <div
              class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            >
              <q-card>
                <q-item>
                  <q-item-section avatar class="col-1">
                    <q-avatar color="primary" class="text-white" size="md">
                      {{ parseFloat(props.row.overall.toFixed(1)) }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="col">
                    <q-item-label header>
                      {{ props.key }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { firebaseDb } from "boot/firebase";

export default {
  name: "RankedProjects",
  data() {
    return {
      loading: false,
      projects: [],
      columns: [
        {
          name: "projectTitle",
          label: "Project Title",
          field: row => row.projectTitle,
          align: "left"
        },
        {
          name: "criteria1",
          label: "Criteria 1",
          field: "criteria1"
        },
        {
          name: "criteria2",
          label: "Criteria 2",
          field: "criteria2"
        },
        {
          name: "criteria3",
          label: "Criteria 3",
          field: "criteria3"
        },
        {
          name: "criteria4",
          label: "Criteria 4",
          field: "criteria4"
        },
        {
          name: "criteria5",
          label: "Criteria 5",
          field: "criteria5"
        },
        {
          name: "criteria6",
          label: "Criteria 6",
          field: "criteria6"
        },
        {
          name: "criteria7",
          label: "Criteria 7",
          field: "criteria7"
        },
        {
          name: "overall",
          label: "Overall Rating",
          field: "overall",
          format: val => parseFloat(val).toFixed(2),
          sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10)
        },
        {
          name: "ratedBy",
          label: "Rated By",
          field: "ratedBy"
        }
      ]
    };
  },
  computed: {
    ...mapState("settings", ["dark"])
  },
  methods: {
    loadRankedProjects() {
      this.loading = true;
      let ratingRef = firebaseDb.collection("ratings");
      ratingRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.exists) {
            this.projects.push(doc.data().rating);
          }
        });
        this.loading = false;
      });
    }
  },
  created() {
    this.loadRankedProjects();
  }
};
</script>
