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
        <q-form class="col q-gutter-md" ref="profile" @submit="saveProfile">
          <q-item-label header>Profile</q-item-label>
          <q-input
            outlined
            label="Full Name"
            v-model="fullName"
            lazy-rules
            :rules="rules.required"
          ></q-input>
          <q-select
            outlined
            label="Office"
            :options="OPERATING_UNITS"
            v-model="office"
          ></q-select>
          <q-input
            outlined
            v-model="office_address"
            label="Office Address"
            :rules="rules.required"
          />
          <q-input
            outlined
            v-model="unit"
            label="Office/Unit/Division"
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
      <q-separator spaced />
      <div class="row q-pa-md q-mx-xl" v-if="signInProvider == 'password'">
        <q-form class="col q-gutter-md">
          <q-item-label header>Change Password</q-item-label>
          <q-input outlined label="Old Password" type="password"></q-input>
          <q-input outlined label="New Password" type="password"></q-input>
          <div class="row justify-center">
            <q-btn color="primary" type="submit">SAVE CHANGES</q-btn>
          </div>
        </q-form>
      </div>
      <q-separator spaced v-if="signInProvider == 'password'" />
      <div class="row q-pa-md justify-center">
        <q-btn color="negative" label="Close Account"></q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";

import { OPERATING_UNITS } from "../data/dropdown-values";

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
      office: null,
      unit: null,
      position: null,
      office_address: null,
      fullName: null,
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
        }
      });
    }
  }
};
</script>
