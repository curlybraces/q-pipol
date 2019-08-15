<template>
  <modal
    title="New Thinkings in Agriculture"
    @close="closeDialog"
    @save="saveData">
    <template v-slot:content>
      <q-table
        square
        grid
        dense
        :data="new_thinkings"
        :columns="[{ name: 'label', field: 'label' }]"
        selection="multiple"
        :rows-per-page-options="[10, 20]"
        :selected.sync="selected"
        row-key="name"
        :pagination.sync="pagination"
        hide-header
        hide-bottom
      >
      </q-table>
    </template>
  </modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "../../components/ViewProject/Modal/Modal";

export default {
  components: { Modal },
  name: "NewThinkings",
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
      selected: []
    };
  },
  computed: {
    ...mapState("new_thinkings", ["new_thinkings"])
  },
  methods: {
    ...mapActions("new_thinkings", ["loadNewThinkings"]),
    closeDialog() {
      this.$emit("close");
    },
    saveData() {
      console.log(this.description);
    }
  },
  mounted() {
    this.loadNewThinkings();
  }
};
</script>
