<template>
  <q-select
    :options="options"
    option-value="id"
    option-label="name"
    hide-dropdown-icon
    use-input
    outlined
    class="col"
    @filter="filterFn"
    v-model="selected"
    :hint="hint"
    ></q-select>
</template>

<script>
import {FETCH_CITY_MUNICIPALITIES_QUERY} from "../constants/graphql";

export default {
  name: "CityMunicipality",
  apollo: {
    city_municipalities: {
      query: FETCH_CITY_MUNICIPALITIES_QUERY
    }
  },
  data() {
    return {
      city_municipalities: [],
      selected: null,
      options: [],
      hint: 'Please type at least 3 characters to search'
    }
  },
  methods: {
    filterFn(val, update) {
      const city_municipalities = this.city_municipalities;
      setTimeout(() => {
        update(() => {
          if (val.length > 3) {
            const needle = val.toLowerCase()
            this.options = city_municipalities.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
          } else {
            this.options = [];
          }
        })
      }, 500)
    }
  }
}
</script>
