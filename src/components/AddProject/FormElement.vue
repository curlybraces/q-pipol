<template>
  <div class="row items-center q-my-md">
    <label-component>{{ label }}</label-component>
    <div class="col-md-9 col-sm-12 col-xs-12">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import LabelComponent from "../../components/FormInputs/LabelComponent";

  export default {
    components: {
      LabelComponent
    },
    name: "FormElement",
    props: {
      label: String
    }
  }
</script>
