<template>
  <q-page padding>
    <p>Add Activity</p>

    <q-form ref="form">
      <card-component title="Add Activity">
        <template v-slot:content>
          <select-component
            label="Operating Unit"
            :options="operating_units"
            v-model="operating_unit"></select-component>

          <select-component
            label="PREXC Activity"
            :options="prexc_activities"
          ></select-component>
        </template>
      </card-component>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardComponent from "../../components/CardComponent.vue";
import SelectComponent from "../../components/SelectComponent.vue";

export default {
  components: {
    CardComponent,
    SelectComponent
  },
  name: "AddActivity",
  data() {
    return {
      operating_unit: null,
      prexc_activity: null
    }
  },
  computed: {
    ...mapState("dropdown", ["prexc_activities","operating_units"])
  },
  methods: {
    ...mapActions("dropdown", ["loadPrexcActivities",'loadOperatingUnits'])
  },
  mounted() {
    this.loadPrexcActivities();
    this.loadOperatingUnits();
  }
};
</script>
