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
      <div class="col-lg-1 col-md-2 text-center q-mt-md">
        <q-avatar
          @click="chooseAvatar = true"
          class="cursor-pointer"
          color="green"
        >
          <q-img :src="imageUrl" />
        </q-avatar>
      </div>

      <div class="col-lg-11 col-md-10 col-sm col-xs">
        <q-form @submit.prevent="checkForm">
          <div class="bg-red-1 q-mb-sm q-pa-sm" v-if="errors.length">
            Please check the following:
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <text-input
            label="Name"
            v-model="user.name"
            :readonly="!isEditing"
          ></text-input>

          <single-select
            label="Office"
            :options="operating_units"
            v-model="user.operating_unit_id"
            :readonly="!isEditing"
          ></single-select>

          <text-input
            v-model="user.position"
            label="Position/Designation"
            :readonly="!isEditing"
          />

          <text-input
            v-model="user.contact_number"
            label="Contact No."
            hint="Include area code"
            :readonly="!isEditing"
          />

          <div class="q-mt-md">
            <q-btn
              label="Save Changes"
              class="text-capitalize"
              dense
              color="primary"
              glossy
              type="submit"
              :loading="loading"
              v-show="isEditing"
            />

            <q-btn
              label="Edit Information"
              class="text-capitalize"
              dense
              color="primary"
              outline
              @click="isEditing = true"
              v-show="!isEditing"
            />
          </div>
        </q-form>
      </div>
    </div>

    <q-dialog v-model="chooseAvatar">
      <choose-avatar @close="chooseAvatar = false"></choose-avatar>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SingleSelect from '../FormInputs/SingleSelect';
import TextInput from '../FormInputs/TextInput';
import ChooseAvatar from '../Account/ChooseAvatar';

export default {
  components: { SingleSelect, TextInput, ChooseAvatar },
  name: 'UpdateProfile',
  data() {
    return {
      chooseAvatar: false,
      errors: [],
      isEditing: false,
      user: {
        name: null,
        operating_unit_id: null,
        position: null,
        contact_number: null
      },
      loading: false
    };
  },
  computed: {
    ...mapState('auth', ['me']),
    ...mapState('options', ['operating_units']),
    ...mapGetters('auth', ['imageUrl'])
  },
  methods: {
    ...mapActions('auth', ['updateProfile']),
    checkForm() {
      this.errors = [];
      const { name, operating_unit_id, position, contact_number } = this.user;

      if (!name) {
        this.errors.push('Name is required');
      }

      if (!operating_unit_id) {
        this.errors.push('Office is required');
      }

      if (!position) {
        this.errors.push('Position/designation is required');
      }

      if (!contact_number) {
        this.errors.push('Contact number is required');
      }

      if (!this.errors.length) {
        this.loading = true;
        this.updateProfile({
          name: name,
          operating_unit_id: operating_unit_id,
          position: position,
          contact_number: contact_number
        }).then(() => {
          this.loading = false;
          this.isEditing = false;
        });
      }
    }
  }
};
</script>
