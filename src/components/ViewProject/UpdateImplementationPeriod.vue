<template>
  <q-dialog
    v-model="dialog"
    position="bottom"
    square
    persistent>
    <q-card>
      <q-card-section header>
        <div class="row">
          <div class="text-h6">
            Implementation Period
          </div>
          <q-space/>
          <q-btn round dense flat icon="close" @click="dialog = false"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-select
          v-model="implementation_start">
        </q-select>
        <q-select
          v-model="implementation_end">
        </q-select>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <q-space/>
        <q-btn
          label="cancel"
          color="negative"
          />
        <q-btn
          label="save"
          color="primary"
          />
      </q-card-actions>
    </q-card>
  </q-dialog>
<template>

<script>
  export default {
    name: "UpdateImplementationPeriod",
    data() {
      return {
        implementation_start: "",
        implementation_end: ""
      }
    }
  }
</script>
