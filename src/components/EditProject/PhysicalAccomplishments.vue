<template>
  <card-component title="Physical Accomplishments">
    <template v-slot:content>
      <select-component label="Categorization"> </select-component>

      <input-component label="UACS Code"></input-component>

      <input-component label="Updates" type="textarea"></input-component>

      <date-component label="As of"></date-component>
    </template>
  </card-component>
</template>

<script>
import CardComponent from "../UI/CardComponent";
import SelectComponent from "../Form/SelectComponent";
import InputComponent from "../Form/InputComponent";
import DateComponent from "../Form/DateComponent";

export default {
  components: {
    CardComponent,
    DateComponent,
    InputComponent,
    SelectComponent
  },
  name: "PhysicalAccomplishments",
  data() {
    return {};
  }
};
</script>
