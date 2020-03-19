<template>
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <q-card flat bordered square>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="60%" />
          </q-item-label>
          <q-item-label>
            <q-skeleton type="text" width="50%" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="70%"/>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="60%"/>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="40%"/>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-actions align="right" class="q-gutter-sm">
        <q-skeleton type="QBtn"></q-skeleton>
        <q-skeleton type="QBtn"></q-skeleton>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ContactLoading'
}
</script>
