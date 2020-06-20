<template>
  <q-list>
    <menu-item 
      @click="viewProject" 
      label="View" 
      icon="search"
    ></menu-item>
    <menu-item
      @click="updateProject"
      label="Update"
      icon="update"
      v-if="showUpdateItem"
      :disable="!isOwner || isFinalized"
      tooltip="Restricted to owner only"
    ></menu-item>
    <menu-item
      @click="validateProject"
      label="Validate"
      icon="img:statics/icons/fact_check-black-18dp.svg"
      :disable="!isReviewer && !isEndorsed"
      v-if="showValidateItem"
    ></menu-item>
    <menu-item
      @click="reviewProject"
      label="Review"
      icon="rate_review"
      v-if="showReviewItem"
      :disable="reviewProjectItem"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="handleTransferProject"
      label="Transfer"
      icon="subdirectory_arrow_right"
      tooltip="Restricted to owner only"
      :disable="!isOwner"
    ></menu-item>
    <menu-item
      @click="handleShareProject"
      label="Share"
      icon="share"
      tooltip="Restricted to owner only"
      :disable="!isOwner"
    ></menu-item>
    <q-separator />
    <menu-item
      @click="promptDelete(project.id)"
      label="Delete"
      icon="delete"
      tooltip="Restricted to owner only"
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
      if (this.project.creator && this.project.creator.id) {
        return this.user.id === this.project.creator.id;
      }
      return false;
    },
    isFinalized() {
      const status = this.project.processing_status ? this.project.processing_status.name: '';
      return status === 'finalized'
    },
    isReviewer() {
      console.log('role: ', this.$store.getters['auth/isReviewer']);
      return this.$store.getters['auth/isReviewer'];
    },
    isEndorsed() {
      const status = this.project.processing_status ? this.project.processing_status.name: '';
      return status === 'endorsed'
    },
    isValidated() {
      const status = this.project.processing_status ? this.project.processing_status.name: '';
      return status === 'validated'
    },
    showReviewItem() {
      return this.$route.fullPath === '/projects/validated'
    },
    showUpdateItem() {
      return this.$route.fullPath === '/projects/draft'
    },
    showValidateItem() {
      return this.$route.fullPath === '/projects/endorsed'
    },
    reviewProjectDisabled() {
      if (!this.isReviewer) {
        return true
      }
      return false
    }
  },
  data() {
    return {
      fact_check: null
    };
  },
  methods: {
    handleSelectProject() {
      if (this.added) {
        this.$store.dispatch('projects/removeProject', this.project);
      } else {
        this.$store.dispatch('projects/selectProject', this.project);
      }
    },
    validateProject() {
      const id = this.$props.project.id;
      this.$router.push(`/projects/${id}/validate`);
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
      });
    },
    handleTransferProject() {
      this.$emit('transfer');
    }
  }
};
</script>
