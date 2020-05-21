<template>
  <page-container>
    <page-title title="Resources">
      <settings-button vif="isAdmin">
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list>
            <q-item
              clickable
              @click="createResourceDialog = true"
              v-if="isAdmin"
            >
              <q-item-section>
                <q-item-label>Add Resource</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </settings-button>
    </page-title>

    <div class="q-pa-sm">
      <template v-if="$apollo.loading">
        <q-inner-loading :showing="$apollo.loading">
          <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
        </q-inner-loading>
      </template>
      <template v-else>
        <template v-if="!resources.length">
          <no-item
            icon="cancel"
            message="There are no resources to show. If you have added a resource but was not listed here even after refreshing. Please seek our assistance."
          ></no-item>
        </template>
        <div class="row q-gutter-sm">
          <q-list bordered separator v-if="resources.length">
            <q-item
              v-for="(resource, key) in resources"
              :key="key"
              clickable
              @click="goTo(resource.url)"
            >
              <q-item-section avatar>
                <q-img :src="resource.image_url"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><q-badge color="red">{{ resource.document_type }}</q-badge
                  >&nbsp;{{ resource.title }}</q-item-label
                >
                <q-item-label caption :lines="3">{{
                  resource.description
                }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="isAdmin">
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="red"
                  @click.stop="promptDelete(resource.id)"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>
    </div>

    <dialog-container v-model="createResourceDialog">
      <dialog-header
        title="Create Resource"
        @close="createResourceDialog = false"
      ></dialog-header>
      <q-form @submit="onSubmit" ref="form">
        <q-card-section class="q-pa-sm">
          <text-input
            v-model="title"
            label="Title"
            :rules="required"
          ></text-input>
          <text-input
            v-model="description"
            label="Description"
            type="textarea"
            :rules="required"
          ></text-input>
          <text-input
            v-model="url"
            label="Link (Complete URL)"
            :rules="required"
          ></text-input>
          <text-input
            v-model="image_url"
            label="Image URL (for Preview)"
            :rules="required"
          ></text-input>
          <span class="text-caption text-weight-bold q-mt-md" :rules="required"
            >Document Type</span
          >
          <q-select
            outlined
            :dense="dense"
            v-model="document_type"
            :options="document_types"
            :rules="required"
          ></q-select>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup></q-btn>
          <q-btn type="submit" label="Submit" color="primary"></q-btn>
        </q-card-actions>
      </q-form>
    </dialog-container>
  </page-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PageTitle from '@/ui/page/PageTitle';
import { openURL, Dialog } from 'quasar';
import TextInput from '@/ui/form-inputs/TextInput';
import PageContainer from '@/ui/page/PageContainer';
import NoItem from '@/ui/components/NoItem';
import SettingsButton from '@/ui/buttons/SettingsButton';
import DialogContainer from '@/ui/dialogs/DialogContainer';
import DialogHeader from '@/ui/dialogs/DialogHeader';

export default {
  name: 'PageResources',
  components: {
    NoItem,
    PageContainer,
    TextInput,
    PageTitle,
    SettingsButton,
    DialogContainer,
    DialogHeader
  },
  computed: {
    ...mapState('settings', ['dense']),
    ...mapGetters('auth', ['isAdmin'])
  },
  data() {
    return {
      createResourceDialog: false,
      document_types: ['PDF', 'DOC', 'XLS', 'PPT', 'PNG', 'WEB', 'OTHERS'],
      required: [val => !!val.length || 'Please type something.'],
      valid: false,
      title: '',
      description: '',
      url: '',
      image_url: '',
      document_type: '',
      resources: []
    };
  },
  methods: {
    ...mapActions('resources', [
      'fetchResources',
      'createResource',
      'deleteResource'
    ]),
    goTo(url) {
      Dialog.create({
        title: 'Confirm',
        message: 'This will open the link in a new tab.',
        cancel: true,
        transitionHide: 'fade',
        transitionShow: 'fade'
      }).onOk(() => openURL(url));
    },
    promptDelete(id) {
      Dialog.create({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?',
        cancel: true,
        transitionShow: 'fade',
        transitionHide: 'fade'
      }).onOk(() =>
        this.deleteResource({
          id: id
        })
      );
    },
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createResource({
            title: this.title,
            description: this.description,
            url: this.url,
            image_url: this.image_url,
            document_type: this.document_type
          });
        } else {
          alert('Please check form');
        }
      });
    }
  },
  created() {
    this.fetchResources().then(res => (this.resources = res.resources));
  }
};
</script>
