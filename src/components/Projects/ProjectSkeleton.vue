<template>
  <div>
    <q-item class="col" v-for="i in 5" :key="i">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>
      <q-item-section class="col-6">
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="65%" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="35%" />
        </q-item-label>
      </q-item-section>
      <q-item-section></q-item-section>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-skeleton type="QBtn" width="25px" dense />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "ProjectSkeleton"
}
</script>
