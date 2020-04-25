<template>
  <q-card>
    <q-toolbar>
      <q-avatar>
        <q-icon name="edit"></q-icon>
      </q-avatar>
      <q-toolbar-title>
        Financial Accomplishment
      </q-toolbar-title>
    </q-toolbar>
    <q-separator></q-separator>
    <div class="q-pa-md">
      <q-markup-table flat bordered separator="cell">
        <thead>
          <th>Year</th>
          <th>NEP</th>
          <th>GAA</th>
          <th>Disbursement</th>
        </thead>
        <tbody>
          <tr>
            <th>2017</th>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.nep_2017"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.gaa_2017"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.disbursement_2017"
              ></money-input>
            </td>
          </tr>
          <tr>
            <th>2018</th>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.nep_2018"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.gaa_2018"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.disbursement_2018"
              ></money-input>
            </td>
          </tr>
          <tr>
            <th>2019</th>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.nep_2019"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.gaa_2019"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.disbursement_2019"
              ></money-input>
            </td>
          </tr>
          <tr>
            <th>2020</th>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.nep_2020"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.gaa_2020"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.disbursement_2020"
              ></money-input>
            </td>
          </tr>
          <tr>
            <th>2021</th>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.nep_2021"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.gaa_2021"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.disbursement_2021"
              ></money-input>
            </td>
          </tr>
          <tr>
            <th>2022</th>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.nep_2022"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.gaa_2022"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="updatedFinancialAccomplishment.disbursement_2022"
              ></money-input>
            </td>
          </tr>
          <!-- <tr>
            <th>Total</th>
            <td>
              <money-input readonly v-model="nep_total"></money-input>
            </td>
            <td>
              <money-input readonly v-model="gaa_total"></money-input>
            </td>
            <td>
              <money-input readonly v-model="disbursement_total"></money-input>
            </td>
          </tr> -->
        </tbody>
      </q-markup-table>
      <div class="row q-mt-md justify-end q-gutter-md">
        <q-btn flat label="Cancel" @click="$emit('close')" />
        <q-btn
          color="primary"
          label="Save Changes"
          @click="saveFinancialAccomplishment"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  components: {
    'money-input': () => import('../../../modules/shared/components/form-inputs/MoneyInput.vue')
  },
  name: 'FinancialAccomplishment',
  props: ['data'],
  computed: {
    nep_total: {
      get() {
        return (
          parseInt(
            this.updatedFinancialAccomplishment.nep_2017.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.nep_2018.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.nep_2019.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.nep_2020.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.nep_2021.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.nep_2022.replace(/,/g, '')
          )
        );
      },
      set(val) {
        console.log(val);
        this.updatedFinancialAccomplishment.nep_total = val;
      }
    },
    gaa_total: {
      get() {
        return (
          parseInt(
            this.updatedFinancialAccomplishment.gaa_2017.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.gaa_2018.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.gaa_2019.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.gaa_2020.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.gaa_2021.replace(/,/g, '')
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.gaa_2022.replace(/,/g, '')
          )
        );
      },
      set(val) {
        this.updatedFinancialAccomplishment.gaa_total = val;
      }
    },
    disbursement_total: {
      get() {
        return (
          parseInt(
            this.updatedFinancialAccomplishment.disbursement_2017.replace(
              /,/g,
              ''
            )
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.disbursement_2018.replace(
              /,/g,
              ''
            )
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.disbursement_2019.replace(
              /,/g,
              ''
            )
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.disbursement_2020.replace(
              /,/g,
              ''
            )
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.disbursement_2021.replace(
              /,/g,
              ''
            )
          ) +
          parseInt(
            this.updatedFinancialAccomplishment.disbursement_2022.replace(
              /,/g,
              ''
            )
          )
        );
      },
      set(val) {
        this.updatedFinancialAccomplishment.disbursement_total = val;
      }
    }
  },
  data() {
    return {
      updatedFinancialAccomplishment: {}
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    saveFinancialAccomplishment() {
      this.$emit('update:data', this.updatedFinancialAccomplishment);
      setTimeout(() => this.$emit('close'), 500);
    }
  },
  created() {
    this.updatedFinancialAccomplishment = Object.assign({}, this.$props.data);
  }
};
</script>
