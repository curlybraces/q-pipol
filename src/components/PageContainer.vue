<template>
  <q-page class="q-pt-lg">
    <div class="row">
      <div
        class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
      >
        <slot></slot>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageContainer'
};
</script>
