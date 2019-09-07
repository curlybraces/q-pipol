<template>
  <q-card class="bg-white">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        Evaluate Project
      </q-toolbar-title>
      <q-btn flat round dense @click="$emit('close')" icon="close" />
    </q-toolbar>
    <q-card-section>
      <q-list>
        <q-item-label header>
          {{ project.title }} {{ rating }} {{ overall }}
        </q-item-label>
        <q-item>
          <q-item-section avatar>
            <q-icon name="local_atm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Financial and Economic Benefits
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria1" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="my_location" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Degree of importance in strengthening the value chain
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria2" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="trending_up" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Degree of possible or potential impact or result to the overall growth of the sector
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria3" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="compare_arrows" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Level of complementarity to other PAPs (or PAP as a precondition for the implementation of other PAPs)
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria4" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="map" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Extent of Coverage
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria5" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="security" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Expanded Vulnerability and Suitability Assessment
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria6" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Urgency
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria7" :max="max" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item>
          <q-item-section avatar>
            <q-icon name="poll" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Overall
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" readonly v-model="overall" color="primary" :max="max" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions align="right" class="q-pa-md">
      <q-btn icon="save" label="Save" color="primary" @click="saveRating"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { Notify } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase"

export default {
  name: 'ReviewProject',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rating: {
        criteria1: 1,
        criteria2: 1,
        criteria3: 1,
        criteria4: 1,
        criteria5: 1,
        criteria6: 1,
        criteria7: 1,
      },
      max: 10,
      criteria1: null,
      criteria2: null,
      criteria3: null
    }
  },
  computed: {
    overall() {
      let val1 = parseInt(this.rating.criteria1) || 0
      let val2 = parseInt(this.rating.criteria2) || 0
      let val3 = parseInt(this.rating.criteria3) || 0
      let val4 = parseInt(this.rating.criteria4) || 0
      let val5 = parseInt(this.rating.criteria5) || 0
      let val6 = parseInt(this.rating.criteria6) || 0
      let val7 = parseInt(this.rating.criteria7) || 0
      let sum = val1 + val2 + val3 + val4 + val5 + val6 + val7;
      let ave = parseFloat(sum/7);
      return ave;
    }
  },
  methods: {
    saveRating() {
      let userId = firebaseAuth.currentUser.uid;
      let ref = firebaseDb.collection("ratings").doc(this.project.id)
      let rating = this.rating
      rating.projecTitle = this.project.title;
      rating.overall = this.overall
      rating.addedBy = userId;
      ref.set({
        rating
      })
      .then(() => {
        Notify.create({
          message: "Successfully rated project."
        })
      })
      .catch(err => {
        Notify.create(err.message)
      })
    }
  }
}
</script>

<style>
</style>
