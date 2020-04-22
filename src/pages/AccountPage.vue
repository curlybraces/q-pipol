<template>
  <page-container>
    <page-title title="Account"></page-title>

    <update-profile></update-profile>

    <q-separator inset spaced />

    <update-password></update-password>

    <q-separator inset spaced />

    <verify-email></verify-email>
  </page-container>
</template>

<script>
import PageTitle from '../components/PageTitle';
import UpdatePassword from '../components/account-page/UpdatePassword';
import UpdateProfile from '../components/account-page/UpdateProfile';
import VerifyEmail from '../components/account-page/VerifyEmail';
import PageContainer from '../components/PageContainer';

export default {
  name: 'PageAccount',
  components: {
    PageContainer,
    VerifyEmail,
    UpdateProfile,
    UpdatePassword,
    PageTitle
  }
};
</script>
