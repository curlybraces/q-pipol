<template>
  <transition
    appear
    leave-active-class="animated zoomOut"
  >
    <q-item @click="goTo" clickable>
      <q-item-section avatar>
        <q-avatar color="white">
          <q-img
            v-if="operating_unit != null"
            :src="`statics/agency_logos/${operating_unit.image}`"
          />
          <q-img v-else src="statics/agency_logos/da-co.svg" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="col-2 gt-sm">
        <q-item-label>
          {{ operating_unit != null ? operating_unit.name : null }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label v-html="$options.filters.searchHighlight(title,search)"></q-item-label>
        <q-item-label caption :lines="2">{{ description }}</q-item-label>
      </q-item-section>
      <q-item-section class="col-2 text-right">
        <q-item-label>{{ total_project_cost | currency }} </q-item-label>
      </q-item-section>
      <q-item-section class="col-1" side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="edit"
            color="blue"
            @click.stop="editProject"
          />
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            color="red"
            @click.stop="promptDelete(id)"
          />
        </div>
      </q-item-section>
    </q-item>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Dialog } from "quasar";

export default {
  name: "ProjectItem",
  props: ["id", "title", "operating_unit", "total_project_cost", "description"],
  computed: {
    ...mapState("projects",["search"])
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
    },
    currency(value) {
      return "PhP " + value.toLocaleString();
    }
  },
  methods: {
    ...mapActions("projects",["deleteProject"]),
    goTo() {
      this.$emit("goTo");
    },
    promptDelete(id) {
      Dialog.create({
        title: "Delete Project",
        message: "Are you sure you want to move the project to trash?",
        cancel: true,
        transitionHide: "fade",
        transitionShow: "fade"
      }).onOk(() => {
        this.deleteProject(id);
      });
    },
    editProject() {
      this.$emit("editProject");
    }
  }
};
</script>
