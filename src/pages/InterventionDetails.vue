<template>
  <q-page padding>
    <div class="row">
      <q-breadcrumbs>
        <q-breadcrumbs-el :to="{ name: 'home' }">Home</q-breadcrumbs-el>
        <q-breadcrumbs-el :to="{ name: 'interventions' }"
          >Interventions</q-breadcrumbs-el
        >
        <q-breadcrumbs-el>Intervention Details</q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <q-card>
      <div class="row q-pa-md">
        <div class="col-4">
          <commodity-image
            v-if="intervention.commodityGroup"
            :commodityGroup="intervention.commodityGroup"
            :caption="false"
          />
        </div>
        <div class="column col-8 q-pa-md justify-between">
          <div class="text-h6">
            {{
              intervention.intervention == "Others"
                ? intervention.interventionOthers
                : intervention.intervention
            }}
          </div>
          <span>
            <q-badge
              color="orange"
              :label="intervention.commodityGroup"
              class="q-mr-xs"
            />
            <q-badge
              color="green"
              :label="intervention.region"
              class="q-mr-xs"
            />
            <q-badge
              color="red"
              :label="intervention.program"
              class="q-mr-xs"
            />
          </span>
          <div class="text-h5 text-orange q-my-md q-ml-md">
            PhP {{ intervention.investmentTotal.toLocaleString() }}
          </div>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label caption>Location:</q-item-label>
                <q-item-label>{{ intervention.province }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Specific Commodity:</q-item-label>
                <q-item-label>{{ intervention.commodity }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Description:</q-item-label>
                <q-item-label>{{
                  intervention.interventionDetails
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Quantity:</q-item-label>
                <q-item-label>{{ intervention.targetTotal }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Remarks:</q-item-label>
                <q-item-label>{{ intervention.remarks }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />
          <div class="row q-pa-sm">
            <q-btn unelevated color="amber">ADD TO PROJECT</q-btn>
            <q-btn unelevated class="q-ml-sm" color="orange"
              >ADD TO PROGRAM</q-btn
            >
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { showErrorMessage } from "../functions/function-show-error-message";
import { Loading, Dialog } from "quasar";

export default {
  name: "InterventionDetails",
  components: {
    "commodity-image": () => import("../components/CommodityImage.vue")
  },
  data() {
    return {
      intervention: {}
    };
  },
  created() {
    Loading.show();
    this.$axios
      .post("graphql", {
        query: `query
            intervention($id: Int!) {
              intervention(id: $id) {
                id
                intervention
                interventionOthers
                interventionDetails
                commodityGroup
                commodity
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
        if (!intervention) {
          Dialog.create({
            title: "Intervention missing",
            message:
              "The intervention may have been deleted. Click OK to go back.",
            persistent: true
          }).onDismiss(() => {
            this.$router.push("/interventions");
          });
        }
        this.intervention = intervention;
      })
      .catch(err => {
        showErrorMessage(err.message);
        this.$router.go(-1);
      })
      .finally(() => Loading.hide());
  }
};
</script>
