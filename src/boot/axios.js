import Vue from "vue";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000";

var baseURL = process.env.DEV
  ? "http://localhost:8000"
  : "https://e-planning.daplanningcentral.net";

export const axiosInstance = axios.create({
  baseURL: baseURL
});

Vue.prototype.$axios = axiosInstance;
