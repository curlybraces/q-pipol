<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
    </q-inner-loading>

    <q-item-label class="q-mt-lg" header>
      View Project
    </q-item-label>

    <div class="row q-col-gutter-sm">
      <div class="col-8 q-pa-sm">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>{{ project.title }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>
                Implementing Agency
              </q-item-label>
              <q-item-label caption>
                {{ project.operating_unit.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Implementation Period</q-item-label>
              <q-item-label caption>
                {{
                  project.target_start_year + ' - ' + project.target_end_year
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Description</q-item-label>
              <q-item-label caption>{{ project.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-4 bg-blue-2 q-pa-sm">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Goals
              </q-item-label>
              <q-item-label>
                {{ project.goals }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Outcomes
              </q-item-label>
              <q-item-label>
                {{ project.outcomes }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Objectives
              </q-item-label>
              <q-item-label>
                {{ project.purpose }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Expected Outputs
              </q-item-label>
              <q-item-label>
                {{ project.expected_outputs }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-separator />

    <pre>
      {{ project }}
    </pre>
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
      nav: [
        {
          label: 'Basic Information',
          ref: '#basicInformation'
        }
      ]
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
