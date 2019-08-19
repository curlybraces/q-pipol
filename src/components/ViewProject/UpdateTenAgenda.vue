<template>
  <modal title="Ten Point Agenda" @close="closeDialog" @save="saveData">
    <template v-slot:content>
      <q-option-group
        v-model="agenda"
        :options="ten_point_agenda"
        type="checkbox"
      />
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "UpdateTenAgenda",
  data() {
    return {
      agenda: []
    };
  },
  computed: {
    ...mapState("ten_point_agenda", ["ten_point_agenda"])
  },
  methods: {
    ...mapActions("ten_point_agenda", ["loadTenPointAgenda"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.sustainable_development_goal);
    }
  },
  created() {
    this.loadTenPointAgenda();
  }
};
</script>
