/*
 * Go to https://chartkick.com/vue for more information on how to configure
 */
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';

export default async ({ Vue }) => {
  Vue.use(Chartkick.use(Chart));
};
