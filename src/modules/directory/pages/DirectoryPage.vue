<template>
  <page-container>
    <!-- Page Title -->
    <page-title title="Directory">
      <settings-button>
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
      </settings-button>
    </page-title>

    <!-- Search operating units -->
    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg justify-center">
        <q-input
          class="col"
          dense
          outlined
          placeholder="Filter"
          v-model="searchField"
          ref="searchBox"
          :debounce="500"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-pa-sm item-start q-col-gutter-sm">
      <!-- Show Loading -->
			<inner-loading :loading="$apollo.loading"></inner-loading>

      <template v-if="!$apollo.loading && !operating_units.length">
        <div>No operating units yet.</div>
      </template>

      <template v-if="!$apollo.loading && operating_units.length">
        <template v-for="ou in filteredOperatingUnits">
          <div
            class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12"
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

    <!-- Upload Image Dialog -->
    <q-dialog v-model="uploadImageDialog">
      <q-uploader
        label="Upload Logo (Max: 50KB)"
        :factory="uploadFileByUploader"
        ref="uploader"
        accept=".jpg, image/*"
        @start="handleStart"
        @finish="uploadImageDialog = false"
      ></q-uploader>
    </q-dialog>

    <!-- Edit Contact Dialog -->
    <dialog-container
      v-model="editItemDialog">
      <dialog-header title="Update Operating Unit" @close="editItemDialog = false"></dialog-header>
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
          ></q-btn>
        </q-card-actions>
      </q-form>
    </dialog-container>
    
  </page-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import JsonExcel from 'vue-json-excel';
import { FETCH_OPERATING_UNITS } from '@/graphql/queries';
import { showErrorNotification } from '@/functions/function-show-notifications';
import InnerLoading from '@/ui/components/InnerLoading'
import PageTitle from '@/ui/page/PageTitle'
import DirectoryItem from '../components/DirectoryItem'
import TextInput from '@/ui/form-inputs/TextInput'
import PageContainer from '@/ui/page/PageContainer'
import SettingsButton from '@/ui/buttons/SettingsButton'
import DialogContainer from '@/ui/dialogs/DialogContainer'
import DialogHeader from '@/ui/dialogs/DialogHeader'

export default {
  components: {
	  InnerLoading,
    PageContainer,
    TextInput,
    DirectoryItem,
    PageTitle,
    JsonExcel,
    SettingsButton,
    DialogContainer,
    DialogHeader
  },
  name: 'PageDirectory',
  computed: {
    ...mapGetters('settings', ['buttonColor']),
    ...mapGetters('auth', ['isAdmin']),
    filteredOperatingUnits() {
      let filteredOperatingUnits = [];
      const operating_units = this.operating_units;
      const searchField = this.searchField.trim().toLowerCase();

      if (searchField) {
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
    ...mapActions('directory', [
      'updateOperatingUnit',
      'updateOperatingUnitImage'
    ]),
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
    handleUploading(info) {
      console.log('uploading');
      console.dir(info);
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

      this.updateOperatingUnit(payload).then(() => {
        this.updatingOperatingUnit = false;
        this.editItemDialog = false;
      });
    },
    uploadFileByUploader() {
      const file = this.$refs.uploader.files[0];

      if (file.size > 50000) {
        showErrorNotification({
          message: 'File is too big.'
        });
        return;
      }

      const payload = {
        id: this.id,
        image: file
      };

      return new Promise((resolve, reject) => {
        try {
          resolve(this.updateOperatingUnitImage(payload));
        } catch (err) {
          reject(err);
        }
      });

      // return this.updateOperatingUnitImage(payload)
    },
    handleStart() {
      console.log('start uploading');
    }
  },
  mounted() {
    this.$store.dispatch('directory/fetchContacts').then(res => this.operating_units = res.operating_units)
  }
};
</script>
