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
            Implementation Bases
          </div>
          <q-space/>
          <q-btn round dense flat icon="close" @click="dialog = false"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-option-group
        v-model="implementation_basis_id"
        :options="implementation_bases"
        type="checkbox"/>
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
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "UpdateImplementationBasesDialog",
    data() {
      return {
        implementation_basis_id: [],
        dialog: true
      }
    },
    computed: {
      ...mapState("implementation_bases",["implementation_bases"])
    },
    methods: {
      ...mapActions("implementation_bases",["loadImplementationBases"])
    },
    mounted() {
      this.loadImplementationBases();
    }
  }
</script>
