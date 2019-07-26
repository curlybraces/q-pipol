<template>
  <q-card class="q-my-md">
    <q-card-section
      class="bg-primary text-white"
      dense
    >
      <div class="row align-center">
        <div class="text-weight-bold text-uppercase">
          <slot name="title"/>
        </div>
        <q-space/>
        <q-btn dense flat rounded icon="visibility" @click="show = !show"></q-btn>
      </div>
    </q-card-section>

    <q-separator color="primary"/>

    <q-card-section v-show="show">
      <slot name="content"/>
    </q-card-section>

    <q-card-actions align="center" v-show="show">
      <slot name="actions"/>
    </q-card-actions>

  </q-card>
</template>

<script>
export default {
  name: 'CardComponent',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>
</style>
