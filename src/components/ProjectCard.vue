<template>
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 flex">
    <q-card class="fit" flat bordered square>
      <q-item>
        <q-space />
        <q-item-section side class="text-orange-9 text-weight-bolder text-h6">
          PhP {{ project.total_project_cost.toLocaleString(2) }}
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label overline>
            {{ project.operating_unit.name }}
          </q-item-label>
          <q-item-label
            class="text-subtitle1"
            v-html="$options.filters.searchHighlight(project.title, search)"
          />
        </q-item-section>
      </q-item>

      <q-card-section class="q-pt-none text-caption text-grey-7">
        {{ ' Description: ' + project.description }}
      </q-card-section>

      <q-card-section class="text-caption q-py-none">
        By: {{ project.creator.name }}
      </q-card-section>

      <q-item>
        <q-item-section side>
          <q-item-label caption>
            <q-icon name="event" />
            {{ project.created_at | date }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            <q-icon name="access_time" />
            {{ project.created_at | time }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-card-actions class="justify-around q-px-md">
        <q-btn
          flat
          round
          color="green"
          icon="open_in_new"
          :to="'pip/' + project.id"
        />
        <q-btn
          flat
          round
          color="blue"
          icon="edit"
          :to="'pip/' + project.id + '/edit'"
        />
        <q-btn
          flat
          round
          color="red"
          icon="delete"
          @click="promptDelete(project.id)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import { Dialog } from 'quasar';

export default {
  name: 'ProjectCard',
  props: ['project'],
  computed: {
    ...mapState('projects', ['search'])
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
    date(val) {
      const dateOnly = moment(val).format('dddd, MMM d, YYYY');
      return dateOnly;
    },
    time(val) {
      const timeOnly = moment(val).format('LT');
      return timeOnly;
    }
  },
  methods: {
    ...mapActions('projects', ['deleteProject']),
    promptDelete(id) {
      Dialog.create({
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
        cancel: true,
        transitionHide: 'fade',
        transitionShow: 'fade'
      }).onOk(() => {
        this.deleteProject(id);
      });
    }
  }
};
</script>
