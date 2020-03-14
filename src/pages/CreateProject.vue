<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <text-input label="Title"></text-input>
    <text-input label="Description"></text-input>
    <text-input label="Goals"></text-input>
    <text-input label="Outcomes"></text-input>
    <text-input label="Purpose"></text-input>
    <text-input label="Expected Outputs"></text-input>
    <text-input label="Beneficiaries"></text-input>
    <text-input label="Employment Generated"></text-input>
    <text-input label="Implementation Risk"></text-input>
    <text-input label="Mitigation Strategies"></text-input>
    <text-input label="Contribution to Income Increase"></text-input>
  </q-page>
</template>

<script>
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import TextInput from '../components/FormInputs/TextInput';

export default {
  components: { PageBreadcrumbs, TextInput },
  computed: {
    contracted() {
      return !this.$q.screen.gt.md;
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Projects',
          url: '/projects'
        },
        {
          title: 'Create Project'
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
