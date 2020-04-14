<template>
  <q-page class="q-pt-lg">
    <!-- Page Title -->
    <page-title title="Directory">
      <q-btn flat round color="primary" icon="build">
        <q-menu transition-show="jump-up" transition-hide="jump-up">
          <q-list>
            <json-excel :data="contacts">
              <q-item clickable>
                <q-item-section>
                  Download
                </q-item-section>
              </q-item>
            </json-excel>
            <q-item clickable @click="showAddContactForm = true">
              <q-item-section>
                Add Contact
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </page-title>

    <!-- Search contacts -->
    <div class="q-mt-md q-pa-sm">
      <div class="row q-mb-lg">
        <q-input
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
          dense
          outlined
          placeholder="Filter Contacts"
          v-model="searchField"
          ref="searchBox"
					:debounce="500"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Show Loading -->
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary" />
      </q-inner-loading>

      <div class="row item-start q-col-gutter-md">
        <template v-if="!$apollo.loading && !contacts.length">
          <div>No contacts yet.</div>
        </template>

        <template v-if="!$apollo.loading">
          <contact-item
            v-for="contact in filteredContacts"
            :contact="contact"
            :key="contact.id"
            @click="openUpdateContactDialog(contact)"
						:search="searchField"
          ></contact-item>
        </template>
      </div>

      <!-- Show add contact form -->
      <q-dialog
        v-model="showAddContactForm"
        full-height
        position="right"
        seamless
        transition-show="jump-left"
        transition-hide="jump-right"
      >
        <q-card style="width:400px;">
          <contact-form
            :contact="newContact"
            title="Create Contact"
            @close="showAddContactForm = false"
            @submit="handleCreateContact"
          >
          </contact-form>
        </q-card>
      </q-dialog>

      <!-- Update Contact form -->
      <q-dialog
        v-model="showUpdateContactForm"
        full-height
        position="right"
        seamless
        transition-show="jump-left"
        transition-hide="jump-right"
      >
        <q-card style="width:400px;">
          <contact-form
            title="Update Contact"
            :contact="contactToEdit"
            @close="showUpdateContactForm = false"
            @submit="handleUpdateContact"
          >
          </contact-form>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ContactItem from '../components/Directory/ContactItem';
import JsonExcel from 'vue-json-excel';
import PageTitle from '../components/PageTitle';
import AdminMixins from '../mixins/AdminMixins';
import { FETCH_CONTACTS } from '../graphql/queries';
import ContactForm from '../components/Directory/ContactForm';

export default {
  components: {
    ContactForm,
    PageTitle,
    ContactItem,
    JsonExcel
  },
  name: 'PageDirectory',
  mixins: [AdminMixins],
  apollo: {
    contacts: {
      query: FETCH_CONTACTS
    }
  },
  computed: {
    ...mapGetters('settings', ['buttonColor']),
    ...mapState('options', ['operating_units']),
		filteredContacts() {
    	const search = this.searchField ? this.searchField.toLowerCase().trim(): '';
			let filteredContacts = []

			if (search) {
				filteredContacts = this.contacts.filter(contact => {
					const name = contact.name ? contact.name.toLowerCase() : ''
					const ou = contact.operating_unit ? contact.operating_unit.name.toLowerCase(): ''
					const acronym = contact.operating_unit ? contact.operating_unit.acronym.toLowerCase(): ''

					return (name.indexOf(search) > -1 || ou.indexOf(search) > -1 || acronym.indexOf(search) > -1)
				})
			} else {
				filteredContacts = this.contacts
			}

			return filteredContacts
		}
  },
  data() {
    return {
      contacts: [],
      searchField: '',
      showAddContactForm: false,
      showUpdateContactForm: false,
      newContact: {
        id: null,
        name: null,
        designation: null,
        operating_unit_id: null,
        email: null,
        phone_number: null,
        fax_number: null
      },
      contactToEdit: {}
    };
  },
  methods: {
    ...mapActions('contacts', ['updateContact', 'createContact']),
    openUpdateContactDialog(contact) {
      const contactToEdit = {
        id: contact.id,
        name: contact.name,
        designation: contact.designation,
        operating_unit_id: contact.operating_unit_id,
        email: contact.email,
        phone_number: contact.phone_number,
        fax_number: contact.fax_number
      };

      this.contactToEdit = contactToEdit;

      this.showUpdateContactForm = true;
    },
    handleUpdateContact(payload) {
      this.updateContact(payload);
      this.showUpdateContactForm = false;
    },
    handleCreateContact(payload) {
      this.createContact(payload);
      this.showAddContactForm = false;
    },
    getOperatingUnit(id) {
      if (!id) {
        return '';
      } else {
        const ou = this.operating_units.filter(
          operating_unit => operating_unit.id === id
        );
        return ou[0]['name'];
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && e.keyCode === 70) {
        e.preventDefault();
        this.$refs.searchBox.$el.focus();
      }
    });
  }
};
</script>
