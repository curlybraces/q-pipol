<template>
  <q-page>
    <div class="q-pa-sm q-gutter-y-md">
      <q-card class="q-pa-sm">

      </q-card>
      <q-card class="q-pa-sm">

      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  components: { },
  name: 'PageReports',
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Home',
          url: '/'
        },
        {
          title: 'Reports'
        }
      ],
      chartData: [
        {
          country: 'Lithuania',
          litres: 501.9
        },
        {
          country: 'Czech Republic',
          litres: 301.9
        },
        {
          country: 'Ireland',
          litres: 201.1
        },
        {
          country: 'Germany',
          litres: 165.8
        },
        {
          country: 'Australia',
          litres: 139.9
        },
        {
          country: 'Austria',
          litres: 128.3
        },
        {
          country: 'UK',
          litres: 99
        },
        {
          country: 'Belgium',
          litres: 60
        },
        {
          country: 'The Netherlands',
          litres: 50
        }
      ]
    };
  }
};
</script>
