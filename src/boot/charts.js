import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

export default async ({ Vue }) => {
  Vue.use(Chartkick.use(Chart))
}
