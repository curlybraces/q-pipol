<template>
  <q-list>
    <checkbox-item
      v-model="pip"
      label="PIP"
      description="Public Investment Program"
    />
    <checkbox-item
      v-model="cip"
      label="CIP"
      description="Core Investment Program"
    />
    <checkbox-item
      v-model="trip"
      label="TRIP"
      description="Three-Year Rolling Investment Program"
    />
    <checkbox-item
      v-model="rdip"
      label="RDIP"
      description="Regional Development Investment Program"
    />
    <checkbox-item
      v-model="pcip"
      label="PCIP"
      description="Provincial Commodity Investment Plan"
    />
    <checkbox-item
      v-model="afmip"
      label="AFMIP"
      description="Agriculture and Fisheries Modernization and Industrialization Plan"
    />
  </q-list>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    'checkbox-item': () => import('../../../ui/form-inputs/CheckboxItem.vue')
  },
  name: 'ProgrammingDocuments',
  props: ['dense'],
  computed: {
    ...mapFields('project', [
      'project.pip',
      'project.cip',
      'project.trip',
      'project.rdip',
      'project.pcip',
      'project.afmip'
    ])
  }
};
</script>
