<template>
  <div class="column q-pa-sm">
		{{ project }}
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <div class="text-subtitle1 text-primary">
          Basic Information
        </div>
        <div class="text-caption gt-sm">Basic information of the project</div>
      </div>
      <div class="col-md-8 col-sm-12">
        <basic-information></basic-information>
      </div>
    </div>

    <q-separator spaced color="primary" />

    <div class="row">
      <div class="col-4">
        <div class="text-subtitle1 text-primary">
          Technical Readiness
        </div>
        <div class="text-caption">Basic information of the project</div>
      </div>
      <div class="col-8">
        <technical-readiness></technical-readiness>
      </div>
    </div>

    <q-separator spaced color="primary" />

    <div class="row">
      <div class="col-4">
        <div class="text-subtitle1 text-primary"></div>
        <div class="text-caption">Basic information of the project</div>
      </div>
      <div class="col-8"></div>
    </div>

    <q-separator spaced />
  </div>
</template>

<script>
import BasicInformation from './shared/BasicInformation';
import TechnicalReadiness from './shared/TechnicalReadiness';

export default {
  name: 'AddProject',
  components: { TechnicalReadiness, BasicInformation }
};
</script>
