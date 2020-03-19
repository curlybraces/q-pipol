<template>
  <q-page>
    <q-item-label header class="q-pa-sm q-mt-lg">Account</q-item-label>

    <div class="row q-pa-sm">
      <div class="col-4">
        <span class="text-subtitle1 text-primary">Profile</span>
        <p class="text-caption">
          Your email address is your identity on IPM Online System and is used
          to log in.
        </p>
      </div>
      <div class="col-8 q-gutter-y-sm">
        <text-input
          outlined
          dense
          label="Email Address"
          v-model="email"
        ></text-input>

        <text-input
          outlined
          dense
          label="Name"
          v-model="nameToEdit"
        ></text-input>

        <single-select
          label="Office"
          :options="operating_units"
          v-model="officeToEdit"
        ></single-select>

        <text-input
          v-model="positionToEdit"
          label="Position/Designation"
          :rules="rules.required"
        />

        <text-input
          v-model="contactNumberToEdit"
          label="Contact No."
          hint="Include area code"
        />

        <q-btn
          label="Save Changes"
          class="text-capitalize"
          dense
          color="primary"
          glossy
        />
      </div>
    </div>

    <q-separator inset spaced />

    <div class="row q-pa-sm">
      <div class="col-4">
        <span class="text-subtitle1 text-primary">Password</span>
        <p class="text-caption">
          Your email address is your identity on IPM Online System and is used
          to log in.
        </p>
      </div>
      <div class="col-8">
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
      <div class="col-4">
        <span class="text-subtitle1 text-primary">Deactivate Account</span>
        <div class="text-caption">
          You will not be able to login once you deactivate your account.
          <p>
            <b>Warning: Closing your account is irreversible.</b>
          </p>
        </div>
      </div>
      <div class="col-8">
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
  </q-page>
</template>

<script>
import { Loading } from 'quasar';
import gql from 'graphql-tag';
import { mapState } from 'vuex';
import TextInput from '../components/FormInputs/TextInput';
import SingleSelect from '../components/FormInputs/SingleSelect';

export default {
  name: 'PageAccount',
  components: { SingleSelect, TextInput },
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
      deactivateAccount: false
    };
  },
  computed: {
    ...mapState('auth', [
      'email',
      'operating_unit',
      'position',
      'name',
      'contact_number'
    ]),
    ...mapState('options', ['operating_units'])
  },
  methods: {
    updateProfile() {
      this.$refs.profile.validate().then(success => {
        if (success) {
          this.loading = true;
          this.$apollo
            .mutate({
              mutation: gql`
                mutation updateProfile(
                  $name: String!
                  $operating_unit_id: Int!
                  $unit: String!
                  $position: String!
                ) {
                  updateProfile(
                    input: {
                      name: $name
                      operating_unit_id: $operating_unit_id
                      unit: $unit
                      position: $position
                    }
                  ) {
                    id
                  }
                }
              `,
              variables: {
                name: this.me.name,
                operating_unit_id: this.me.profile.operating_unit.id,
                unit: this.me.profile.unit,
                position: this.me.profile.position
              }
            })
            .then(data => {
              this.loading = false;
              this.isEditing = false;
              console.log(data);
            })
            .catch(err => {
              this.loading = false;
              console.log(err.message);
            });
        } else {
          alert('Please check form inputs');
        }
      });
    },
    updatePassword() {
      Loading.show();
    },
    deactivateMyAccount() {
      alert('deactivate account');
    }
  },
  mounted() {
    this.officeToEdit = this.operating_unit;
    this.nameToEdit = this.name;
    this.contactNumberToEdit = this.contact_number;
    this.positionToEdit = this.position;
  }
};
</script>
