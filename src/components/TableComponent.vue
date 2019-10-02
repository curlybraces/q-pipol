<template>
  <div class="col">
    <q-btn
      flat
      class="text-grey"
      label="Add"
      icon="add"
      @click="addMore"
    ></q-btn>
    <q-markup-table separator="cell" class="col">
      <thead>
        <tr>
          <th>{{ type }}</th>
          <th>2016 &amp; Prior</th>
          <th>2017</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
          <th>2022</th>
          <th>2023 &amp; Beyond</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tableData.length > 0">
          <tr v-for="(data, index) in tableData" :key="index">
            <td>
              <q-input borderless dense v-model="data.component"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2016"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2017"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2018"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2019"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2020"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2021"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2022"></q-input>
            </td>
            <td>
              <q-input borderless dense v-model="data.investment2023"></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="data.investmentTotal"
              ></q-input>
            </td>
            <td class="text-center">
              <q-btn
                flat
                dense
                round
                color="red"
                icon="delete"
                @click="deleteComponent(index)"
              ></q-btn>
            </td>
          </tr>
        </template>
        <tr>
          <td>
            <q-input borderless dense v-model="newData.component"></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2016"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2017"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2018"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2019"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2020"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2021"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2022"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              v-model="newData.investment2023"
            ></q-input>
          </td>
          <td>
            <q-input
              borderless
              dense
              readonly
              v-model="newData.investmentTotal"
            ></q-input>
          </td>
          <td class="text-center">
            <q-btn
              flat
              dense
              round
              color="green"
              icon="add_box"
              @click="addData"
            ></q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: ["type", "tableData"],
  data() {
    return {
      newData: {
        component: "",
        investment2016: 0,
        investment2017: 0,
        investment2018: 0,
        investment2019: 0,
        investment2020: 0,
        investment2021: 0,
        investment2022: 0,
        investment2023: 0
      }
    };
  },
  computed: {
    investmentTotal() {
      return null;
    }
  },
  methods: {
    addData() {
      let newData = this.newData;
      this.tableData.push({
        component: newData.component,
        investment2017: newData.investment2017,
        investment2018: newData.investment2018,
        investment2019: newData.investment2019,
        investment2020: newData.investment2020,
        investment2021: newData.investment2021,
        investment2022: newData.investment2022,
        investment2023: newData.investmentTotal
      });
      newData = {};
    },
    deleteComponent(index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>
