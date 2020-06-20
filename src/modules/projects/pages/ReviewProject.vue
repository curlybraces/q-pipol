<template>
  <page-container>
    <page-title title="Review Project"></page-title>

    <div class="row">
      <div class="col-8">
        <q-scroll-area style="height:80vh;">
          <project-profile :project="project"></project-profile>
        </q-scroll-area>
      </div>
      <div class="col-4 q-pa-sm">
        <review-form :id="$route.params.id"></review-form>
      </div>
    </div>

    <q-dialog v-model="showReturnProjectDialog" persistent>
      <q-card style="width: 400px;">
        <q-toolbar class="bg-black text-white">
          Return Project
          <q-space />
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="showReturnProjectDialog = false"
          />
        </q-toolbar>
        <q-form ref="form" @submit.prevent="handleReturnProject">
          <q-card-section>
            <p>
              Inform the encoder of the reason for returning the project, e.g.
              not included in the endorsement letter, missing/consistent
              information, etc.
            </p>
            <q-input
              dense
              outlined
              label="Remarks"
              type="textarea"
              v-model="remarks"
              :rules="[val => !!val || '* Required']"
              hint="Remarks (if any)"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              @click="showReturnProjectDialog = false"
            ></q-btn>
            <q-btn type="submit" label="Confirm" color="primary"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </page-container>
</template>

<script>
const PageTitle = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageTitle');
const PageContainer = () =>
  import(/* webpackChunkName: 'PageTitle' */ '@/ui/page/PageContainer');
const ProjectProfile = () => import('../components/ProjectProfile');
const ReviewForm = () => import('../components/ReviewForm');
import { FETCH_PROJECT_QUERY } from '@/graphql/queries';

export default {
  components: { PageTitle, PageContainer, ProjectProfile, ReviewForm },
  name: 'PageReviewProject',
  data() {
    return {
      remarks: null,
      showReturnProjectDialog: false,
      project: {}
    };
  },
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  methods: {
    handleReturnProject() {
      if (this.remarks) {
        const payload = {
          project_id: this.$route.params.id,
          remarks: this.remarks
        };

        this.$store.dispatch('projects/returnProject', payload);
      } else {
        alert('Remarks is required');
      }
    },
    handleValidateProject() {
      this.$q
        .dialog({
          title: 'Validate Project',
          message:
            'Validating project means that (1) it is already included in the endorsement and (2) the required information is complied with. Add remarks below.',
          prompt: {
            model: '',
            isValid: val => val.length >= 10,
            type: 'text'
          },
          persistent: true,
          cancel: true
        })
        .onOk(data => {
          const payload = {
            id: this.$route.params.id,
            remarks: data
          };
          this.$store.dispatch('projects/validateProject', payload);
          // Todo: implement validation logic here
        });
    }
  }
};
</script>
