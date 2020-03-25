<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="white">
        <q-img
          v-if="project.operating_unit != null"
          :src="`statics/agency_logos/${project.operating_unit.image}`"
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
          v-html="$options.filters.searchHighlight(project.title, search)"
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
      <q-btn :color="buttonColor" dense outline icon="unfold_more" size="sm">
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
                <q-item-label> <q-icon name="edit" /> Edit </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              :class="dark ? 'text-pink-11' : 'text-negative'"
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
</template>

<script>
import moment from 'moment';
import { mapState, mapActions, mapGetters } from 'vuex';
import { Dialog } from 'quasar';

export default {
  name: 'ProjectItem',
  props: {
    project: {
      type: Object
    }
  },
  computed: {
    ...mapState('projects', ['search']),
    ...mapState('settings', ['dark']),
    ...mapGetters('settings', ['buttonColor'])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('projects', ['deleteProject']),
    promptDelete(id) {
      Dialog.create({
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
        transitionShow: 'fade',
        cancel: true
      }).onOk(() => {
        this.deleteProject(id);
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
  }
};
</script>
