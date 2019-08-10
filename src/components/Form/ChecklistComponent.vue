<template>
  <div class="row">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">
      {{ label }}
    </div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-list dense bordered separator>
        <q-item dense v-for="option in options" :key="option.id" :tag="option.name" v-ripple>
          <q-item-section avatar>
            <q-checkbox v-model="selected" :val="option.id" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ option.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      {{ checked }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChecklistComponent',
  props: {
    options: Array,
    label: String
  },
  data () {
    return {
      checked: []
    }
  }
}
</script>

<style>
</style>
