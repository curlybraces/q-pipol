<template>
  <div>
    <div class="q-pa-md bg-white text-center">
      <q-img src="statics/logo.svg" alt="logo" style="max-width: 150px" />
      <br />
      <span class="text-h6">E-PLANNING</span>
    </div>
    <q-separator />
    <q-list>
      <q-item-label header>NAVIGATION</q-item-label>
      <q-item
        v-for="({ label, icon, url }, index) in drawerItems"
        :key="index"
        clickable
        :to="url"
        exact
      >
        <q-item-section avatar>
          <q-icon :name="icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ label }}</q-item-label>
        </q-item-section>
      </q-item>
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
  </div>
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
          url: "/pip"
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
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => alert(data));
    }
  }
};
</script>
