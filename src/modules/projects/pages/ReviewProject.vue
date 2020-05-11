<template>
  <page-container>
    <page-title title="Review Project"></page-title>

    <div class="row">
      <div class="col-8">
        <q-scroll-area style="height:80vh;">
          <project-profile :id="$route.params.id"></project-profile>
        </q-scroll-area>
      </div>
      <div class="col-4 q-pa-sm">
        <review-form :id="$route.params.id"></review-form>
      </div>
    </div>

  </page-container>
</template>

<script>
import gql from 'graphql-tag';
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '../../ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageTitle' */ '../../ui/page/PageContainer');
const ProjectProfile = () => import('../components/ProjectProfile')
const ReviewForm = () => import('../components/ReviewForm')

export default {
  components: { PageTitle, PageContainer, ProjectProfile, ReviewForm },
  name: 'PageReviewProject',
  props: ['id'],
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
