<template>
  <q-page>
    <q-item-label header class="q-pa-sm q-mt-lg">Account</q-item-label>

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1 text-primary">Profile</span>
        <p class="text-caption">
          Your email address is your identity on IPM Online System and is used
          to log in.
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
                  ? 'statics/avatar/' + image_url + '.svg'
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
            ></text-input>

            <single-select
              label="Office"
              :options="operating_units"
              v-model="user.operating_unit_id"
            ></single-select>

            <text-input v-model="user.position" label="Position/Designation" />

            <text-input
              v-model="user.contact_number"
              label="Contact No."
              hint="Include area code"
            />

            <q-btn
              label="Save Changes"
              class="text-capitalize"
              dense
              color="primary"
              glossy
              type="submit"
              :loading="loading"
            />
          </q-form>
        </div>
      </div>
    </div>

    <q-separator inset spaced />

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1 text-primary">Password</span>
        <p class="text-caption">
          Your email address is your identity on IPM Online System and is used
          to log in.
        </p>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12">
        <span class="text-weight-bold">Current Password</span>
        <q-input outlined dense></q-input>
        <p />
        <span class="text-weight-bold">New Password</span>
        <q-input outlined dense></q-input>
        <p />
        <span class="text-weight-bold">Confirm New Password</span>
        <q-input outlined dense></q-input>
        <p />
        <q-btn
          glossy
          label="Update Password"
          class="text-capitalize"
          dense
          color="primary"
        />
      </div>
    </div>

    <q-separator inset spaced />

    <div class="row q-pa-sm">
      <div class="col-lg-4 col-md-6 col-xs-12">
        <span class="text-subtitle1 text-primary">Deactivate Account</span>
        <div class="text-caption">
          You will not be able to login once you deactivate your account.
          <p>
            <b>Warning: Closing your account is irreversible.</b>
          </p>
        </div>
      </div>
      <div class="col-lg-8 col-md-6 col-xs-12">
        <q-btn
          outline
          dense
          class="text-capitalize"
          color="orange-10"
          label="Deactivate Account"
          @click="deactivateAccount = true"
        ></q-btn>
      </div>
    </div>

    <q-dialog v-model="deactivateAccount">
      <q-card>
        <q-toolbar>
          <q-item class="col">
            <q-item-section>
              <q-item-label> Deactivate Account ({{ email }}) </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                dense
                icon="close"
                @click.stop="deactivateAccount = false"
              ></q-btn>
            </q-item-section>
          </q-item>
        </q-toolbar>
        <q-separator></q-separator>
        <div class="q-pa-sm q-gutter-y-md">
          <div>
            Deactivating your account is irreversible. Enter your IPMS password
            to confirm you want to deactivate this account:
          </div>
          <q-input v-model="password" outlined dense></q-input>
        </div>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="deactivateAccount = false"></q-btn>
          <q-btn
            label="Deactivate Account"
            glossy
            color="orange-10"
            @click="deactivateMyAccount"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="chooseAvatar">
      <choose-avatar @close="chooseAvatar = false"></choose-avatar>
    </q-dialog>
  </q-page>
</template>

<script>
import { Loading } from 'quasar';
import { mapState, mapActions } from 'vuex';
import TextInput from '../components/FormInputs/TextInput';
import SingleSelect from '../components/FormInputs/SingleSelect';
import ChooseAvatar from '../components/Account/ChooseAvatar';

export default {
  name: 'PageAccount',
  components: { ChooseAvatar, SingleSelect, TextInput },
  data() {
    return {
      password: null,
      showPassword: false,
      rules: {
        required: [val => (val && val.length > 0) || 'Please type something']
      },
      loading: false,
      isEditing: false,
      officeToEdit: null,
      nameToEdit: null,
      contactNumberToEdit: null,
      positionToEdit: null,
      deactivateAccount: false,
      chooseAvatar: false,
      user: {
        operating_unit_id: null,
        position: null,
        name: null,
        contact_number: null
      },
      errors: []
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
      'operating_unit_id'
    ]),
    ...mapState('options', ['operating_units'])
  },
  methods: {
    ...mapActions('auth', ['populateUser', 'updateProfile']),
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
        })
        .then(() => this.loading = false);
      }
    },
    updatePassword() {
      Loading.show();
    },
    deactivateMyAccount() {
      alert('deactivate account');
    }
  },
  mounted() {
    this.user = Object.assign({}, this.me);
  },
  created() {
    this.populateUser();
  }
};
</script>
