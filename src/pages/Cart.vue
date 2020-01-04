<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-9">
        <q-toolbar class="bg-white">
          <q-avatar>
            <q-checkbox v-model="selectAll"></q-checkbox>
          </q-avatar>
          SELECT ALL
          <q-space />
          <q-btn flat icon="far fa-trash-alt" label="delete" dense />
        </q-toolbar>
        <q-card square flat class="q-mt-md">
          <q-toolbar>
            <q-avatar>
              <q-checkbox />
            </q-avatar>
            <q-badge color="red">PSS</q-badge>
            <span class="text-subtitle1 q-ml-sm">
              Intervention
            </span>
            <q-space />
            <span class="">Subtotal: </span>
            <span class="q-ml-md text-weight-bold text-subtitle1 text-orange-9">
              PhP 0.00</span
            >
          </q-toolbar>
          <q-separator spaced />
          <q-list>
            <q-item v-for="i in 5" :key="i">
              <q-item-section avatar top>
                <q-checkbox />
              </q-item-section>

              <q-item-section top class="col-1 gt-sm">
                <q-img
                  src="https://imbindonesia.com/images/placeholder/camera.jpg"
                ></q-img>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Intervention</span>
                </q-item-label>
                <q-item-label caption>
                  Description
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="far fa-trash-alt"
                  />
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="done"
                  />
                  <q-btn size="12px" flat dense round icon="more_vert" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <q-card></q-card>
      </div>
      <div class="col-3">
        <q-card class="q-pa-sm">
          <div class="text-subtitle1">
            Budget Proposal Summary
          </div>
          <div class="row justify-around q-py-md">
            <div class="col">Total</div>
            <div class="col text-right text-weight-bolder">
              PhP Total Amount
            </div>
          </div>
          <q-btn unelevated color="orange-9" class="full-width"
            >PROCEED TO CHECKOUT
          </q-btn>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
      selectAll: false
    };
  }
};
</script>

<style>
.far.fa-trash-alt {
  font-size: 15px;
}
</style>
