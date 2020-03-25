<template>
  <div class="row q-py-md items-center">
    <div class="col-6">
      <div class="row q-gutter-sm">
        <q-select
          class="col"
          label="Sort By"
          filled
          v-model="sortCriteria"
          :options="criteria"
          emit-value
          map-options
        />
        <q-select
          label="Order"
          class="col"
          filled
          :options="directions"
          v-model="sortDirection"
          emit-value
          map-options
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SortMenu',
  computed: {
    ...mapState('users', ['sort', 'direction']),
    sortDirection: {
      get() {
        return this.direction;
      },
      set(val) {
        this.setDirection(val);
      }
    },
    sortCriteria: {
      get() {
        return this.sort;
      },
      set(val) {
        this.setSort(val);
      }
    }
  },
  data() {
    return {
      criteria: [
        { value: 'name', label: 'Name' },
        { value: 'role', label: 'Role' },
        { value: 'operating_unit', label: 'Operating Unit' }
      ],
      directions: [
        { value: 'asc', label: 'Ascending (A-Z)' },
        { value: 'desc', label: 'Descending (Z-A)' }
      ]
    };
  },
  methods: {
    ...mapActions('users', ['setDirection', 'setSort'])
  }
};
</script>
