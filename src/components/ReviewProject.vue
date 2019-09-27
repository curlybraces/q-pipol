<template>
  <q-card :dark="dark" :class="dark ? 'bg-grey-10' : 'bg-white'">
    <q-toolbar :class="dark ? 'bg-info' : 'bg-primary' + ' text-white'">
      <q-toolbar-title>Evaluate Project</q-toolbar-title>
      <q-btn flat round dense @click="closeDialog" icon="close" />
    </q-toolbar>
    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section avatar top>
            <q-icon :name="locked ? 'lock' : 'lock_open'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">{{ project.title }}</span>
            </q-item-label>
            <q-item-label caption v-if="locked">
              <span class="text-red text-weight-light text-caption">(Project already evaluated.)</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="local_atm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Financial and Economic Benefits</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria1" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="my_location" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Degree of importance in strengthening the value
              chain
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria2" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="trending_up" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Degree of possible or potential impact or result to the overall
              growth of the sector
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria3" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="compare_arrows" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Level of complementarity to other PAPs (or PAP as a precondition
              for the implementation of other PAPs)
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria4" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="map" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Extent of Coverage</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria5" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="security" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Expanded Vulnerability and Suitability Assessment</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria6" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Urgency</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating size="md" v-model="rating.criteria7" :max="max" :readonly="locked" />
          </q-item-section>
        </q-item>
        <q-separator :dark="dark" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="poll" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-uppercase text-weight-bold">Overall</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-rating
              size="md"
              readonly
              v-model="overall"
              :color="dark ? 'info' : 'primary'"
              :max="max"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions align="right" class="q-pa-md">
      <q-btn icon="save" label="Save" :color="dark ? 'info' : 'primary'" @click="saveRating" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { Notify } from "quasar";
import { mapState } from "vuex";
import { firebaseAuth, firebaseDb } from "boot/firebase";

export default {
  name: "ReviewProject",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rating: {
        criteria1: 1,
        criteria2: 1,
        criteria3: 1,
        criteria4: 1,
        criteria5: 1,
        criteria6: 1,
        criteria7: 1
      },
      locked: false,
      max: 4
    };
  },
  computed: {
    ...mapState("settings", ["dark"]),
    overall() {
      let val1 = parseInt(this.rating.criteria1) || 0;
      let val2 = parseInt(this.rating.criteria2) || 0;
      let val3 = parseInt(this.rating.criteria3) || 0;
      let val4 = parseInt(this.rating.criteria4) || 0;
      let val5 = parseInt(this.rating.criteria5) || 0;
      let val6 = parseInt(this.rating.criteria6) || 0;
      let val7 = parseInt(this.rating.criteria7) || 0;
      let sum = val1 + val2 + val3 + val4 + val5 + val6 + val7;
      let ave = parseFloat(sum / 7);
      return ave;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveRating() {
      let userName = firebaseAuth.currentUser.displayName;
      let ref = firebaseDb.collection("ratings").doc(this.project.id);
      let rating = this.rating;
      rating.projectTitle = this.project.title;
      rating.overall = this.overall;
      rating.ratedBy = userName;
      rating.ratedOn = Date.now();
      ref
        .set({
          rating
        })
        .then(() => {
          Notify.create({
            message: "Successfully rated project."
          });
          this.closeDialog();
        })
        .catch(err => {
          Notify.create(err.message);
        });
    },
    loadRating() {
      let ratingRef = firebaseDb.collection("ratings").doc(this.project.id);
      ratingRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.rating = doc.data().rating;
            this.locked = true;
          }
        })
        .catch(err => {
          Notify.catch(err.message);
        });
    }
  },
  created() {
    this.loadRating();
  }
};
</script>

<style></style>
