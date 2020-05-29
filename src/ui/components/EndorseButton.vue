<template>
  <q-btn flat round icon="shopping_cart" class="text-grey-6">
    <q-badge floating color="red">
      {{ selectedProjects.length }}
    </q-badge>
    <q-menu max-width="400px">
      <q-list>
        <q-item v-for="project in selectedProjects" :key="project.id">
          <q-item-section avatar></q-item-section>
          <q-item-section>
            <q-item-label :lines="2">{{ project.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          class="text-center text-weight-bold"
          clickable
          to="/projects/endorse"
        >
          <q-item-section>
            <q-item-label>Endorse</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: 'EndorseButton',
  computed: {
    selectedProjects() {
      return this.$store.state.projects.selectedProjects;
    }
  }
};
</script>
