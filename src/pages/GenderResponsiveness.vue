<template>
  <q-page class="q-pt-lg">
    <page-title title="GAD Responsiveness">
      <q-btn flat round icon="help" to="/gad-help"></q-btn>
    </page-title>
    <div class="row q-pa-sm">
      <div class="col">
        <gad-form></gad-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import PageTitle from '../modules/shared/components/PageTitle';
import GadForm from '../components/GenderResponsiveness/Form';
export default {
  name: 'PageGenderResponsiveness',
  components: { GadForm, PageTitle }
};
</script>
