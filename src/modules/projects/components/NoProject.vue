<template>
  <div>
    <q-banner dense>
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No projects added yet.
      <template v-slot:action>
        <q-btn flat color="primary" label="ADD PROJECT" to="/projects/add" />
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {
  name: 'NoProject'
};
</script>
