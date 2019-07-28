<template>
  <div class="row items-start q-my-md">
    <div class="col-md-3 text-primary text-weight-bold gt-sm">
      {{ label }}
    </div>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-input outlined dense v-model="date" mask="date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateComponent",
  props: {
    label: String
  },
  data() {
    return {
      date: null
    };
  }
};
</script>

<style></style>
