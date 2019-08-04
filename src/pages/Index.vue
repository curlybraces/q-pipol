<template>
  <q-page padding>
    <p>Index</p>
    <q-form ref="form" @submit.prevent="submit">
      {{ submitStatus }}
      <input-validation
        label="test"
        v-model="test"
        :rules="rules.required"
      ></input-validation>
      <q-btn type="submit" @click="submit">SAVE</q-btn>
    </q-form>
  </q-page>
</template>

<script>
import InputValidation from "../components/InputValidation.vue";

export default {
  components: {
    InputValidation
  },
  name: "PageIndex",
  data() {
    return {
      test: "",
      submitStatus: "",
      rules: {
        required: [v => !!v || "This field is required"]
      }
    };
  },
  methods: {
    submit() {
      //
    }
  },
  mounted() {
    //
  }
};
</script>
