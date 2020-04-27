<template>
  <q-card>
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
