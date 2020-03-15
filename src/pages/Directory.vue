<template>
  <q-page>
<!--    <page-breadcrumbs :breadcrumbs="breadcrumbs" />-->

    <div class="q-pa-sm">
      <directory @addContact="addContactDialog = true"></directory>
    </div>

    <q-dialog
      v-model="addContactDialog"
      persistent
      transition-hide="fade"
      transition-show="fade"
      maximized
    >
      <add-contact @close="addContactDialog = false"></add-contact>
    </q-dialog>
  </q-page>
</template>

<script>
// import PageBreadcrumbs from '../components/PageBreadcrumbs';
import Directory from '../components/Directory/DirectoryComponent';
import AddContact from '../components/Directory/AddEditContact/AddContact';

export default {
  // components: { AddContact, PageBreadcrumbs, Directory },
  components: { AddContact, Directory },
  name: 'PageDirectory',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Directory'
        }
      ],
      addContactDialog: false
    };
  }
};
</script>
