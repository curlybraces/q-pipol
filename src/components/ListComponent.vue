<template>
  <q-list bordered separator class="rounded-borders">
    <q-item v-for="item in items" :key="item.id">
      <q-item-section class="gt-xs" avatar>
        <q-icon :name="item.icon" color="black" size="34px" />
      </q-item-section>

      <q-item-section class="col-2 gt-sm">
        <q-item-label class="q-mt-sm"></q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ item.title }}</span>
        </q-item-label>
        <q-item-label caption lines="2">
          {{ item.description }}
        </q-item-label>
        <q-item-label caption lines="1">
          [ {{ item.implementation_start + " - " + item.implementation_end }} ]
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label> PhP {{ item.total_cost }} </q-item-label>
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
            :to="'/projects/' + item.id"
          />
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="promptToDelete(item.id)"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "ListComponent",
  props: {
    items: Array
  },
  data() {
    return {};
  },
  methods: {
    promptToDelete(id) {
      alert(id);
    }
  }
};
</script>

<style></style>
