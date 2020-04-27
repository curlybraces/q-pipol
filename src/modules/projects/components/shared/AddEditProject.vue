<template>
  <div class="row q-pa-sm">
    <div class="col-4 q-pa-sm">
      <pre>
				{{ project }}
			</pre
      >
    </div>

    <div class="col-8 q-pa-sm">
      <q-form @submit.prevent="validateAndCreate" ref="form">
        <basic-information />

        <programming-documents />

        <additional-information />

        <spatial-coverage />

        <implementation-period />

        <technical-readiness />

        <financial-analysis />

        <financial-information />

        <project-updates />
      </q-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ProjectMixins from '../../../../mixins/ProjectMixins';

export default {
  components: {},
  name: 'AddEditProject',
  mixins: [ProjectMixins],
  computed: {
    ...mapState('project', ['loading']),
    ...mapFields('project', [
      'project',
      'project.pip',
      'project.cip',
      'project.trip',
      'project.rdip',
      'project.pcip',
      'project.afmip'
    ]),
    programmingDocumentsDone() {
      return (
        this.pip ||
        this.cip ||
        this.trip ||
        this.rdip ||
        this.pcip ||
        this.afmip
      );
    },
    basicInformationDone() {
      return (
        !!this.title &&
        !!this.operating_unit_id &&
        !!this.description &&
        !!this.type_id &&
        !!this.total_project_cost
      );
    },
    spatialCoverageDone() {
      return !!this.spatial_coverage_id;
    }
  },
  data() {
    return {
      step: 1
    };
  },
  methods: {
    validateAndCreate() {
      console.log('validate and create');
    }
  }
};
</script>
