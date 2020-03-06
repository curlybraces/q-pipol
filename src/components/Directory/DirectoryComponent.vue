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
          @input="searchContacts"
        >
          <template v-slot:append>
            <q-icon name="search" @click="searchContacts" class="cursor-pointer"></q-icon>
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
        <template v-if="contactsFiltered.length > 0">
          <q-list separator>
            <contact-item v-for="contact in contactsFiltered" :contact="contact" :key="contact.id"></contact-item>
          </q-list>
        </template>
        <template v-else>
          <q-banner>No contacts yet.</q-banner>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ContactItem from "./ContactItem";

export default {
  components:{ContactItem},
  name: "Directory",
  computed: {
    ...mapState("contacts", ["loading", "error", "search"]),
    ...mapGetters("contacts", ["contactsFiltered"])
  },
  methods: {
    ...mapActions("contacts", ["fetchContacts", "setSearch"]),
    searchContacts() {
      const searchTerm = this.searchTerm;
      this.setSearch(searchTerm);
    }
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
