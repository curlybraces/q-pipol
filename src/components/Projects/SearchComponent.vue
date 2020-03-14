<template>
  <q-input
    outlined
    dense
    rounded
    class="q-mb-md"
    clearable
    placeholder="Search in project titles..."
    v-model="searchField"
    :debounce="500"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SearchComponent',
  computed: {
    ...mapState('projects', ['search']),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  methods: {
    ...mapActions('projects', ['setSearch'])
  }
};
</script>
