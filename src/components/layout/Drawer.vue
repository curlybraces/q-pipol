<template>
  <q-list>
    <div class="q-pa-md bg-white text-center">
      <q-img src="statics/logo.svg" alt="logo" style="max-width: 150px" />
      <br />
      <span class="text-h6">E-PLANNING</span>
    </div>
    <q-separator />

    <q-item-label header>NAVIGATION</q-item-label>

    <template v-for="({ label, icon, url, submenu }, index) in drawerItems">
      <template v-if="submenu">
        <q-expansion-item
          :key="index"
          expand-separator
          icon="list"
          label="Projects"
        >
          <q-item
            v-for="({ label, icon, url }, index) in submenu"
            :header-inset-level="1"
            expand-separator
            :key="index"
            :to="url"
            exact
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="icon" />
            </q-item-section>
            <q-item-section>{{ label }}</q-item-section>
          </q-item>
        </q-expansion-item>
      </template>
      <template v-else>
        <q-item :key="index" clickable :to="url" exact>
          <q-item-section avatar>
            <q-icon :name="icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </template>
    <q-separator />
    <q-item clickable @click="showHelp">
      <q-item-section avatar>
        <q-icon name="help" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Help
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "DrawerContent",
  data() {
    return {
      drawerItems: [
        {
          label: "Home",
          icon: "home",
          url: "/"
        },
        {
          label: "Projects",
          icon: "list",
          url: "/pip",
          submenu: [
            {
              label: "Add Project",
              icon: "playlist_add",
              url: "/pip/new"
            },
            {
              label: "View Projects",
              icon: "list",
              url: "/pip"
            },
            {
              label: "Deleted Projects",
              icon: "delete",
              url: "/trash"
            }
          ]
        },
        {
          label: "Account",
          icon: "person",
          url: "/user"
        },
        {
          label: "Settings",
          icon: "settings",
          url: "/settings"
        }
      ]
    };
  },
  methods: {
    showHelp() {
      this.$q
        .dialog({
          title: "Help",
          message: "Need help? Send us a message.",
          prompt: {
            model: "",
            type: "text",
            isValid: val => val.length > 5
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => alert(data));
    }
  }
};
</script>

<style>
.q-router-link--exact-active {
  font-weight: bold;
}
</style>
