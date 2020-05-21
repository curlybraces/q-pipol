<template>
  <dialog-container v-model="show" title="Search Projects">
    <div class="q-pa-sm q-gutter-sm">
      <q-input
        dense
        type="text"
        v-model="search"
        outlined
        @keyup.enter="handleSearchProjects"
      >
        <template v-slot:append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>

      <q-btn
        label="search"
        color="primary"
        @click="handleSearchProjects"
      ></q-btn>
    </div>

    <div>
      <template v-if="loading">
        <q-inner-loading :showing="loading">
          <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
          Searching...
        </q-inner-loading>
      </template>

      <template v-else>
        {{ error }}
        <q-list>
          <template v-if="!searchProjects.length">
            <q-item-label header>No project found.</q-item-label>
          </template>
          <template v-else>
            <q-item-label header
              >Search Results (maximum of 10 only)</q-item-label
            >
            <q-item
              v-for="({ id, title }, index) in searchProjects"
              :key="id"
              clickable
              :to="`/projects/${id}`"
            >
              <q-item-section>
                <q-item-label
                  >{{ index + 1 + '.' }}
                  <span
                    v-html="$options.filters.searchHighlight(title, search)"
                  ></span
                ></q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </template>
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from '@/ui/dialogs/DialogContainer';

import { projectService } from '@/services/project.service';

export default {
  components: { DialogContainer },
  name: 'SearchProject',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      loading: false,
      searchProjects: {},
      error: ''
    };
  },
  computed: {
    show: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    handleSearchProjects() {
      console.log('search projects');
      const search = this.search ? this.search.toLowerCase() : '';
      if (search) {
        this.loading = true;

        const payload = {
          search: search
        };

        // call search function and assign result to searchProjects
        // the handleResponse returns the response.data so just have to call
        // the name of the original function
        // which is nice
        projectService
          .search(payload)
          .then(res => (this.searchProjects = res.searchProjects))
          .then(() => (this.loading = false));
      }
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, 'ig');
        return value.replace(searchRegExp, match => {
          return "<span class='bg-yellow-6'>" + match + '</span>';
        });
      }
      return value;
    }
  }
};
</script>
