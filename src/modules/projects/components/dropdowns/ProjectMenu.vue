<template>
  <q-list>
    <menu-item
      @click="viewProject"
      label="View"
      icon="search"
    >
    </menu-item>
    <menu-item
      v-if="isOwner"
      @click="updateProject"
      label="Update"
      icon="update"
    ></menu-item>
    <menu-item
      v-if="isReviewer"
      @click="reviewProject"
      label="Review"
      image="statics/menu/review.png"
    ></menu-item>
    <menu-item
      @click="handleSelectProject"
      :label="added ? 'Remove' : 'Add'"
      :icon="added ? 'clear' : 'add'"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="promptDelete(project.id)"
      label="Delete"
      icon="delete"
    ></menu-item>
  </q-list>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import MenuItem from './MenuItem';
	import { Dialog } from 'quasar'

	export default {
		components: { MenuItem },
		name: 'ProjectMenu',
		props: {
			project: {
				type: Object,
				required: true
			},
			added: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapState('auth',['user']),
			...mapGetters('auth', ['isEncoder', 'isReviewer']),
	    isOwner() {
	      return this.user.id === this.project.creator.id;
	    }
		},
		methods: {
	    handleSelectProject(project) {
	      if (this.added) {
	        this.$store.dispatch('projects/removeProject', project);
	      } else {
	        this.$store.dispatch('projects/selectProject', project);
	      }
	    },
      viewProject() {
      	const id = this.$props.project.id
        this.$router.push(`/projects/${id}`);
      },
      reviewProject() {
      	const id = this.$props.project.id
        this.$router.push(`/projects/${id}/review`);
      },
      updateProject() {
      	const id = this.$props.project.id
        this.$router.push(`/projects/${id}/edit`);
      },
      promptDelete(id) {
	      Dialog.create({
	        title: 'Delete Project',
	        message: 'Are you sure you want to delete this project?',
	        transitionShow: 'fade',
	        cancel: true
	      }).onOk(() => {
	        this.$store.dispatch('projects/deleteProject',{ id: id });
	      });
	    }
		}
	}
</script>