<template>
  <q-page padding>
    <p>Dashboard</p>

    <welcome-dialog />

    <div class="row q-col-gutter-sm">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
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
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-secondary" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Total Projects</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-accent" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Total Projects</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-card class="col bg-positive" dark>
          <q-card-section>
            <q-item dense>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Total Projects</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-h2">
                  10
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import WelcomeDialog from "../components/Dashboard/WelcomeDialog";

export default {
  name: "PageIndex",
  components: {
    WelcomeDialog
  },
  data() {
    return {
    };
  },
  mounted() {}
};
</script>
