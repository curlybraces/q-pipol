<template>
  <page-container>
    <page-title title="Review Project">
      <div class="row q-gutter-sm">
        <q-btn 
          icon="subdirectory_arrow_right" 
          color="negative" 
          label="Return" 
          @click="handleReturnProject">
        </q-btn>

        <q-btn 
          icon="check" 
          color="green" 
          label="Validate"
          @click="handleValidateProject">
          </q-btn>
      </div>
    </page-title>

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
  data() {
    return {
      remarks: null
    };
  },
  methods: {
    handleReturnProject() {
      this.$q.dialog({
        title: 'Return Project',
        message: 'Indicate reason for returning project (Min. 10 chars)',
        prompt: {
          model: '',
          isValid: val => val.length > 10,
          type: 'text'
        },
        persistent: true,
        cancel: true
      })
      .onOk(data => {
        alert(data)
        // Todo: implement return logic here
      })
    },
    handleValidateProject() {
      this.$q.dialog({
        title: 'Validate Project',
        message: 'Remarks (min. 10 chars)',
        prompt: {
          model: '',
          isValid: val => val.length >= 10,
          type: 'text'
        },
        persistent: true,
        cancel: true
      })
      .onOk((data) => {
        alert(data)
        // Todo: implement validation logic here
      })
    }
  }
};
</script>
