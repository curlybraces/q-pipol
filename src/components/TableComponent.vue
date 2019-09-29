<template>
  <div>
    <q-markup-table separator="cell" class="col">
      <thead>
        <tr>
          <th>{{ type }}</th>
          <th>2017</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
          <th>2022</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tableData.length > 0">
          <tr v-for="(comp, index) in tableData" :key="index">
            <td>
              <q-input
                borderless
                dense
                v-model="comp.component"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investment2017"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investment2018"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investment2019"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investment2020"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investment2021"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investment2022"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="comp.investmentTotal"
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
              <q-input
                borderless
                dense
                v-model="newComponent.component"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investment2017"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investment2018"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investment2019"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investment2020"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investment2021"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investment2022"
                ></q-input>
            </td>
            <td>
              <q-input
                borderless
                dense
                v-model="newComponent.investmentTotal"
                ></q-input>
            </td>
            <td class="text-center">
              <q-btn
                flat
                dense
                round
                color="green"
                icon="add_box"
                @click="addComponent"
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
  props: [ "type", "tableData"],
  data() {
    return {
      newComponent: {
        component: "",
        investment2016: 0,
        investment2017: 0,
        investment2018: 0,
        investment2019: 0,
        investment2020: 0,
        investment2021: 0,
        investment2022: 0,
        investment2023: 0
      },
    }
  },
  methods: {
    addComponent() {
      let newComp = this.newComponent
      this.tableData.push({
        component: newComp.component,
        investment2017: newComp.investment2017,
        investment2018: newComp.investment2018,
        investment2019: newComp.investment2019,
        investment2020: newComp.investment2020,
        investment2021: newComp.investment2021,
        investment2022: newComp.investment2022,
        investment2023: newComp.investmentTotal
      });
      newComp = {};
    },
    deleteComponent(index) {
      this.tableData.splice(index, 1);
    }
  }
}
</script>