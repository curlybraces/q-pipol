<template>
  <q-page>
    <q-toolbar class="q-mt-lg">
      <q-item-label header class="q-pl-none">Projects</q-item-label>
      <q-space />
      <q-btn
        outline
        label="Add Project"
        dense
        color="primary"
        to="/pip/new"
      ></q-btn>
    </q-toolbar>

    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Programs and Projects"
          v-model="searchField"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>

      <template v-if="Object.keys(projects).length > 0">
        <q-infinite-scroll @load="onLoad" :offset="100">
          <q-list separator>
            <q-item v-for="(project, key) in projects" :key="key">
              <q-item-section avatar>
                <q-avatar color="white">
                  <q-img
                    v-if="project.operating_unit != null"
                    :src="
                      `statics/agency_logos/${project.operating_unit.image}`
                    "
                  />
                  <q-img v-else src="statics/agency_logos/da-co.svg" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="col-6">
                <q-item-label>
                  <span class="text-weight-bold">
                    {{
                      project.operating_unit
                        ? '[' + project.operating_unit.acronym + '] '
                        : ''
                    }}
                  </span>
                  <span
                    v-html="
                      $options.filters.searchHighlight(project.title, search)
                    "
                  ></span>
                </q-item-label>
                <q-item-label caption lines="2">
                  {{ project.description }}
                </q-item-label>
                <q-item-label caption>
                  {{ project.created_at | timeDiff }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="text-right">
                <q-item-label class="text-orange-9">
                  PhP {{ project.total_project_cost.toLocaleString() }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="primary"
                  dense
                  outline
                  icon="unfold_more"
                  size="sm"
                >
                  <q-menu
                    :offset="[0, 2]"
                    transition-show="jump-down"
                    transition-hide="jump-up"
                  >
                    <q-list style="min-width: 100px" dense>
                      <q-item
                        clickable
                        v-close-popup
                        :to="'/pip/' + project.id"
                        tag="a"
                        target="_blank"
                      >
                        <q-item-section>
                          <q-item-label>
                            <q-icon name="open_in_new" /> View
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        :to="'/pip/' + project.id + '/edit'"
                        tag="a"
                        target="_blank"
                      >
                        <q-item-section>
                          <q-item-label>
                            <q-icon name="edit" /> Edit
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        class="text-negative"
                        @click="promptDelete(project.id)"
                      >
                        <q-item-section>
                          <q-item-label>
                            <q-icon name="close" />
                            Delete
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-infinite-scroll>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import { Dialog, Notify } from 'quasar';

export default {
  name: 'Projects',
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    ...mapState('projects', ['loading', 'search', 'pageInfo']),
    ...mapState('settings', ['dark']),
    ...mapGetters('projects', ['projects']),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    }
  },
  methods: {
    ...mapActions('projects', ['fetchProjects', 'setSearch', 'deleteProject']),
    onLoad(index, done) {
      console.log('onload is being called');
      if (this.projects) {
        if (this.pageInfo.hasNextPage) {
          this.fetchProjects({
            first: this.first,
            after: this.pageInfo.endCursor
          }).then(() => done());
        } else {
          console.log('this is the last page');
        }
      } else {
        console.log('first time loading');
      }
    },
    promptDelete(id) {
      Dialog.create({
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
        transitionShow: 'fade',
        cancel: true
      }).onOk(() => {
        this.deleteproject(id).then(() => {
          Notify.create({
            message: 'The project has been successfully deleted.'
          });
        });
      });
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, 'ig');
        return value.replace(searchRegExp, match => {
          return "<span class='bg-yellow-6'>" + match + '</span>';
        });
      }
      return value;
    },
    timeDiff(val) {
      return moment(val).calendar();
    }
  },
  mounted() {
    this.fetchProjects({
      first: 25
    });
  }
};
</script>
