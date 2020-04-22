<template>
  <page-container>
    <!-- Page Title -->
    <page-title title="Directory">
      <q-btn flat round color="primary" icon="settings">
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list>
            <json-excel :data="operating_units">
              <q-item clickable>
                <q-item-section>
                  Download
                </q-item-section>
              </q-item>
            </json-excel>
          </q-list>
        </q-menu>
      </q-btn>
    </page-title>

    <!-- Search operating units -->
    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg justify-center">
        <q-input
          class="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-12"
          dense
          outlined
          placeholder="Filter"
          v-model="searchField"
          ref="searchBox"
          :debounce="500"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-pa-sm item-start q-col-gutter-sm">
      <!-- Show Loading -->
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary" />
      </q-inner-loading>

      <template v-if="!$apollo.loading && !operating_units.length">
        <div>No operating units yet.</div>
      </template>

      <template v-if="!$apollo.loading && operating_units.length">
        <template v-for="ou in filteredOperatingUnits">
          <div
            class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
            :key="ou.id"
          >
            <directory-item
              :ou="ou"
              @upload="uploadImage(ou)"
              @edit="showEditItemDialog(ou)"
            ></directory-item>
          </div>
        </template>
      </template>
    </div>

    <q-dialog v-model="uploadImageDialog">
      <q-uploader
        label="Upload Logo"
        :factory="uploadFileByUploader"
        ref="uploader"
        accept=".jpg, image/*"
      ></q-uploader>
    </q-dialog>

    <q-dialog
      v-model="editItemDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
        <q-toolbar class="bg-info text-white">
          <q-toolbar-title class="absolute-center text-subtitle1"
            >Update Operating Unit</q-toolbar-title
          >
          <q-space />
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="editItemDialog = false"
          ></q-btn>
        </q-toolbar>
        <q-separator />
        <q-form @submit.prevent="handleSubmit" ref="editItemForm" greedy>
          <div class="column q-pa-sm q-gutter-sm">
            <text-input
              label="Name"
              v-model="name"
              :rules="required"
            ></text-input>
            <text-input
              label="Acronym"
              v-model="acronym"
              :rules="required"
            ></text-input>
            <text-input
              label="Head of Agency"
              v-model="agency_head_name"
              :rules="required"
            ></text-input>
            <text-input
              label="Designation/Position of Head of Agency"
              v-model="agency_head_designation"
              :rules="required"
            ></text-input>
            <text-input
              label="Telephone number"
              v-model="telephone_number"
              :rules="required"
            ></text-input>
            <text-input
              label="Fax number"
              v-model="fax_number"
              :rules="required"
            ></text-input>
            <text-input
              label="Email"
              v-model="email"
              :rules="required"
            ></text-input>
          </div>
          <q-card-actions>
            <q-btn
              class="col"
              label="Cancel"
              @click="editItemDialog = false"
              outline
            ></q-btn>
            <q-btn
              class="col"
              label="Save"
              color="primary"
              type="submit"
              :loading="updatingOperatingUnit"
            ></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import JsonExcel from 'vue-json-excel';
import PageTitle from '../components/PageTitle';
import { FETCH_OPERATING_UNITS } from '../graphql/queries';
import DirectoryItem from '../components/Directory/DirectoryItem';
import TextInput from '../components/form-inputs/TextInput';
import { showSuccessNotification } from '../functions/function-show-notifications';
import { UPDATE_OPERATING_UNIT_IMAGE } from '../graphql/mutations';
import { apolloClient } from '../boot/apollo-boost';
import PageContainer from '../components/PageContainer';

export default {
  components: {
    PageContainer,
    TextInput,
    DirectoryItem,
    PageTitle,
    JsonExcel
  },
  name: 'PageDirectory',
  apollo: {
    operating_units: {
      query: FETCH_OPERATING_UNITS
    }
  },
  computed: {
    ...mapGetters('settings', ['buttonColor']),
		...mapGetters('auth',['isAdmin']),
    filteredOperatingUnits() {
      let filteredOperatingUnits = [];
      const operating_units = this.operating_units;
      const searchField = this.searchField.trim().toLowerCase();

      if (searchField) {
        console.log('searching is triggered');

        filteredOperatingUnits = operating_units.filter(ou => {
          const headName = ou.agency_head_name
            ? ou.agency_head_name.toLowerCase()
            : '';

          const name = ou.name ? ou.name.toLowerCase() : '';
          const acronym = ou.acronym ? ou.acronym.toLowerCase() : '';

          return (
            headName.includes(searchField) ||
            name.includes(searchField) ||
            acronym.includes(searchField)
          );
        });

        return filteredOperatingUnits;
      }

      return operating_units;
    }
  },
  data() {
    return {
      updatingOperatingUnit: false,
      uploadImageDialog: false,
      operating_units: [],
      expanded: false,
      searchField: '',
      isActive: null,
      editItemDialog: false,
      id: null,
      name: null,
      acronym: null,
      agency_head_name: null,
      agency_head_designation: null,
      telephone_number: null,
      fax_number: null,
      email: null,
      imageError: null,
      required: [val => !!val || '* Required']
    };
  },
  methods: {
    ...mapActions('operatingUnits', ['updateOperatingUnit']),
    toggleMoreInfo(ou) {
      this.isActive = ou;
    },
    uploadImage(ou) {
      if (!this.isAdmin) {
        console.error('Non-admins are not allowed to access this feature.');
      } else {
        this.id = ou.id;
        this.uploadImageDialog = true;
      }
    },
    showEditItemDialog(ou) {
      const {
        id,
        name,
        acronym,
        agency_head_name,
        agency_head_designation,
        telephone_number,
        fax_number,
        email
      } = ou;

      this.id = id;
      this.name = name;
      this.acronym = acronym;
      this.agency_head_name = agency_head_name;
      this.agency_head_designation = agency_head_designation;
      this.telephone_number = telephone_number;
      this.fax_number = fax_number;
      this.email = email;

      this.editItemDialog = true;
    },
    handleSubmit() {
      this.updatingOperatingUnit = true;
      const payload = {
        id: this.id,
        name: this.name,
        acronym: this.acronym,
        agency_head_name: this.agency_head_name,
        agency_head_designation: this.agency_head_designation,
        telephone_number: this.telephone_number,
        fax_number: this.fax_number,
        email: this.email
      };
      console.log(payload);
      this.updateOperatingUnit(payload).then(() => {
        this.updatingOperatingUnit = false;
        this.editItemDialog = false;
      });
    },
    uploadFileByUploader() {
      const file = this.$refs.uploader.files[0];

      apolloClient
        .mutate({
          mutation: UPDATE_OPERATING_UNIT_IMAGE,
          variables: {
            id: this.id,
            image: file
          }
        })
        .then(() => {
          showSuccessNotification({
            message: 'Successfully changed operating unit image.'
          });
          this.uploadImageDialog = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.keyCode === 70) {
        e.preventDefault();
        this.$refs.searchBox.$el.focus();
      }
    });
  }
};
</script>
