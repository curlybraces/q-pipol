<template>
  <q-list separator>
    <message />
  </q-list>
</template>

<script>
import Message from "./Message";
export default {
  name: "Messages",
  components: { Message }
};
</script>
