import Vue from "vue";
import axios from "axios";
import { LocalStorage } from "quasar";

var jwt = LocalStorage.getItem("jwt");

var baseURL = process.env.DEV
  ? "http://localhost:8000"
  : "https://e-planning.daplanningcentral.net";

export const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.headers["Authorization"] = "Bearer " + jwt;

Vue.prototype.$axios = axiosInstance;
