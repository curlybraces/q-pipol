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
        <q-form class="col q-gutter-md" ref="profile" @submit="saveProfile">
          <q-item-label header>Profile</q-item-label>
          <q-input
            outlined
            label="Full Name"
            v-model="user.name"
            lazy-rules
            :rules="rules.required"
          ></q-input>
          <q-select
            outlined
            label="Office"
            :options="OPERATING_UNITS"
            v-model="user.operating_unit"
            emit-value
            map-options
          ></q-select>
          <q-input
            outlined
            v-model="user.unit"
            label="Service/Division/Unit"
            hint="Do not abbreviate"
            :rules="rules.required"
          />
          <q-input
            outlined
            v-model="user.position"
            label="Position/Designation"
            hint="Do not abbreviate"
            :rules="rules.required"
          />
          <div class="row justify-center">
            <q-btn color="primary" type="submit" :loading="loading"
              >SAVE CHANGES</q-btn
            >
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { axiosInstance } from "boot/axios";
import { retrieveUserInfo } from "../functions/function-retrieve-user-info";
import { updateProfile } from "../functions/function-update-profile";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

import { OPERATING_UNITS } from "../data/operating_units";

import { Loading } from "quasar";

export default {
  components: { PageBreadcrumbs },
  name: "UserPage",
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
      },
      user: {
        name: null,
        operating_unit: null,
        unit: null,
        position: null
      },
      loading: false
    };
  },
  methods: {
    saveProfile() {
      this.$refs.profile.validate().then(success => {
        if (success) {
          this.loading = true;
          updateProfile(this.user).then(() => (this.loading = false));
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
    },
    retrieveData() {
      retrieveUserInfo().then(res => {
        this.email = res.email;
        this.user.name = res.name;
        this.user.operating_unit = res.profile.operating_unit.id;
        this.user.unit = res.profile.unit;
        this.user.position = res.profile.position;
      });
    }
  },
  created() {
    this.retrieveData();
  }
};
</script>
