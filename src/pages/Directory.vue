<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <directory @addContact="addContactDialog = true"></directory>
    <q-dialog
      v-model="addContactDialog"
      persistent
      transition-hide="fade"
      transition-show="fade"
    >
      <add-contact @close="addContactDialog = false"></add-contact>
    </q-dialog>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import Directory from "../components/Directory/DirectoryComponent";
import AddContact from "../components/Directory/AddEditContact/AddContact";

export default {
  components: { AddContact, PageBreadcrumbs, Directory },
  name: "PageDirectory",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Directory"
        }
      ],
      addContactDialog: false
    };
  }
};
</script>
