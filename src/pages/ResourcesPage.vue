<template>
  <q-page class="q-pt-lg">
    <page-title title="Resources">
      <q-btn flat round color="primary" icon="settings">
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
      </q-btn>
    </page-title>

    <!--		 -->

    <div class="q-pa-sm">
      <template v-if="$apollo.loading">
        <q-inner-loading :showing="$apollo.loading">
          <q-spinner-tail size="50px"></q-spinner-tail>
        </q-inner-loading>
      </template>
      <template v-else>
        <div class="row q-gutter-sm">
          <q-list bordered separator v-if="Object.keys(resources).length">
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

          <div v-if="!$apollo.loading && !resources.length">
            No resources yet.
          </div>
        </div>
      </template>
    </div>

    <q-dialog
      v-model="createResourceDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <q-card :style="$q.screen.xs ? void 0 : 'width:400px'">
        <q-toolbar class="bg-info text-white">
          <q-toolbar-title class="absolute-center text-subtitle1"
            >Create Resource</q-toolbar-title
          >
          <q-space />
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="createResourceDialog = false"
          ></q-btn>
        </q-toolbar>
        <q-separator></q-separator>
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
            <span
              class="text-caption text-weight-bold q-mt-md"
              :rules="required"
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
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PageTitle from '../components/PageTitle';
import { openURL, Dialog } from 'quasar';
import TextInput from '../components/form-inputs/TextInput';
import { FETCH_RESOURCES_QUERY } from '../graphql/queries';

export default {
  name: 'PageResources',
  components: { TextInput, PageTitle },
  apollo: {
    resources: {
      query: FETCH_RESOURCES_QUERY
    }
  },
  computed: {
    // ...mapState('resources', ['resources', 'loading']),
    ...mapState('settings', ['dense']),
    ...mapGetters('auth', ['isAdmin'])
  },
  data() {
    return {
      createResourceDialog: false,
      document_types: ['PDF', 'DOC', 'XLS', 'PPT', 'PNG', 'OTHERS'],
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
          console.log('Please check inputs');
        }
      });
    }
  }
};
</script>
