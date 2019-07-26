<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">{{ label }}</div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-option-group
        dense
        :options="options"
        @input="onInput"
        v-model="selected"
        inline>
      </q-option-group>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
</style>
