<template>
  <q-card class="fit" bordered flat square>
    <q-img src="statics/masaganang-ani-mataas-na-kita.png">
      <div class="absolute-bottom">
        <div
          class="text-h6"
          v-html="$options.filters.searchHighlight(project.title, search)"
        ></div>
        <div class="text-subtitle2">{{ project.implementingAgency }}</div>
        <q-dialog
          v-model="showEditProject"
          maximized
          persistent
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <edit-project
            :project="project"
            @close="showEditProject = false"
          ></edit-project>
        </q-dialog>

        <q-dialog
          v-model="showReviewProject"
          maximized
          persistent
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <review-project
            :project="project"
            @close="showReviewProject = false"
          ></review-project
          >/>
        </q-dialog>
      </div>
    </q-img>
    <q-separator />
    <q-card-actions align="around">
      <q-btn
        size="12px"
        flat
        dense
        round
        icon="visibility"
        :to="'projects/' + project.id"
      />

      <q-btn
        size="12px"
        flat
        dense
        round
        icon="edit"
        color="green"
        @click="showEditProject = true"
      />

      <q-btn
        size="12px"
        flat
        dense
        round
        icon="rate_review"
        color="secondary"
        @click="showReviewProject = true"
      />

      <q-btn
        size="12px"
        flat
        dense
        round
        icon="delete"
        color="red"
        @click.stop="promptToDelete(project.id)"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
const EditProject = () => import("../../components/EditProject");
const ReviewProject = () => import("../../components/ReviewProject");

export default {
  components: { EditProject, ReviewProject },
  name: "Project",
  props: {
    project: Object,
    id: String
  },
  data() {
    return {
      showEditProject: false,
      showReviewProject: false
    };
  },
  computed: {
    ...mapState("projects", ["search"])
  },
  methods: {
    ...mapActions("projects", ["deleteProject"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm delete",
          message: "Are you sure you want to delete this project?",
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
