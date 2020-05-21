/**
 * src/boot/axios.js
 *
 * Sets up axios and makes it available to the whole app
 */
import axios from 'axios';

// can define additional configurations here (e.g. add authorization with token)

export default ({ Vue }) => {
  Vue.prototype.$http = axios;
};
