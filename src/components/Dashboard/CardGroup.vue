<template>
  <div class="row q-col-gutter-sm">

    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <q-card class="col bg-primary" dark>
        <q-card-section>
          <q-item dense>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Total Projects</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-h2 text-white">
                10
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <q-card class="col bg-secondary" dark>
        <q-card-section>
          <q-item dense>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>My Projects</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-h2 text-white">
                10
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <q-card class="col bg-red" dark>
        <q-card-section>
          <q-item dense>
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Total Projects</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-h2 text-white">
                10
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <q-card class="col bg-accent" dark>
        <q-card-section>
          <q-item dense>
            <q-item-section avatar>
              <q-icon name="notifications" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Notifications</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-h2 text-white">
                10
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CardGroup"
  }
</script>
