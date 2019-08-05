import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8000/api/v1"
      : "http://afmp-api.daplanningcentral.net/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.defaults.timeout = 5000;
axiosInstance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
