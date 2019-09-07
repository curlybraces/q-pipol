<template>
  <q-item>
    <q-item-section class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">
        {{ project.implementingAgency }}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label
        lines="1"
        v-html="$options.filters.searchHighlight(project.title, search)"
      >
      </q-item-label>
      <q-item-label caption lines="2">
        {{ project.description }}
      </q-item-label>
      <q-item-label caption lines="1">
        [
        {{ project.implementationStart + " - " + project.implementationEnd }}
        ]
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label>
        PhP {{ Number(project.totalProjectCost).toLocaleString() }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
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
      </div>
    </q-item-section>

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
      <review-project :project="project" @close="showReviewProject = false">
      </review-project>
      />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditProject from "../../components/EditProject";
import ReviewProject from "../../components/ReviewProject";

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
