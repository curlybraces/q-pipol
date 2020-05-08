<template>
  <transition
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-item>
      <!-- operating unit -->
      <q-item-section avatar class="gt-xs">
        <q-avatar color="grey-1">
          <q-img
            :src="
              project.operating_unit
                ? project.operating_unit.image
                : 'statics/placeholder.jpg'
            "
          />
        </q-avatar>
      </q-item-section>

      <!-- project information -->
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
            v-if="typeof project.title !== undefined"
            v-html="$options.filters.searchHighlight(project.title, search)"
          ></span>
        </q-item-label>
        <q-item-label caption lines="2">
          {{ project.description }}
        </q-item-label>
        <q-item-label caption>
          Created {{ project.created_at | dateDiff }}
        </q-item-label>
      </q-item-section>

      <!-- project cost -->
      <q-item-section class="text-right">
        <q-item-label class="text-orange-9">
          {{ project.currency ? project.currency.name : '' }}
          {{
            project.total_project_cost
              ? project.total_project_cost.toLocaleString()
              : 0.0
          }}
        </q-item-label>
      </q-item-section>

      <!-- action buttons -->
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
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="open_in_new" /> View
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="isEncoder"
                clickable
                v-close-popup
                :to="'/projects/' + project.id + '/edit'"
                tag="a"
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
                @click="promptDelete(project)"
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
  </transition>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { Dialog } from 'quasar';
import { dateDiff } from '../../../utils/date-diff.utils';

export default {
  name: 'ProjectItem',
  props: {
    project: {
      type: Object
    },
    search: {
      type: String
    }
  },
  computed: {
    ...mapState('settings', ['dark']),
    ...mapGetters('settings', ['buttonColor']),
    ...mapGetters('auth',['isEncoder'])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('projects', ['deleteProject']),
    promptDelete(project) {
      Dialog.create({
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
        transitionShow: 'fade',
        cancel: true
      }).onOk(() => {
        this.deleteProject(project);
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
    dateDiff(val) {
      return dateDiff(val);
    }
  }
};
</script>