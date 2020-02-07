<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />

    <q-card class="bg-white">
      <div class="row q-pa-md justify-end">
        <q-btn
          @click="addRow = !addRow"
          label="Add Row"
          color="primary"
        ></q-btn>
      </div>
      <div class="row q-pa-md">
        <q-markup-table class="col">
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-right">2017</th>
              <th class="text-right">2018</th>
              <th class="text-right">2019</th>
              <th class="text-right">2020</th>
              <th class="text-right">2021</th>
              <th class="text-right">2022</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="rows.length">
              <tr v-for="(row, index) in rows" :key="index">
                <td class="text-left">{{ row.title }}</td>
                <td class="text-right">{{ row.input1 }}</td>
                <td class="text-right">{{ row.input2 }}</td>
                <td class="text-right">{{ row.input3 }}</td>
                <td class="text-right">{{ row.input4 }}</td>
                <td class="text-right">{{ row.input5 }}</td>
                <td class="text-right">{{ row.input6 }}</td>
                <td class="text-right">
                  <q-icon name="edit" />
                  <q-icon name="delete" />
                </td>
              </tr>
            </template>
            <template v-else>
              No data to show
            </template>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>

    <q-dialog v-model="addRow">
      <q-card class="q-pa-sm" style="width:400px;">
        <q-form class="q-gutter-y-md">
          <q-item-label>Add Row</q-item-label>
          <q-input outlined v-model="title"></q-input>
          <q-input outlined v-model="input1"></q-input>
          <q-input outlined v-model="input2"></q-input>
          <q-input outlined v-model="input3"></q-input>
          <q-input outlined v-model="input4"></q-input>
          <q-input outlined v-model="input5"></q-input>
          <q-input outlined v-model="input6"></q-input>
          <q-btn
            class="full-width"
            color="primary"
            label="Add Row"
            @click="addData"
          ></q-btn>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: { PageBreadcrumbs },
  computed: {
    contracted() {
      return !this.$q.screen.gt.md;
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Projects",
          url: "/projects"
        },
        {
          title: "Create Project"
        }
      ],
      addRow: false,
      title: null,
      input1: null,
      input2: null,
      input3: null,
      input4: null,
      input5: null,
      input6: null,
      rows: []
    };
  },
  methods: {
    addData() {
      this.rows.push({
        title: this.title,
        input1: this.input1,
        input2: this.input2,
        input3: this.input3,
        input4: this.input4,
        input5: this.input5,
        input6: this.input6
      });
    }
  }
};
</script>
