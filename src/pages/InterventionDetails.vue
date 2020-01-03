<template>
  <q-page padding>
    <q-card style="height:80vh;max-width:600px;">
      <div class="q-pa-xs">
        <card-image
          v-if="intervention.commodityGroup"
          :commodityGroup="intervention.commodityGroup"
          :caption="false"
        ></card-image>
        <span class="text-h6">{{ intervention.intervention }}</span>
        <br />
        <span>
          <q-badge
            color="orange"
            :label="intervention.commodityGroup"
            class="q-mr-xs"
          />
          <q-badge color="green" :label="intervention.region" class="q-mr-xs" />
          <q-badge
            color="blue"
            :label="intervention.province"
            class="q-mr-xs"
          />
          <q-badge color="red" :label="intervention.program" class="q-mr-xs" />
        </span>
        <q-separator />
        <div class="text-h5 text-orange q-mt-md">
          PhP {{ intervention.investmentTotal.toLocaleString() }}
        </div>
        <div class="text-weight-bolder q-mt-md">Description:</div>
        {{ intervention.interventionDetails }}
        <div class="text-weight-bolder q-mt-md">Quantity:</div>
        {{ intervention.targetTotal }}
        <div class="text-weight-bolder q-mt-md">Remarks:</div>
        {{ intervention.remarks }}
        <div class="row absolute-bottom q-pa-sm q-col-gutter-x-sm">
          <div class="col-6">
            <q-btn class="full-width" color="amber">ADD TO CART</q-btn>
          </div>
          <div class="col-6">
            <q-btn class="full-width" color="orange">BUY NOW</q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { showErrorMessage } from "../functions/function-show-error-message";
import { Loading } from "quasar";
import axios from "axios";

export default {
  name: "InterventionDetails",
  components: {
    "card-image": () => import("../components/CardImage.vue")
  },
  data() {
    return {
      intervention: {}
    };
  },
  created() {
    Loading.show();
    axios
      .post("http://localhost:8000/graphql", {
        query: `query
            intervention($id: Int!) {
              intervention(id: $id) {
                id
                intervention
                interventionDetails
                commodityGroup
                region
                province
                program
                investmentTotal
                targetTotal
                remarks
              }
            }
          `,
        variables: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        const {
          data: {
            data: { intervention }
          }
        } = res;
        this.intervention = intervention;
        Loading.hide();
      })
      .catch(err => showErrorMessage(err.message));
  }
};
</script>
