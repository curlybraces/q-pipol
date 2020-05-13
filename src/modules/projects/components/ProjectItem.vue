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
        <q-btn color="primary" dense outline icon="unfold_more" size="sm" >
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list>
              <project-menu @click="viewProject(project.id)" label="View" image="statics/menu/inspect.png"></project-menu>
              <project-menu v-if="isOwner" @click="updateProject(project.id)" label="Update" image="statics/menu/update.png"></project-menu>
              <project-menu v-if="isReviewer" @click="reviewProject(project.id)" label="Review" image="statics/menu/review.png"></project-menu>
              <q-separator/>
              <project-menu @click="promptDelete(project.id)" label="Delete" image="statics/menu/delete.png"></project-menu>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>
    </q-item>
  </transition>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { Dialog, date } from 'quasar';
import ProjectMenu from './dropdowns/ProjectMenu'

export default {
  components: {ProjectMenu},
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
    ...mapGetters('auth',['isEncoder','user','isReviewer']),
	  isOwner() {
      return this.user.id === this.project.creator.id
    }

  },
  data() {
    return {
      handleClick() {
        console.log('clicked')
      },
      viewProject(id) {
        this.$router.push(`/projects/${id}`)
      },
      reviewProject(id) {
        this.$router.push(`/projects/${id}/review`)
      },
      updateProject(id) {
        this.$router.push(`/projects/${id}/edit`)
      }
		};
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
        this.deleteProject({
          id: id
        });
      });
    },
	  showBottomSheet(project) {
    //   const filteredActions = this.filteredActions

		  // this.$q.bottomSheet({
			 //  dark: this.dark,
				// title: 'Menu',
			 //  message: project.title,
			 //  grid: true,
			 //  actions: filteredActions
		  // }).onOk(action => {
			 //  // console.log('Action chosen:', action.id)
				// switch(action.id) {
				// 	case 'view':
				// 		this.$router.push(`/projects/${project.id}`)
				// 		break;
				// 	case 'edit':
				// 		this.$router.push(`/projects/${project.id}/edit`)
				// 		break;
				// 	case 'delete':
				// 		this.promptDelete(project.id)
				// 		break;
				// 	case 'review':
				// 		this.$router.push(`/projects/${project.id}/review`)
				// 		break;
				// 	case 'print':
				// 		console.log('print project')
				// 		break;
				// 	default:
				// 		return;
				// }
		  // }).onCancel(() => {
			 //  // console.log('Dismissed')
		  // }).onDismiss(() => {
			 //  // console.log('I am triggered on both OK and Cancel')
		  // })
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
      const today = new Date()

      if (!val) {
        return ''
      }

      return date.getDateDiff(today, val, 'days') + ' days ago'
    }
  }
};
</script>
