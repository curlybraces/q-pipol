<template>
  <div class="q-px-lg">
    <p>Project History</p>
    <q-separator />
    <q-timeline color="secondary">
      <template v-for="item in backups">
        <q-timeline-entry :key="item.id" :subtitle="item.created_at">
          <template v-slot:title>
            {{ item.changes }} <small>by {{ item.modified_by.name }}</small>
          </template>
          <template v-slot:default>
            {{ item.data }}
          </template>
        </q-timeline-entry>
      </template>
    </q-timeline>
  </div>
</template>

<script>
export default {
  name: "ProjectHistory",
  props: {
    backups: Array
  }
};
</script>
