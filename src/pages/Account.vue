<template>
  <q-page padding>
      <p>Account</p>

      <div class="row">
          <q-card class="col-4">
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
              {{ user }}
              <q-list>
                  <q-item>
                      <q-item-section avatar>
                          <q-icon color="primary" name="person" />
                      </q-item-section>

                      <q-item-section>
                          <q-input
                            label="Name"
                            stack-label
                            outlined
                            dense
                            v-model="name"
                            />
                      </q-item-section>
                  </q-item>

                  <q-item>
                      <q-item-section avatar>
                          <q-icon color="primary" name="assignment_ind" />
                      </q-item-section>

                      <q-item-section>
                          <q-input
                              label="Position"
                              stack-label
                              outlined
                              dense
                              v-model="position"
                          />
                      </q-item-section>
                  </q-item>

                  <q-item>
                      <q-item-section avatar>
                          <q-icon color="positive" name="account_balance" />
                      </q-item-section>

                      <q-item-section>
                          <q-select
                            :options="operating_units"
                            label="Office"
                            stack-label
                            outlined
                            dense
                            v-model="operating_unit"
                          />
                      </q-item-section>
                  </q-item>

                  <q-item>
                      <q-item-section avatar>
                          <q-icon color="amber" name="phone" />
                      </q-item-section>

                      <q-item-section>
                          <q-input
                            label="Contact Number"
                            stack-label
                            outlined
                            dense
                            v-model="contact_information"
                            mask="###-###-####"
                              />
                      </q-item-section>
                  </q-item>
              </q-list>
          </q-card>
      </div>

  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PageAccount",
  data() {
      return {}
  },
  computed: {
    ...mapState("auth",["user"]),
    name() {
      return this.user.name;
    }

  }
};
</script>
