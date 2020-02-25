<template>
  <q-list separator>
    <q-item-label header class="text-weight-bolder text-black text-h6"
      >Notifications</q-item-label
    >
    <q-item
      v-for="{ id, created_at, data: { from, title } } in notifications"
      :key="id"
    >
      <q-item-section avatar>
        <q-avatar color="primary" class="text-white">{{
          from.charAt(0)
        }}</q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bolder text-uppercase">{{
          from
        }}</q-item-label>
        <q-item-label lines="2">{{ title }}</q-item-label>
        <q-item-label caption>{{ created_at }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { ME_QUERY } from "../../constants/graphql";

export default {
  name: "RightDrawer",
  data() {
    return {
      notifications: []
    };
  },
  created() {
    this.$apollo
      .query({
        query: ME_QUERY
      })
      .then(res => {
        const notifications = JSON.parse(res.data.me.unreadNotifications);
        this.notifications = Object.assign({}, notifications);
      });
  }
};
</script>
