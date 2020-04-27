<template>
  <q-page class="q-pt-lg">
    <page-title title="Add Project (v.2)">
      <q-badge>
        {{ screenSize }}
      </q-badge>
    </page-title>

    <div class="row justify-center q-pa-sm q-col-gutter-sm">
      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-12 gt-sm">
        <q-list separator class="bg-white">
          <q-item-label header>NAVIGATE</q-item-label>
          <q-item
            v-for="(nav, index) in navs"
            :key="index"
            clickable
            @click="step = nav.step"
          >
            <q-item-section avatar>
              <q-avatar :color="step === nav.step ? 'primary' : 'grey'">
                <q-icon
                  :name="step === nav.step ? 'edit' : ''"
                  class="text-white"
                ></q-icon>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ nav.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12">
        <q-form @submit.prevent="handleSubmit">
          <q-toolbar class="bg-white">
            <q-space></q-space>
            <q-btn
              outline
              label="Reset"
              color="primary"
              class="q-mr-sm"
            ></q-btn>
            <q-btn
              label="Save"
              color="primary"
              type="submit"
              :loading="loading"
            ></q-btn>
          </q-toolbar>
          <q-separator></q-separator>
          <q-scroll-area style="height:70vh;">
            <q-stepper
              v-model="step"
              title="Create Project"
              vertical
              color="primary"
              animated
              header-nav
              flat
            >
              <q-step :name="1" title="Basic Information">
                <basic-information></basic-information>
              </q-step>
              <q-step :name="2" title="Programming Documents">
                <programming-documents></programming-documents>
              </q-step>
              <q-step :name="3" title="Additional Information">
                <additional-information></additional-information>
              </q-step>
              <q-step :name="4" title="Spatial Coverage">
                <spatial-coverage></spatial-coverage>
              </q-step>
              <q-step :name="5" title="Implementation Period">
                <implementation-period></implementation-period>
              </q-step>
              <q-step :name="6" title="Readiness">
                <technical-readiness></technical-readiness>
              </q-step>
              <q-step :name="7" title="Financial and Economic Analysis">
                <financial-analysis></financial-analysis>
              </q-step>
              <q-step :name="8" title="Financial Information">
                <financial-information></financial-information>
              </q-step>
              <q-step :name="9" title="Updates">
                <project-updates></project-updates>
              </q-step>
            </q-stepper>
          </q-scroll-area>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PageTitle from '../../ui/page/PageTitle';
import ProjectMixins from '../../../mixins/ProjectMixins';

export default {
  components: { PageTitle },
  name: 'CreateProject',
  mixins: [ProjectMixins],
  computed: {
    ...mapState('project', ['project', 'loading']),
    ...mapGetters('project', ['progress']),
    screenSize() {
      const screenSize = this.$q.screen.name;
      switch (screenSize) {
        case 'xl':
          return 'Extra Large';
        case 'lg':
          return 'Large';
        case 'md':
          return 'Medium';
        case 'sm':
          return 'Small';
        case 'xs':
          return 'Extra Small';
        default:
          return '';
      }
    }
  },
  data() {
    return {
      step: 1,
      navs: [
        {
          title: 'Basic Information',
          step: 1,
          progress: 0
        },
        {
          title: 'Programming Documents',
          step: 2
        },
        {
          title: 'Additional Information',
          step: 3
        },
        {
          title: 'Spatial Coverage',
          step: 4
        },
        {
          title: 'Implementation Period',
          step: 5
        },
        {
          title: 'Readiness',
          step: 6
        },
        {
          title: 'Financial and Economic Analysis',
          step: 7
        },
        {
          title: 'Financial Information',
          step: 8
        },
        {
          title: 'Updates',
          step: 9
        }
      ]
    };
  },
  methods: {
    ...mapActions('project', ['clearProject', 'createProject']),
    handleSubmit() {
      this.createProject(this.project);
    }
  },
  mounted() {
    this.clearProject();
  }
};
</script>
