<template>
  <q-list>
    <menu-item 
      @click="viewProject" 
      label="View" 
      icon="search">
    </menu-item>
    <menu-item
      @click="updateProject"
      label="Update"
      icon="update"
      :disable="!isOwner || isFinalized"
    ></menu-item>
    <menu-item
      @click="reviewProject"
      label="Review"
      icon="rate_review"
      :disable="!isReviewer"
    ></menu-item>
    <menu-item
      @click="handleSelectProject"
      :label="added ? 'Remove' : 'Select'"
      :icon="added ? 'clear' : 'add'"
      :disable="!isFinalized && !isEncoder"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="handleTransferProject"
      label="Transfer"
      icon="subdirectory_arrow_right"
      :disable="!isOwner"
    ></menu-item>
    <menu-item
      @click="handleShareProject"
      label="Share"
      icon="share"
      :disable="!isFinalized"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="promptDelete(project.id)"
      label="Delete"
      icon="delete"
      :disable="!isOwner"
    ></menu-item>
  </q-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MenuItem from './MenuItem';
import { Dialog } from 'quasar';

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
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isEncoder', 'isReviewer']),
    isOwner() {
      return this.user.id === this.project.creator.id;
    },
    isFinalized() {
      return this.project.latest_status === 'finalized';
    },
    isReviewer() {
      console.log('role: ', this.$store.getters['auth/isReviewer']);
      return this.$store.getters['auth/isReviewer'];
    }
  },
  methods: {
    handleSelectProject() {
      if (this.added) {
        this.$store.dispatch('projects/removeProject', this.project);
      } else {
        this.$store.dispatch('projects/selectProject', this.project);
      }
    },
    viewProject() {
      const id = this.$props.project.id;
      this.$router.push(`/projects/${id}`);
    },
    reviewProject() {
      const id = this.$props.project.id;
      this.$router.push(`/projects/${id}/review`);
    },
    updateProject() {
      const id = this.$props.project.id;
      this.$router.push(`/projects/${id}/edit`);
    },
    promptDelete(id) {
      Dialog.create({
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
        transitionShow: 'fade',
        cancel: true
      }).onOk(() => {
        this.$store.dispatch('projects/deleteProject', { id: id });
      });
    },
    handleShareProject() {
      this.$q.dialog({
        title: 'Coming Soon',
        message: 'This feature is under development.'
      })
    },
    handleTransferProject() {
      this.$emit('transfer')
    }
  }
};
</script>
