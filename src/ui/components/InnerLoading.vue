<template>
  <q-inner-loading :showing="loading">
    <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
    <span class="text-primary q-mt-md">{{ message }}</span>
  </q-inner-loading>
</template>

<script>
export default {
  name: 'InnerLoading',
  props: ['loading', 'message']
};
</script>
