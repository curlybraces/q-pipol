<template>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]">
    <q-btn
      fab
      icon="add"
      color="secondary"
      :to="link" />
  </q-page-sticky>
</template>

<script>
export default {
  name: 'FabComponent',
  props: {
    link: {
      type: String,
      default: '#'
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
