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
          {{ project.title }} {{ rating }}
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
            <q-rating size="md" v-model="rating.criteria1"/>
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
            <q-rating size="md" v-model="rating.criteria2"/>
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
            <q-rating size="md" v-model="rating.criteria3"/>
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
            <q-rating size="md" v-model="rating.criteria4"/>
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
            <q-rating size="md" v-model="rating.criteria5"/>
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
            <q-rating size="md" v-model="rating.criteria6"/>
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
            <q-rating size="md" v-model="rating.criteria7"/>
          </q-item-section>
        </q-item>
        <q-separator/>
      </q-list>
    </q-card-section>
    <q-card-actions align="right" class="q-pa-md">
      <q-btn icon="save" label="Save" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
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

      },
      criteria1: null,
      criteria2: null,
      criteria3: null
    }
  }
}
</script>

<style>
</style>
