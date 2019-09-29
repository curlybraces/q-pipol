<template>
  <q-layout view="lHh LpR lFr">
    <q-header :class="dark ? 'bg-grey-10' : 'bg-primary'" elevated>
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <span class="app-title">{{ appTitle }}</span>
        </q-toolbar-title>

        <q-btn
          outline
          v-if="!loggedIn"
          @click="loginForm = !loginForm"
          label="Login"
        />

        <q-btn v-else outline label="Logout" @click="logoutUser"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :content-class="dark ? 'bg-grey-10' : 'bg-white'"
      :width="250"
    >
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ currentUserDisplayName }}</div>
          <div>{{ currentUserEmail }}</div>
        </div>
      </q-img>
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding dark class="text-grey">
          <q-item-label header class="text-black">NAVIGATION</q-item-label>

          <template v-for="item in sidemenu">
            <q-item
              :key="item.label"
              exact
              clickable
              :to="item.href"
              exact-active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer side="right" v-model="rightDrawerOpen" :width="480" v-if="!loggedIn">
      <q-form class="q-pa-md">
        <div class="text-h5 font-weight-bold">
          {{ loginForm ? "Sign in" : "Sign up" }}
        </div>
        <div class="text-caption">
          <span @click="loginForm = !loginForm">
            {{
              loginForm ? "or create an account" : "or sign in to your account"
            }}
          </span>
        </div>
        <q-input
          outlined
          class="q-my-md"
          placeholder="Name"
          v-model="displayName"
          v-if="!loginForm"
        >
        </q-input>
        <q-input outlined class="q-my-md" placeholder="Email" v-model="email">
        </q-input>
        <q-input
          outlined
          class="q-my-md"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        <q-checkbox
          v-if="!loginForm"
          label="I agree to the terms and conditions of this app."
          v-model="agree"
        ></q-checkbox>
        <q-btn
          :label="loginForm ? 'Sign in' : 'Sign up'"
          color="primary"
          class="full-width q-my-md"
          size="lg"
          type="submit"
          @click="submitForm"
        ></q-btn>
        <div
          v-if="loginForm"
          class="text-subtitle1 text-blue"
          @click="resetPassword"
        >
          Forgot password?
        </div>
      </q-form>
    </q-drawer>

    <q-footer :class="dark ? 'bg-grey-10' : 'bg-primary'" :dark="dark" elevated>
      <q-tabs align="justify" switch-indicator>
        <q-route-tab
          v-for="item in sidemenu"
          :to="item.href"
          :label="item.label"
          :icon="item.icon"
          :key="item.label"
        ></q-route-tab>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { mapState, mapActions } from "vuex";
import { showErrorMessage } from "src/functions/function-show-error-message";

export default {
  name: "MyLayout",
  data() {
    return {
      appTitle: "iPMS",
      copyright: "Made by Mark Lester A. Bolotaolo",
      loginForm: true,
      leftDrawerOpen: false,
      editProfile: false,
      expanded: false,
      notifyUser: false,
      darkMode: false,
      showPassword: false,
      sidemenu: [
        {
          label: "Projects",
          href: "/projects",
          icon: "list",
          caption: "View all projects"
        },
        {
          label: "Settings",
          href: "/settings",
          icon: "settings",
          caption: "Change user and system settings"
        },
        {
          label: "Account",
          href: "/account",
          icon: "person",
          caption: "Account Information"
        }
      ],
      email: "",
      password: "",
      displayName: "",
      agree: false
    };
  },
  computed: {
    ...mapState("auth", [
      "loggedIn",
      "currentUserEmail",
      "currentUserDisplayName"
    ]),
    ...mapState("settings", ["dark"]),
    rightDrawerOpen() {
      return !this.loggedIn;
    }
  },
  methods: {
    openURL,
    ...mapActions("auth", [
      "loginUser",
      "registerUser",
      "logoutUser",
      "resetPassword"
    ]),
    ...mapActions("settings", ["setDark"]),
    resetPassword() {
      this.$q
        .dialog({
          title: "Reset Password",
          message: "Enter your email below.",
          prompt: {
            model: "",
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          firebaseAuth
            .sendPasswordResetEmail(data)
            .then(() => {
              alert(
                "Password reset email sent to the following email: " + data
              );
            })
            .catch(err => {
              showErrorMessage(err.message);
            });
        });
    },
    submitForm() {
      if (!this.email || !this.password) {
        showErrorMessage("Email and password is required.");
      } else {
        if (this.loginForm) {
          this.loginUser({
            email: this.email,
            password: this.password
          });
        } else {
          if (!this.displayName) {
            showErrorMessage("Please tell us what to call you.");
          } else {
            if (!this.agree) {
              showErrorMessage(
                "You must agree with the terms and conditions of this app."
              );
            } else {
              this.registerUser({
                email: this.email,
                password: this.password,
                displayName: this.displayName
              });
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.app-title {
  font-family: PrimeTime;
}

.my-menu-link .q-item__label {
  color: #25CCF7;
}

.my-menu-link .material-icons {
  color: #25CCF7;
}

@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>