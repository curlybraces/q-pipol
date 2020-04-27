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
import PageTitle from '../../ui/page/PageTitle';
import UpdatePassword from '../components/UpdatePassword';
import UpdateProfile from '../components/UpdateProfile';
import VerifyEmail from '../components/VerifyEmail';
import PageContainer from '../../ui/page/PageContainer';

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
