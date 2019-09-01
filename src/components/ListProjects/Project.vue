<template>
  <q-item clickable>
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
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="edit"
          color="green"
          :to="'/projects/' + project.id"
        />

        <q-btn
          class="gt-xs"
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
  </q-item>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Project",
  props: {
    project: Object,
    id: String
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
