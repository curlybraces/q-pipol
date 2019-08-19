<template>
  <q-list separator padding dark>
    <q-item-label header>NAVIGATION</q-item-label>

    <template v-for="item in sidemenu">
      <q-item
        :key="item.label"
        exact
        clickable
        :to="item.href"
        exact-active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
          <q-item-label caption>{{ item.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: "DrawerComponent",
  props: {
    sidemenu: Array
  }
};
</script>

<style scoped>
.my-menu-link .q-item__label {
  color: #f9aa33;
}

.my-menu-link .material-icons {
  color: #f9aa33;
}
</style>
