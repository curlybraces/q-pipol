<template>
  <q-page>
    <page-title title="Projects">
      <q-btn
        outline
        label="Add Project"
        dense
        color="primary"
        to="/projects/new"
      ></q-btn>
    </page-title>

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

      <template v-if="loading">
        <project-skeleton/>
      </template>

      <template v-if="Object.keys(projects).length > 0">

        <sort-menu></sort-menu>

        <q-separator/>

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
                :color="buttonColor"
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
                      :to="'/projects/' + project.id"
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
                      :to="'/projects/' + project.id + '/edit'"
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

          <q-item clickable @click="loadProjects" v-if="!loading && pageInfo.hasNextPage">
            <q-item-section class="text-center">
              Load More
            </q-item-section>
          </q-item>
          <q-item v-if="!loading && !pageInfo.hasNextPage">
            <q-item-section class="text-center">
              This is the last page.
            </q-item-section>
          </q-item>

        </q-list>

      </template>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import { Dialog, Notify } from 'quasar';
import PageTitle from '../components/PageTitle';
import SortMenu from "../components/Projects/SortMenu";
import ProjectSkeleton from "../components/Projects/ProjectSkeleton";

export default {
  name: 'Projects',
  components: { ProjectSkeleton, SortMenu, PageTitle },
  data() {
    return {
      expanded: false,
      first: 25,
      endCursor: ''
  };
  },
  computed: {
    ...mapState('projects', ['loading', 'search', 'pageInfo']),
    ...mapState('settings', ['dark', 'buttonColor']),
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
    loadProjects() {
      const first = this.first;
      const endCursor = (this.pageInfo.endCursor == undefined) ? '' : this.pageInfo.endCursor;
      const hasNextPage = (this.pageInfo.hasNextPage == undefined) ? true: this.pageInfo.hasNextPage;

      if (hasNextPage) {
        console.log('loading more');
        this.fetchProjects({
          first: first,
          after: endCursor
        });
      } else {
        console.log('Nothing to load');
      }
    },
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
    this.loadProjects();
  }
};
</script>
