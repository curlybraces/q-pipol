<template>
  <q-card square>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-avatar flat dense icon="person" color="white" class="text-primary" />
      <q-toolbar-title>Directory</q-toolbar-title>
      <q-input
        dark
        dense
        rounded
        class="col-6"
        placeholder="Search contacts..."
        v-model="searchTerm"
        @input="searchContacts"
        standout
      >
        <template v-slot:append>
          <q-icon
            name="search"
            @click="searchContacts"
            class="cursor-pointer"
          ></q-icon>
        </template>
      </q-input>
    </q-toolbar>

    <q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>
      <div v-if="error">An error occurred. Please reload the page.</div>
      <div v-if="!loading">
        <template v-if="contactsFiltered.length > 0">
          <div class="row item-start q-col-gutter-md">
            <contact-item
              v-for="contact in contactsFiltered"
              :contact="contact"
              :key="contact.id"
            ></contact-item>
          </div>
        </template>
        <template v-else>
          <q-banner>No contacts yet.</q-banner>
        </template>
      </div>
    </q-card-section>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="create" color="primary" @click="$emit('addContact')" />
    </q-page-sticky>
  </q-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ContactItem from './ContactItem';

export default {
  components: { ContactItem },
  name: 'Directory',
  computed: {
    ...mapState('contacts', ['loading', 'error', 'search']),
    ...mapGetters('contacts', ['contactsFiltered'])
  },
  methods: {
    ...mapActions('contacts', ['fetchContacts', 'setSearch']),
    searchContacts() {
      const searchTerm = this.searchTerm;
      this.setSearch(searchTerm);
    }
  },
  data() {
    return {
      searchTerm: ''
    };
  },
  mounted() {
    this.fetchContacts();
  }
};
</script>
