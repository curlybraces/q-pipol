import moment from 'moment';

export default async ({ Vue }) => {
  Vue.prototype.$moment = moment;
};
