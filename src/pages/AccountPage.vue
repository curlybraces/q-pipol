<template>
  <q-page class="q-pt-lg">
    <page-title title="Account"></page-title>

    <update-profile></update-profile>

    <q-separator inset spaced />

    <update-password></update-password>

    <q-separator inset spaced />

    <verify-email></verify-email>
  </q-page>
</template>

<script>
import PageTitle from '../components/PageTitle';
import UpdatePassword from '../components/account-page/UpdatePassword';
import UpdateProfile from '../components/account-page/UpdateProfile';
import VerifyEmail from '../components/account-page/VerifyEmail';

export default {
  name: 'PageAccount',
  components: { VerifyEmail, UpdateProfile, UpdatePassword, PageTitle }
};
</script>
