<template>
  <q-page>
    <q-item-label header class="q-pa-sm q-mt-lg">Account</q-item-label>

    <div class="row q-pa-sm">
      <div class="col-4">
        <span class="text-subtitle1 text-primary">Profile</span>
        <p class="text-caption">Your email address is your identity on IPM Online System and is used to log in.</p>
      </div>
      <div class="col-8">
        <span class="text-weight-bold">Email Address</span>
        <q-input outlined dense></q-input>
        <p/>
        <span class="text-weight-bold">Name</span>
        <q-input outlined dense></q-input>
      </div>
    </div>

    <q-separator inset spaced/>

    <div class="row q-pa-sm">
      <div class="col-4">
        <span class="text-subtitle1 text-primary">Password</span>
        <p class="text-caption">Your email address is your identity on IPM Online System and is used to log in.</p>
      </div>
      <div class="col-8">
        <span class="text-weight-bold">Current Password</span>
        <q-input outlined dense></q-input>
        <p/>
        <span class="text-weight-bold">New Password</span>
        <q-input outlined dense></q-input>
        <p/>
        <span class="text-weight-bold">Confirm New Password</span>
        <q-input outlined dense></q-input>
        <p/>
        <q-btn outline label="Update Password" class="text-capitalize" dense color="primary" />
      </div>
    </div>

    <q-separator inset spaced/>

    <div class="q-pa-sm">
      <q-card square>
        <div class="text-center">
          <span class="text-h6 text-weight-bold">Account</span>
          <br />
          <span class="text-subtitle1">
            Edit your account settings and change your password here.
          </span>
        </div>
        <q-separator spaced></q-separator>
        <div class="row q-pa-md q-mx-xl">
          <q-form class="col q-gutter-md">
            <q-input
              outlined
              prefix="Your Email is"
              v-model="email"
              readonly
            ></q-input>
          </q-form>
        </div>
        <q-separator spaced />
        <div class="row q-pa-md q-mx-xl">
          <q-form class="col q-gutter-md" @submit="updatePassword">
            <q-item-label header>Change Password</q-item-label>
            <q-input
              outlined
              label="New Password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :rules="[
                val => (val && val.length > 0) || 'Password cannot be empty'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  @click="showPassword = !showPassword"
                ></q-icon>
              </template>
            </q-input>
            <div class="row justify-center">
              <q-btn color="primary" type="submit">SAVE CHANGES</q-btn>
            </div>
          </q-form>
        </div>
        <q-separator spaced />
        <div class="row q-pa-md q-mx-xl">
          <q-form
            class="col q-gutter-md"
            ref="profile"
            @submit="updateProfile()"
          >
            <div class="row">
              <q-item-label header>Profile</q-item-label>
              <q-space />
              <q-avatar
                flat
                dense
                class="text-grey-8 cursor-pointer"
                @click="isEditing = !isEditing"
                v-if="!isEditing"
              >
                <q-icon name="edit" />
              </q-avatar>
            </div>

            <div v-if="$apollo.loading">Loading User Profile...</div>
            <div class="q-gutter-y-md" v-else>
              <q-input
                outlined
                label="Full Name"
                v-model="nameToEdit"
                lazy-rules
                :rules="rules.required"
                :readonly="!isEditing"
              ></q-input>
              <q-select
                outlined
                label="Office"
                :options="operating_units"
                v-model="officeToEdit"
                emit-value
                map-options
                :readonly="!isEditing"
              ></q-select>
              <q-input
                outlined
                v-model="positionToEdit"
                label="Position/Designation"
                hint="Do not abbreviate"
                :rules="rules.required"
                :readonly="!isEditing"
              />
              <q-input
                outlined
                v-model="contactNumberToEdit"
                label="Contact No."
                hint="Include area code"
                :rules="rules.required"
                :readonly="!isEditing"
              />
            </div>

            <div class="row justify-center">
              <q-btn
                color="primary"
                type="submit"
                :loading="loading"
                v-if="isEditing"
                @click="updateProfile()"
                >SAVE CHANGES</q-btn
              >
            </div>
          </q-form>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { Loading } from 'quasar';
import gql from 'graphql-tag';
import { mapState } from 'vuex';

export default {
  name: 'PageAccount',
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
      positionToEdit: null
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
    ...mapState('options',['operating_units'])
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
