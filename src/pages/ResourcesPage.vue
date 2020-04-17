<template>
  <q-page class="q-pt-lg">
    <page-title title="Resources">
      <q-btn
        outline
        color="primary"
        class="text-capitalize"
        label="Add Resource"
        @click="createResourceDialog = true"
        v-if="admin"
      ></q-btn>
    </page-title>

    <div class="q-pa-sm">
      <q-inner-loading :showing="loading">
        <q-spinner-tail size="50px"></q-spinner-tail>
      </q-inner-loading>
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
            <q-item-section side v-if="admin">
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

        <div v-if="!loading && !Object.keys(resources).length">
          No resources yet.
        </div>
      </div>
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
        <div class="row justify-between q-pa-sm">
          Create Resource
          <q-icon name="close" v-close-popup class="cursor-pointer"></q-icon>
        </div>
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
import { mapState, mapActions } from 'vuex';
import PageTitle from '../components/PageTitle';
import { openURL, Dialog } from 'quasar';
import TextInput from '../components/form-inputs/TextInput';
import AdminMixins from '../mixins/AdminMixins';

export default {
  name: 'PageResources',
  mixins: [AdminMixins],
  components: { TextInput, PageTitle },
  computed: {
    ...mapState('resources', ['resources', 'loading']),
    ...mapState('settings', ['dense'])
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
      document_type: ''
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
  },
  mounted() {
    this.fetchResources();
  }
};
</script>
