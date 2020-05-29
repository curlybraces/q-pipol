<template>
  <q-item :class="added ? 'bg-green-1' : ''">
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
        Created {{ displayDateDifference(project.created_at) }}
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
      <q-btn color="primary" dense outline icon="unfold_more" size="sm">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          auto-close
        >
          <project-menu :project="project" :added="added"></project-menu>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { displayDateDifference } from '@/utils';
import ProjectMenu from './dropdowns/ProjectMenu';

export default {
  components: { ProjectMenu },
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
    selectedProjects() {
      return this.$store.state.projects.selectedProjects
    },
    added() {
      return this.selectedProjects.includes(this.$props.project);
    },
  },
  methods: {
    displayDateDifference
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
    }
  }
};
</script>
