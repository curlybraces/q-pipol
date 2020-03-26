<template>
  <q-page>
    <page-title title="Account"></page-title>

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1 text-primary">Profile</span>
        <p class="text-caption">
          Your profile helps other users of the system identify you. Keep this
          updated.
        </p>
      </div>
      <div
        class="row col-lg-8 col-md-6 col-xs-12 q-col-gutter-sm q-gutter-y-sm"
      >
        <div class="col-lg-1 col-md-2 text-center q-mt-md">
          <q-avatar
            @click="chooseAvatar = true"
            class="cursor-pointer"
            color="green"
          >
            <q-img
              :src="
                image_url
                  ? 'statics/avatars/avatar-' + image_url + '.svg'
                  : 'statics/avatar-placeholder.png'
              "
            />
          </q-avatar>
        </div>

        <div class="col-lg-11 col-md-10 col-sm col-xs">
          <q-form @submit="checkForm">
            <div class="bg-red-1 q-mb-sm q-pa-sm" v-if="errors.length">
              Please check the following:
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </div>

            <text-input
              outlined
              dense
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
    </div>

    <q-separator inset spaced />

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1 text-primary">Password</span>
        <p class="text-caption">
          Your password ensures secured access to your IPM System account and is
          used to log in.
        </p>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12">
        <q-form ref="changePasswordForm" @submit="updatePasswordDialog">
          <span class="text-weight-bold">Current Password</span>
          <q-input outlined dense type="password" v-model="old_password" />
          <p />
          <span class="text-weight-bold">New Password</span>
          <q-input
            outlined
            dense
            type="password"
            v-model="password"
            lazy-rules
            :rules="[
              val =>
                val.length >= 8 || 'Password must be at least 8 characters',
              val =>
                val.toLowerCase() !== 'password' ||
                'Password cannot be password'
            ]"
          />
          <p />
          <span class="text-weight-bold">Confirm New Password</span>
          <q-input
            outlined
            dense
            type="password"
            v-model="password_confirmation"
            lazy-rules
            :rules="[val => val == password || 'Password does not match.']"
          />
          <p />
          <q-btn
            glossy
            label="Update Password"
            class="text-capitalize"
            dense
            color="primary"
            type="submit"
          />
        </q-form>
      </div>
    </div>

    <q-separator inset spaced v-if="!verified" />

    <div class="row q-pa-sm" v-if="!verified">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1 text-primary">Verify Email</span>
        <div class="text-caption">
          Verify your email to secure your account. Your email will be used to
          receive important updates from the System. Your email will also be
          used to retrieve your password. Only users with verified email can
          manage projects.
        </div>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12">
        <q-btn
          outline
          dense
          class="text-capitalize"
          color="primary"
          label="Verify Email"
          @click="verifyEmail"
          :loading="resendingEmail"
        ></q-btn>
      </div>
    </div>

    <q-dialog v-model="chooseAvatar">
      <choose-avatar @close="chooseAvatar = false"></choose-avatar>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TextInput from '../components/FormInputs/TextInput';
import SingleSelect from '../components/FormInputs/SingleSelect';
import ChooseAvatar from '../components/Account/ChooseAvatar';
import PageTitle from '../components/PageTitle';

export default {
  name: 'PageAccount',
  components: { PageTitle, ChooseAvatar, SingleSelect, TextInput },
  data() {
    return {
      showPassword: false,
      rules: {
        required: [val => (val && val.length > 0) || 'Please type something']
      },
      loading: false,
      isEditing: false,
      deactivateAccount: false,
      chooseAvatar: false,
      user: {
        operating_unit_id: null,
        position: null,
        name: null,
        contact_number: null
      },
      errors: [],
      old_password: '',
      password: '',
      password_confirmation: '',
      resendingEmail: false
    };
  },
  computed: {
    ...mapState('auth', [
      'me',
      'email',
      'operating_unit_id',
      'position',
      'name',
      'contact_number',
      'image_url',
      'operating_unit_id',
      'verified'
    ]),
    ...mapState('options', ['operating_units'])
  },
  methods: {
    ...mapActions('auth', [
      'populateUser',
      'updateProfile',
      'resendEmailVerification',
      'updatePassword'
    ]),
    verifyEmail() {
      this.resendingEmail = true;
      this.resendEmailVerification(this.email);
      setTimeout(() => (this.resendingEmail = false), 3000);
    },
    updatePasswordDialog() {
      const { password, old_password, password_confirmation } = this.$data;

      if (!old_password || !password || !password_confirmation) {
        alert('All fields are required.');
      } else {
        this.$q
          .dialog({
            title: 'Update Password',
            message:
              'Changing your password will log you out from the app. You will need to sign in again.',
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            this.updatePassword({
              old_password: old_password,
              password: password,
              password_confirmation: password_confirmation
            });
          });
      }
    },
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
  },
  mounted() {
    this.populateUser();
    this.user = Object.assign({}, this.me);
  }
};
</script>
