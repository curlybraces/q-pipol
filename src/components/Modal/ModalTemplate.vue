<template>
  <q-card>
    <q-card-section>
      {{ title }}
    </q-card-section>
    <q-card-section>
      <slot name="body"/>
    </q-card-section>
    <q-card-actions>
      
    </q-card-actions>
  </q-card>
</template>

<script>
  export default {
    name: "ModalTemplate",
    props: {
      title: {
        type: String,
        default: "Title"
      }
    }
  }
</script>
