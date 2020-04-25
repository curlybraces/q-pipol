<template>
  <q-page class="q-pt-lg">
    <page-title title="Review Project"></page-title>

    <div class="q-pa-sm">
      <div class="row q-col-gutter-sm">
        <template v-for="sdg in sustainable_development_goals">
          <div
            class="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-3"
            :key="sdg.id"
          >
            <checkbox-image
              :image="`statics/sdg/${sdg.id}.jpg`"
              :value="sdgs"
              @input="handleInput"
              :val="sdg.id"
            ></checkbox-image>
          </div>
        </template>
      </div>
    </div>

    <div class="row q-pa-sm">
      <ul>
        <li>Select PDP Chapter</li>
        <li>Select PDP Indicators</li>
        <li>Select SDG</li>
        <li>Select 0+10</li>
        <li>Select 8 paradigms</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </q-page>
</template>

<script>
import gql from 'graphql-tag';
import PageTitle from '../../shared/components/PageTitle';
import CheckboxImage from '../../shared/components/form-inputs/CheckboxImage';

export default {
  components: { CheckboxImage, PageTitle },
  name: 'PageReviewProject',
  apollo: {
    sustainable_development_goals: {
      query: gql`
        query sustainable_development_goals {
          sustainable_development_goals {
            id
            name
          }
        }
      `
    }
  },
  data() {
    return {
      sustainable_development_goals: [],
      check: false,
      sdgs: []
    };
  },
  methods: {
    handleInput(e) {
      const sdgs = this.sdgs;
      if (sdgs.length && sdgs.includes(e)) {
        const index = sdgs.indexOf(e);
        sdgs.splice(index, 1);
      } else {
        this.sdgs.push(e);
      }
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  }
};
</script>
