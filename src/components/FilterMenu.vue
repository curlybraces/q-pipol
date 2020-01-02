<template>
  <div class="q-py-md">
    <span class="title">
      {{ title.toUpperCase() }}
    </span>
    <q-option-group
      :options="expanded ? options : options.slice(0, 5)"
      type="checkbox"
      class="cb"
      v-model="group"
      dense
    />
    <a href="#" class="text-weight-bold" @click="expanded = !expanded">
      VIEW {{ expanded ? "LESS" : "MORE" }}
    </a>
  </div>
</template>

<script>
export default {
  name: "FilterMenu",
  props: {
    title: String,
    options: Array
  },
  data() {
    return {
      group: [],
      expanded: false,
      val: false
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

.cb >>> .q-checkbox--dense .q-checkbox__bg {
  border-width: 1px;
}
</style>
