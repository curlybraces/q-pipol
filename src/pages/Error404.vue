<template>
  <div class="fixed-center text-center">
    <p>
      <img src="statics/404.png" style="width:50vw;max-width:300px;" />
    </p>
    <q-btn
      outline
      color="primary"
      @click="$router.go(-1)"
      icon="home"
      size="lg"
      label="Go Home"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
};
</script>
