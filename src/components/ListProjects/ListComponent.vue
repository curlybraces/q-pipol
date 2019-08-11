<template>
  <div>
    <q-list bordered separator class="rounded-borders">
      <q-item
        v-for="item in items"
        :key="item.id"
        @click="goTo(item.id)"
        clickable
      >
        <q-item-section class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">
            {{ item.operating_unit.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label
            lines="1"
            v-html="$options.filters.searchHighlight(item.title, search)"
          >
          </q-item-label>
          <q-item-label caption lines="2">
            {{ item.description }}
          </q-item-label>
          <q-item-label caption lines="1">
            [
            {{ item.implementation_start + " - " + item.implementation_end }} ]
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>
            PhP {{ Number(item.total_cost).toLocaleString() }}
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
              :to="'/projects/' + item.id"
            />
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
              color="red"
              @click.stop="promptToDelete(item.id)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ListComponent",
  props: {
    items: Array
  },
  data() {
    return {
      prompt: false,
      changes: ""
    };
  },
  computed: {
    ...mapState("projects", ["search"]),
    required() {
      return this.changes.trim() !== "";
    }
  },
  methods: {
    ...mapActions("projects", ["deleteProject"]),
    goTo(id) {
      this.$router.push("/projects/" + id);
    },
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
          this.deleteProject({ id: id });
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

<style></style>
