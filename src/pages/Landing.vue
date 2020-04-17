<template>
  <q-page>
    <div class="row items-center" style="height:80vh;">
      <div
        class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
      >
        <div class="col-6 q-gutter-y-lg text-white text-center justify-center">
          <div class="text-h2 text-weight-bold">
            Investment Programming &amp; <br />
            Management System
          </div>

          <div class="row">
            <div class="offset-4 col-4">
              <q-separator color="secondary" />
            </div>
          </div>

          <div class="text-h5">
            Description of IPMS or something witty
          </div>

          <div class="row justify-center q-gutter-md">
            <q-btn
              size="lg"
              class="text-capitalize text-weight-bolder"
              color="primary"
              style="width: 220px;"
              to="/login"
              v-if="!isLoggedIn"
            >
              Login
            </q-btn>

            <q-btn
              size="lg"
              class="text-capitalize text-weight-bolder"
              outline
              style="width: 220px;"
              to="/manual"
            >
              Learn More
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageLanding',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }
};
</script>
