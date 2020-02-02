<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
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
        <q-form class="col q-gutter-md" ref="profile" @submit="saveProfile">
          <q-item-label header>Profile</q-item-label>
          <q-input
            outlined
            label="Full Name"
            v-model="name"
            lazy-rules
            :rules="rules.required"
          ></q-input>
          <q-select
            outlined
            label="Office"
            :options="OPERATING_UNITS"
            v-model="operating_unit"
            emit-value
            map-options
          ></q-select>
          <q-input
            outlined
            v-model="unit"
            label="Service/Division/Unit"
            hint="Do not abbreviate"
            :rules="rules.required"
          />
          <q-input
            outlined
            v-model="position"
            label="Position/Designation"
            hint="Do not abbreviate"
            :rules="rules.required"
          />
          <div class="row justify-center">
            <q-btn color="primary" type="submit">SAVE CHANGES</q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { axiosInstance } from "boot/axios";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

import { OPERATING_UNITS } from "../data/operating_units";

import { Loading } from "quasar";

export default {
  components: { PageBreadcrumbs },
  name: "UserPage",
  computed: {
    ...mapState("auth", ["email", "name", "operating_unit", "position", "unit"])
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Account"
        }
      ],
      OPERATING_UNITS,
      password: null,
      showPassword: false,
      rules: {
        required: [val => (val && val.length > 0) || "Please type something"]
      }
    };
  },
  methods: {
    saveProfile() {
      this.$refs.profile.validate().then(success => {
        if (success) {
          Loading.show();
          axiosInstance;
        }
      });
    },
    updatePassword() {
      console.log("update password");
      Loading.show();
      axiosInstance
        .post("/graphql", {
          query: `mutation updatePassword($password:String!) {
              updatePassword(password:$password) {
                id
              }
            }`,
          variables: {
            password: this.password
          }
        })
        .then(() => {
          Loading.hide();
        });
    }
  }
};
</script>
