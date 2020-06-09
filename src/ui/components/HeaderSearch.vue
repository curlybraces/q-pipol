<template>
  <q-select
    ref="search"
    dark
    dense
    standout
    use-input
    hide-selected
    class="GL__toolbar-select"
    color="black"
    :stack-label="false"
    label="Search..."
    v-model="searchText"
    :options="filteredOptions"
    @filter="filter"
    style="width: 300px"
  >
    <template v-slot:append>
      <img
        src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg"
      />
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <div class="text-center">
            <q-spinner-pie color="grey-5" size="24px" />
          </div>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        class="GL__select-GL__menu-link"
      >
        <q-item-section side>
          <q-icon name="collections_bookmark" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.label" :lines="2" />
        </q-item-section>
        <q-item-section side :class="{ 'default-type': !scope.opt.type }">
          <q-btn
            outline
            dense
            no-caps
            text-color="blue-grey-5"
            size="12px"
            class="bg-grey-1 q-px-sm"
            :to="scope.opt.to"
          >
            {{ scope.opt.type || 'Jump to' }}
            <q-icon name="subdirectory_arrow_left" size="14px" />
          </q-btn>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { SEARCH_PROJECTS } from '@/graphql/queries';
import { client } from '@/boot/apollo';

export default {
  name: 'HeaderSearch',
  data() {
    return {
      searchText: '',
      options: null,
      filteredOptions: []
    };
  },
  methods: {
    async filter(val, update) {
      if (val === '') {
        update(() => {
          this.filteredOptions = [{ label: 'Type something to search' }];
        });
        return;
      }

      await client
        .query({
          query: SEARCH_PROJECTS,
          variables: {
            search: val
          }
        })
        .then(({ data }) => {
          this.options = data.searchProjects;
        })
        .catch(err => {
          console.log(err.message);
          this.options = [];
        });

      console.log(this.options);

      update(() => {
        this.filteredOptions = [
          ...this.options.map(op => ({
            label: op.title,
            to: `/projects/${op.id}`
          }))
        ];
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 400px !important
    .q-field__append
      display: none

.q-virtual-scroll__content
	width: 400px !important
</style>
