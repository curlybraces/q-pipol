import Vue from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";

var baseURL = process.env.DEV
  ? "http://localhost:8000"
  : "https://e-planning.daplanningcentral.net";

export const setAuthHeader = () => {
  var newToken = LocalStorage.getItem("token");
  if (newToken) {
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + newToken;
  }
};

export const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = baseURL;
axiosInstance.defaults.headers.common["Accept"] = "application/json";

Vue.prototype.$axios = axiosInstance;
