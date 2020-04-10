<template>
  <q-list>
    <q-item>
      <single-select
        v-model="spatial_coverage_id"
        label="Spatial Coverage"
        :dense="dense"
        :options-dense="dense"
        :options="spatial_coverages"
      />
    </q-item>

    <q-item>
      <multi-select
        v-model="regions"
        label="Region/s"
        :options="regions_options"
        :readonly="spatial_coverage_id == '1'"
        @clear="selected_regions = []"
      />
    </q-item>

    <q-item>
      <multi-select
        v-model="selected_provinces"
        label="Province/s"
        :options="provinces_options"
        :dense="dense"
        :options-dense="dense"
        :readonly="spatial_coverage_id == '1'"
        @clear="selected_provinces = []"
      />
    </q-item>

    <q-item>
      <multi-select
        v-model="selected_districts"
        label="District/s"
        :options="districts_options"
        :readonly="spatial_coverage_id == '1'"
        @clear="selected_districts = []"
      />
    </q-item>

    <q-item>
      <single-select
        label="City/Municipality"
        :options="city_municipalities"
        v-model="cities_municipalities"
      ></single-select>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { FETCH_CITY_MUNICIPALITIES_QUERY } from '../../graphql/queries';
import SingleSelect from '../form-inputs/SingleSelect';
import MultiSelect from '../form-inputs/MultiSelect';

export default {
  components: {
    MultiSelect,
    SingleSelect
  },
  name: 'SpatialCoverage',
  props: ['dense'],
  apollo: {
    city_municipalities: {
      query: FETCH_CITY_MUNICIPALITIES_QUERY
    }
  },
  computed: {
    ...mapFields('project', [
      'project.spatial_coverage_id',
      'project.selected_provinces',
      'project.selected_districts',
      'project.cities_municipalities',
      'project.regions'
    ]),
    ...mapState('options', [
      'districts_options',
      'provinces_options',
      'spatial_coverages',
      'regions_options'
    ])
  }
};
</script>
