import Vue from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";

var baseURL = process.env.DEV
  ? "http://localhost:8000"
  : "https://e-planning.daplanningcentral.net";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: [
    {
      Accept: "application/json"
    }
  ]
});

export const setAuthHeader = token => {
  LocalStorage.set("token", token);
  var newToken = LocalStorage.getItem("token");
  if (newToken) {
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + newToken;
  }
};

Vue.prototype.$axios = axiosInstance;
