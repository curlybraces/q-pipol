<template>
  <q-page class="q-pt-lg">
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

		<!-- Show add contact form -->
		<q-dialog v-model="showAddContactForm" full-height position="right" seamless>
			<q-card style="width:400px;">
    		<contact-form @close="showAddContactForm = false"></contact-form>
			</q-card>
		</q-dialog>

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
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

			<!-- Show Loading -->

      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>

      <div class="row item-start q-col-gutter-md">

        <template v-if="!$apollo.loading && !contacts.length">
          <div>No contacts yet.</div>
        </template>

        <template v-if="!$apollo.loading">
          <contact-item
            v-for="contact in contacts"
            :contact="contact"
            :key="contact.id"
          ></contact-item>
        </template>
      </div>
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
    ...mapState('contacts', ['search', 'error']),
    ...mapGetters('contacts', ['contactsFiltered']),
    ...mapGetters('settings', ['buttonColor']),
    ...mapState('options', ['operating_units']),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    }
  },
  data() {
    return {
	    showAddContactForm: false,
      contacts: []
    };
  },
  methods: {
    ...mapActions('contacts', ['fetchContacts', 'setSearch']),
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
