<template>
  <q-card>
    <q-card-section>
      <q-toolbar>
        <q-avatar icon="person" color="primary" class="text-white" />
        <q-toolbar-title>Contacts</q-toolbar-title>
        <q-input
          outlined
          dense
          rounded
          class="col-6"
          placeholder="Search contacts..."
          v-model="searchTerm"
        >
          <template v-slot:append>
            <q-icon name="search" @click="searchContacts"></q-icon>
          </template>
        </q-input>
      </q-toolbar>
    </q-card-section>
    <q-separator spaced />
    <q-card-section>
      <q-btn
        rounded
        label="Create contact"
        icon="add"
        @click="$emit('addContact')"
      />
    </q-card-section>
    <q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <div v-if="error">An error occurred. Please reload the page.</div>
      <div v-if="!loading">
        <template v-if="contactsFiltered.length">
          <q-item>
            <q-item-section>Name/Designation</q-item-section>
            <q-item-section>Email</q-item-section>
            <q-item-section>Phone Number</q-item-section>
            <q-item-section>Office</q-item-section>
          </q-item>
          <q-separator spaced></q-separator>
          <q-list separator>
            <q-item v-for="contact in contactsFiltered" :key="contact.id">
              <q-item-section avatar>
                <q-avatar
                  class="text-white text-weight-bold"
                  color="orange-10"
                  >{{ contact.name.charAt(0) }}</q-avatar
                >
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label>
                  {{ contact.name }}
                </q-item-label>
                <q-item-label>
                  {{ contact.designation }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="col-3">
                <q-item-label>
                  {{ contact.email }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="col-3">
                <q-item-label> Phone: {{ contact.phone_number }} </q-item-label>
                <q-item-label> Fax: {{ contact.fax_number }} </q-item-label>
              </q-item-section>
              <q-item-section class="col-3">
                <q-item-label>
                  {{
                    contact.operating_unit ? contact.operating_unit.name : null
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Directory",
  computed: {
    ...mapState("contacts", ["loading", "error", "search"]),
    ...mapGetters("contacts", ["contactsFiltered"])
  },
  methods: {
    ...mapActions("contacts", ["fetchContacts", "setSearch"])
  },
  data() {
    return {
      searchTerm: ""
    };
  },
  mounted() {
    this.fetchContacts();
  }
};
</script>
