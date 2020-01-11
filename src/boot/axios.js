// import something here
import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = "https://e-planning.daplanningcentral.net";

Vue.prototype.$axios = axios;

export default axios;
