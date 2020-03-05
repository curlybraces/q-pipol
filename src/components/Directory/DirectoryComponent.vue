<template>
<q-card>
  <q-card-section>
    {{loading}}
    {{error}}
    <pre>{{contacts}}</pre>
  </q-card-section>
  <q-card-section>

  </q-card-section>
</q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Directory",
  computed: {
    ...mapState("contacts",["contacts",'loading','error'])
  },
  methods: {
    ...mapActions("contacts",["fetchContacts"])
  },
  mounted() {
    this.fetchContacts();
  }
}
</script>
