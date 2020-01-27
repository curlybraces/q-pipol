<template>
  <q-item @click="goTo" clickable>
    <q-item-section avatar>
      <q-avatar color="white">
        <q-img
          v-if="operating_unit != null"
          :src="`statics/agency_logos/${operating_unit.image}.svg`"
        />
        <q-img v-else src="statics/agency_logos/da-co.svg" />
      </q-avatar>
    </q-item-section>
    <q-item-section class="col-2">
      <q-item-label>
        {{ operating_unit != null ? operating_unit.name : null }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption :lines="2">{{ description }}</q-item-label>
    </q-item-section>
    <q-item-section class="col-1" top side>
      <q-item-label>{{ total_project_cost | currency }} </q-item-label>
      <q-item-label>
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="delete"
          color="red"
          @click.stop="promptDelete"
        />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "ProjectItem",
  props: ["id", "title", "operating_unit", "total_project_cost", "description"],
  filters: {
    currency(value) {
      return "PhP " + value.toLocaleString();
    }
  },
  methods: {
    goTo() {
      this.$emit("goTo");
    },
    promptDelete() {
      this.$emit("promptDelete");
    }
  }
};
</script>
