// import something here
import Vue from "vue";
import axios from "axios";

if (process.env.DEV) {
  axios.defaults.baseURL = "http://localhost:8000";
} else {
  axios.defaults.baseURL = "https://e-planning.daplanningcentral.net";
}

Vue.prototype.$axios = axios;

export default axios;
