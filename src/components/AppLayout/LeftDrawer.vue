<template>
  <q-scroll-area
    style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
  >
    <q-list padding dark class="text-grey">
      <q-item-label header class="text-black">NAVIGATION</q-item-label>

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
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  name: "LeftDrawer",
  props: ["sidemenu"]
};
</script>

<style scoped>
.my-menu-link .q-item__label {
  color: #25ccf7;
}

.my-menu-link .material-icons {
  color: #25ccf7;
}
</style>