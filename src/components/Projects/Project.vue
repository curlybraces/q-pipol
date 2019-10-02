<template>
  <q-item clickable v-ripple @click="goTo(project.id)">
    <q-item-section avatar top>
      <q-avatar>
        <q-img src="statics/masaganang-ani-mataas-na-kita.png" />
      </q-avatar>
    </q-item-section>

    <q-item-section top class="col-1 gt-sm">
      <q-item-label class="q-mt-sm">{{
        project.implementingAgency
      }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="2">
        <span class="text-weight-medium">
          <div
            v-html="$options.filters.searchHighlight(project.title, search)"
          ></div>
        </span>
        <q-badge
          color="red"
          v-if="project.classification == 'Project'"
          label="project"
        />
        <q-badge
          color="blue"
          v-if="project.classification == 'Program'"
          label="program"
        />
      </q-item-label>
      <q-item-label caption lines="2">
        {{ project.description }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <div class="text-grey-8">
        <q-btn
          size="12px"
          dense
          flat
          round
          icon="edit"
          @click.stop="showUpdateStatus = !showUpdateStatus"
        />
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click.stop="promptToDelete(project.id)"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showUpdateStatus" persistent v-close-popup>
      <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Update Project Status</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-card-section class="q-pa-md">
          Title: <span class="text-weight-bold">{{ project.title }}</span>
          <q-select
            outlined
            v-model="status"
            class="q-mt-sm"
            dense
            :options="[
              {
                value: 'new',
                label: 'New'
              },
              {
                value: 'encoded',
                label: 'Encoded'
              },
              {
                value: 'reviewed',
                label: 'Reviewed'
              },
              {
                value: 'finalized',
                label: 'Finalized'
              }
            ]"
            emit-value
          >
          </q-select>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            color="primary"
            label="Save"
            @click="updateStatus(project.id)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapState, mapActions } from "vuex";
// const EditProject = () => import("../../components/EditProject");
// const ReviewProject = () => import("../../components/ReviewProject");

export default {
  // components: { EditProject, ReviewProject },
  name: "Project",
  props: {
    project: Object,
    id: String
  },
  data() {
    return {
      showEditProject: false,
      showReviewProject: false,
      showUpdateStatus: false,
      status: ""
    };
  },
  computed: {
    ...mapState("projects", ["search"])
  },
  methods: {
    ...mapActions("projects", ["deleteProject", "updateProjectStatus"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm delete",
          message: "Are you sure you want to permanently delete this project?",
          persistent: true,
          ok: {
            color: "primary",
            flat: false
          },
          cancel: true
        })
        .onOk(() => {
          this.deleteProject(id);
        });
    },
    goTo(id) {
      this.$router.push("projects/" + id);
    },
    updateStatus(id) {
      this.updateProjectStatus({
        id: id,
        status: this.status
      });
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        return value.replace(searchRegExp, match => {
          return "<span class='bg-yellow-6'>" + match + "</span>";
        });
      }
      return value;
    }
  }
};
</script>
