<template>
  <q-card class="q-pa-sm">
    <q-toolbar>
      <q-toolbar-title>Print Preview</q-toolbar-title>
      <q-space/>
      <q-btn flat dense label="Cancel" @click="$emit('close')"></q-btn>
      <q-btn outline dense label="Print" @click="print" class="q-ml-sm"></q-btn>
    </q-toolbar>
    <q-separator/>

    <div ref="preview">
      <div class="col q-mt-md q-mx-xl">
        {{ today | date }}

        <ul style="list-style-type: none;" class="q-pl-none">
          <li class="text-weight-bold">SECRETARY WILLIAM D. DAR</li>
          <li>Department of Agriculture</li>
          <li>Elliptical Road, Diliman</li>
          <li>Quezon City, Philippines</li>
        </ul>

        <p>
          This is to endorse, for inclusion in the 2017-2022 Public Investment Program (PIP) the following priority programs and projects of the Department as encoded in the IPM Online (IPMS) System:
        </p>

        <q-markup-table bordered separator="cell" wrap-cells flat ref="projectTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Total Project Cost (PhP)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, title, description, total_project_cost } in projects" :key="id">
              <td>{{ title }}</td>
              <td>{{ description }}</td>
              <td class="text-right">{{ total_project_cost.toLocaleString() }}</td>
            </tr>
          </tbody>
        </q-markup-table>

        <div class="row q-my-md">
          <div class="col-6">
            Prepared by:
            <p class="q-pt-xl text-weight-bold">{{ name }}, IP Focal</p>
          </div>
          <div class="col-6">
            Noted by:
            <p class="q-pt-xl text-weight-bold">{{ name }}, Head of Office</p>

          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import html2canvas from "html2canvas";

export default {
  name: 'PrintPreview',
  data () {
    return {}
  },
  computed: {
    ...mapState('auth',['name','position']),
    ...mapGetters('projects',['projects']),
    today() {
      return new Date();
    }
  },
  methods: {
    print() {
      // https://developer.tizen.org/community/tip-tech/creating-pdf-documents-jspdf
      // window.html2canvas = html2canvas;

      // const doc = new jsPDF('p','in','a4');

      const preview = this.$refs.preview;
      console.log(preview)

      html2canvas(preview).then(canvas => console.log(canvas));

      // doc.html(preview, {
      //   callback: function(doc) {
      //     doc.save('test.pdf');
      //   }
      // });

    }
  },
  filters: {
    date(val) {
      return moment(val).format('LL');
    }
  }
}
</script>
