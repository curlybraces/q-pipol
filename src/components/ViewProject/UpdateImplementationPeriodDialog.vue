<template>
  <modal title="Implementation Period" @close="closeDialog" @save="saveData">
    <template v-slot:content>
      <div class="column q-col-gutter-y-md">
        <q-select
          dense
          label="Implementation Start"
          stack-label
          outlined
          v-model="implementation_start"
          :options="implementation_periods"
        >
        </q-select>

        <q-select
          dense
          label="Implementation End"
          stack-label
          outlined
          v-model="implementation_end"
          :options="implementation_periods"
        >
        </q-select>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "UpdateImplementationPeriod",
  data() {
    return {
      dialog: true,
      implementation_start: "",
      implementation_end: ""
    };
  },
  computed: {
    ...mapState("implementation_periods", ["implementation_periods"])
  },
  methods: {
    ...mapActions("implementation_periods", ["loadImplementationPeriods"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.implementation_start, this.implementation_end);
    }
  },
  mounted() {
    this.loadImplementationPeriods();
  }
};
</script>
