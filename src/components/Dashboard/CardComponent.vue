<template>
  <q-card square class="bg-primary">
    <q-card-section>
      <q-item dense>
        <q-item-section avatar>
          <q-avatar :icon="icon" color="primary" class="text-white" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Projects</q-item-label>
        </q-item-section>

        <q-item-section top side>
          <span class="text-h4">10</span>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-space />
      <q-btn flat icon="chevron_right" dense label="View details" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CardComponent",
  props: ["icon"]
};
</script>
