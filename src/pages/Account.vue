<template>
  <q-page>
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
import UpdatePassword from '../components/Account/UpdatePassword';
import UpdateProfile from '../components/Account/UpdateProfile';
import VerifyEmail from '../components/Account/VerifyEmail';

export default {
  name: 'PageAccount',
  components: { VerifyEmail, UpdateProfile, UpdatePassword, PageTitle }
};
</script>
