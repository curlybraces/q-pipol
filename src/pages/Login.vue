<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center q-my-xl">APP_LOGO</div>
      <div class="row justify-center">
        <q-card class="my-card">
          <q-card-section>
            Login
          </q-card-section>
          <q-card-section> </q-card-section>
          <q-card-actions align="right"> </q-card-actions>
        </q-card>
      </div>
      <div class="row justify-center q-my-xl">
        APP_FOOTER
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageLogin"
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
