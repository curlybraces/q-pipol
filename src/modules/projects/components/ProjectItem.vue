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
        <q-btn :color="buttonColor" dense outline icon="unfold_more" size="sm" @click="showBottomSheet(project)"></q-btn>
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
    ...mapGetters('auth',['isEncoder','user']),
	  filteredActions() {
    	let filteredActions = []
			const actions = this.actions
			const role = this.user.role.name

			filteredActions = actions.filter(action => (action.visibleTo ? action.visibleTo.includes(role) : null))

    	return filteredActions
		}
  },
  data() {
    return {
	    actions: [
		    {
			    label: 'View Project',
			    img: 'statics/menu/inspect.png',
			    id: 'view',
					visibleTo: ['encoder','admin','superadmin','viewer','guest']
		    },
				{
					label: 'Update Project',
					img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
					id: 'edit',
					visibleTo: ['encoder']
				},
				{
					label: 'Delete Project',
					img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
					id: 'delete',
					visibleTo: ['encoder']
				},
				{
					label: 'Reviewer',
					img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
					id: 'review',
					visibleTo: ['reviewer']
				},
				{
					label: 'Print Project',
					img: 'statics/menu/cloud_print.png',
					id: 'print',
					visibleTo: ['encoder','admin','superadmin','viewer','guest']
				}
			]
		};
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
    },
	  showBottomSheet(project) {
		  this.$q.bottomSheet({
			  dark: this.dark,
				title: 'Menu',
			  message: project.title,
			  grid: true,
			  actions: this.filteredActions
		  }).onOk(action => {
			  // console.log('Action chosen:', action.id)
				switch(action.id) {
					case 'view':
						this.$router.push(`/projects/${project.id}`)
						break;
					case 'edit':
						this.$router.push(`/projects/${project.id}/edit`)
						break;
					case 'delete':
						this.promptDelete(project.id)
						break;
					case 'review':
						this.$router.push(`/projects/${project.id}/review`)
						break;
					case 'print':
						console.log('print project')
						break;
					default:
						return;
				}
		  }).onCancel(() => {
			  // console.log('Dismissed')
		  }).onDismiss(() => {
			  // console.log('I am triggered on both OK and Cancel')
		  })
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
