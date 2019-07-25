<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      class="bg-primary text-grey-4"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
    >
      <q-tab name="login" label="Login" />
      <q-tab name="register" label="Register" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <div class="text-h6">Login</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="register">
        <div class="text-h6">Register</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',
  data() {
  	return {
      tab: 'login'
    }
  }
}
</script>

<style>
</style>
