<template>
  <div class="row q-py-md items-center">
    <div class="col-xl-6 col-lg-8 col-md-10 col-sm-10 col-xs-10">
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
    <div class="col-xl-6 col-lg-4 col-md-2 col-sm-2 col-xs-2 text-right">
      <q-circular-progress
        show-value
        font-size="12px"
        :value="percentLoaded"
        size="50px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      >
        {{ percentLoaded }}%
        <q-tooltip>
          Loaded projects
        </q-tooltip>
      </q-circular-progress>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SortMenu',
  computed: {
    ...mapState('projects', ['sort', 'direction', 'projects', 'pageInfo']),
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
    },
    percentLoaded() {
      return Math.ceil(Object.keys(this.projects).length/this.pageInfo.total * 100,0);
    }
  },
  data() {
    return {
      criteria: [
        { value: 'title', label: 'Title' },
        { value: 'created_at', label: 'Date Added' },
        { value: 'total_project_cost', label: 'Total Cost' }
      ],
      directions: [
        { value: 'asc', label: 'Ascending (A-Z)' },
        { value: 'desc', label: 'Descending (Z-A)' }
      ]
    };
  },
  methods: {
    ...mapActions('projects', ['setDirection', 'setSort'])
  }
};
</script>
