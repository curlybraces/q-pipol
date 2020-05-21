<template>
  <q-item>
    <q-item-section avatar>
      <q-skeleton type="QAvatar" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" width="90%" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" width="100%" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" width="30%" />
      </q-item-label>
    </q-item-section>

    <q-item-section> </q-item-section>

    <q-item-section>
      <q-skeleton type="text"></q-skeleton>
    </q-item-section>

    <q-item-section side>
      <q-skeleton type="QBtn"></q-skeleton>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ProjectSkeleton'
};
</script>
