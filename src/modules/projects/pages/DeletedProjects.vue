<template>
  <q-page>
    <page-title title="Deleted Projects" />
    <search-component />
    <div class="q-pa-sm">
      <q-card class="fit bg-grey-1">
        <div class="row q-pa-sm items-center">
          <q-avatar>
            <q-icon name="delete" color="primary" />
          </q-avatar>
          <span
            class="gt-xs text-primary text-h6 text-weight-bolder text-uppercase"
          >
            Deleted Projects</span
          >
          <q-space />
          <span class="gt-sm">Sort by:</span>
          <q-select
            style="min-width: 200px;"
            class="q-ml-sm"
            dense
            outlined
            v-model="sort"
            :options="sortOptions"
            @input="sortData"
            emit-value
            map-options
          ></q-select>
        </div>
        <q-separator spaced />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle';

export default {
  components: {
    PageTitle
  },
  name: 'PageDeletedProjects',
  data() {
    return {
      projects: [],
      current_page: 1
    };
  },
  computed: {
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
    promptRestore() {
      //
    }
  },
  filters: {
    currency(value) {
      return 'PhP ' + value.toLocaleString();
    }
  }
};
</script>

<style></style>
