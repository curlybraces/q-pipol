<template>
  <a role="button" @click="$emit('callback')">
    <q-icon
      name="img:statics/icons/content_copy-black-18dp.svg"
      class="text-secondary"
    ></q-icon>
  </a>
</template>

<script>
export default {
  name: 'CopyButton'
};
</script>
