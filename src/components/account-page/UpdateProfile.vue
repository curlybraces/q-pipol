<template>
  <div class="row q-pa-sm">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Profile</span>
      <p class="text-caption">
        Your profile helps other users of the system identify you. Keep this
        updated.
      </p>
    </div>

    <div class="row col-lg-8 col-md-6 col-xs-12 q-col-gutter-sm q-gutter-y-sm">
      <q-item v-if="loading" class="col">
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
      <q-item class="col" v-if="!loading">
        <q-item-section avatar>
          <q-avatar
            @click="chooseAvatar = true"
            class="cursor-pointer"
            color="green"
          >
            <q-img :src="imageUrl" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="col">
          <q-item-label class="text-weight-bolder">{{
            user.name
          }}</q-item-label>
          <q-item-label caption>{{ user.position }}</q-item-label>
          <q-item-label caption>{{
            user.operating_unit ? user.operating_unit.name : ''
          }}</q-item-label>
          <q-item-label caption>{{ user.contact_number }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="col">
            <q-btn
              @click="showUpdateProfileForm"
              icon="edit"
              outline
              color="secondary"
              dense
            />
          </div>
        </q-item-section>
      </q-item>
    </div>

    <q-dialog v-model="chooseAvatar">
      <choose-avatar @close="chooseAvatar = false"></choose-avatar>
    </q-dialog>

    <q-dialog
      v-model="updateProfileDialog"
      full-height
      :position="$q.screen.xs ? void 0 : 'right'"
      persistent
      :maximized="$q.screen.xs"
      transition-show="jump-left"
      transition-hide="jump-right"
    >
      <q-card style="width:400px;">
        <q-form
          class="fit q-pa-sm q-gutter-y-sm"
          greedy
          @submit.prevent="handleFormSubmit"
          @reset="handleReset"
        >
          <q-toolbar>
            <q-toolbar-title class="text-subtitle1 absolute-center"
              >Update Profile</q-toolbar-title
            >
            <q-space />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="updateProfileDialog = false"
            ></q-btn>
          </q-toolbar>

          <q-separator></q-separator>

          <div class="column">
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
          </div>

          <div class="absolute-bottom q-pa-sm">
            <q-separator class="q-mb-sm" />
            <div class="row justify-end q-col-gutter-sm">
              <div class="col">
                <q-btn
                  outline
                  label="Reset"
                  color="primary"
                  class="full-width"
                  type="reset"
                />
              </div>
              <div class="col">
                <q-btn
                  glossy
                  label="Save"
                  color="primary"
                  type="submit"
                  class="full-width"
                  :loading="loading"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SingleSelect from '../form-inputs/SingleSelect';
import TextInput from '../form-inputs/TextInput';
import ChooseAvatar from './/ChooseAvatar';

export default {
  components: { SingleSelect, TextInput, ChooseAvatar },
  name: 'UpdateProfile',
  data() {
    return {
      chooseAvatar: false,
      errors: [],
      isEditing: false,
      name: null,
      operating_unit_id: null,
      position: null,
      contact_number: null,
      updateProfileDialog: false
    };
  },
  computed: {
    ...mapState('auth', ['user', 'loading']),
    ...mapState('options', ['operating_units']),
    ...mapGetters('auth', ['imageUrl'])
  },
  methods: {
    ...mapActions('auth', ['updateProfile']),
    showUpdateProfileForm() {
      this.name = this.user.name;
      this.operating_unit_id = this.user.operating_unit_id;
      this.position = this.user.position;
      this.contact_number = this.user.contact_number;

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
    }
  }
};
</script>
