<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Profile</span>
      <p class="text-caption">
        Your profile helps other users of the system identify you. Keep this
        updated.
      </p>
    </div>

    <div class="row col-lg-8 col-md-6 col-xs-12 q-col-gutter-sm q-gutter-y-sm">
      <q-item v-if="$apollo.loading" class="col">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="30%" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="25%" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="20%" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="15%" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col" v-if="!$apollo.loading">
        <q-item-section avatar>
          <q-avatar
            @click="chooseAvatar = true"
            class="cursor-pointer"
            color="green"
          >
            <q-img :src="getCurrentUser.avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="col">
          <q-item-label class="text-weight-bolder">
            {{ getCurrentUser.name }}
            <q-icon
              name="edit"
              color="primary"
              class="cursor-pointer"
              @click="showUpdateProfileForm"
            />
          </q-item-label>
          <q-item-label caption>{{ getCurrentUser.position }}</q-item-label>
          <q-item-label caption>{{
            getCurrentUser.operating_unit ? getCurrentUser.operating_unit.name : ''
          }}</q-item-label>
          <q-item-label caption>{{ getCurrentUser.contact_number }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <q-dialog v-model="uploadAvatar">
      <choose-avatar @close="uploadAvatar = false"></choose-avatar>
    </q-dialog> 

    <dialog-container v-model="chooseAvatar">
      <dialog-header title="Upload/Select Avatar" @close="chooseAvatar = false"></dialog-header>

      <q-list class="q-pa-sm">
        <q-item v-for="image in images" :key="image.id" :class="selectedAvatar === image.id ? 'bg-green-3': ''" clickable @click="selectImage(image)">
          <q-item-section avatar>
            <q-avatar>
              <q-img :src="image.dropbox_link" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ image.name }}</q-item-label>
            <q-item-label caption>{{ Math.ceil(image.size / 1000) + ' KB' }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions align="right">
        <q-btn label="Upload" @click="handleUpload"></q-btn>
        <submit-button label="Save" @click="handleChooseAvatar"></submit-button>
      </q-card-actions>
    </dialog-container>

    <dialog-container v-model="updateProfileDialog">
      <dialog-header title="Update Profile" @close="updateProfileDialog = false"></dialog-header>
      <q-form greedy @submit.prevent="handleFormSubmit" @reset="handleReset">
        <div class="column q-pa-sm">
          <div class="bg-red-1 q-mb-sm q-pa-sm" v-if="errors.length">
            Please check the following:
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <text-input
            label="Name"
            v-model="name"
            :rules="[val => !!val || '* Required']"
          ></text-input>

          <single-select
            label="Office"
            :options="operating_units"
            v-model="operating_unit_id"
            :rules="[val => !!val || '* Required']"
          ></single-select>

          <text-input
            v-model="position"
            label="Position/Designation"
            :rules="[val => !!val || '* Required']"
          />

          <text-input
            v-model="contact_number"
            label="Contact No."
            hint="Include area code"
            :rules="[val => !!val || '* Required']"
          />

          <q-card-actions align="right">
            <reset-button label="Reset" @click="handleReset"></reset-button>
            <submit-button label="Save" @click="handleFormSubmit"></submit-button>
          </q-card-actions>
        </div>
      </q-form> 
    </dialog-container>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import TextInput from '@/ui/form-inputs/TextInput';
import ChooseAvatar from './ChooseAvatar';
import { FETCH_OPERATING_UNITS, GET_CURRENT_USER, GET_IMAGES } from '@/graphql/queries'
import DialogContainer from '@/ui/dialogs/DialogContainer'
import DialogHeader from '@/ui/dialogs/DialogHeader'
import SubmitButton from '@/ui/buttons/SubmitButton'
import ResetButton from '@/ui/buttons/ResetButton'

export default {
  components: { SingleSelect, TextInput, ChooseAvatar, DialogContainer, DialogHeader, SubmitButton, ResetButton },
  name: 'UpdateProfile',
  data() {
    return {
      chooseAvatar: false,
      uploadAvatar: false,
      errors: [],
      isEditing: false,
      name: null,
      operating_unit_id: null,
      position: null,
      contact_number: null,
      updateProfileDialog: false,
      getCurrentUser: {},
	    operating_units: [],
      images: [],
      selectedAvatar: null
    };
  },
  apollo: {
    getCurrentUser: {
      query: GET_CURRENT_USER
    },
		operating_units: {
    	query: FETCH_OPERATING_UNITS
		},
    images: {
      query: GET_IMAGES,
      result({ data }) {
        console.log(data.images)
      }
    }
  },
  methods: {
    ...mapActions('auth', ['updateProfile']),
    selectImage(image) {
      this.selectedAvatar = image.id
    },
    handleChooseAvatar() {
      // implement choose avatar mutation
      this.$store.dispatch('profile/chooseAvatar', {
        image_id: this.selectedAvatar
      })
    },
    showUpdateProfileForm() {
      this.name = this.getCurrentUser.name;
      this.operating_unit_id = this.getCurrentUser.operating_unit_id;
      this.position = this.getCurrentUser.position;
      this.contact_number = this.getCurrentUser.contact_number;

      this.updateProfileDialog = true;
    },
    handleReset() {
      this.name = null;
      this.operating_unit_id = null;
      this.position = null;
      this.contact_number = null;
    },
    handleFormSubmit() {
      const { name, operating_unit_id, position, contact_number } = this.$data;
      const payload = {
        name: name,
        operating_unit_id: operating_unit_id,
        position: position,
        contact_number: contact_number
      };
      this.updateProfile(payload);

      setTimeout(() => (this.updateProfileDialog = false), 1000);
    },
    handleUpload() {
      this.chooseAvatar = false
      this.uploadAvatar = true
    }
  }
};
</script>
