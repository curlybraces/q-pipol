<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
    </q-inner-loading>

    <q-item-label class="q-mt-lg" header>View Project</q-item-label>

    <div class="row q-pa-sm q-col-gutter-sm" v-if="!loading">
      <div class="text-h6 q-gutter-xs">
        {{ project.title }}
        <q-badge v-if="project.pip">PIP</q-badge>
        <q-badge v-if="project.cip">CIP</q-badge>
        <q-badge v-if="project.trip">TRIP</q-badge>
        <q-badge v-if="project.rdip">RDIP</q-badge>
        <q-badge v-if="project.pcip">PCIP</q-badge>
        <q-badge v-if="project.afmip">AFMIP</q-badge>
      </div>
      <div class="text-subtitle2">{{ project.operating_unit.name }}</div>

      <pre>
        {{
          project
        }}
      </pre>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ViewProject',
  computed: {
    ...mapState('project', ['project', 'loading'])
  },
  data() {
    return {
      nav: [{
        label: 'Basic Information',
        ref: '#basicInformation'
      }]
    };
  },
  methods: {
    ...mapActions('project', ['fetchProject'])
  },
  created() {
    this.fetchProject(this.$route.params.id);
  }
};
</script>
