<template>
  <q-item clickable v-ripple @click="goTo(project.id)">
    <q-item-section avatar top>
      <q-avatar>
        <q-img src="statics/masaganang-ani-mataas-na-kita.png" />
      </q-avatar>
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">GitHub</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="2">
        <span class="text-weight-medium">
          <div
            v-html="$options.filters.searchHighlight(project.title, search)"
          ></div>
        </span>
      </q-item-label>
      <q-item-label caption lines="1">
        @rstoenescu in #1: > The build system
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8">
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
