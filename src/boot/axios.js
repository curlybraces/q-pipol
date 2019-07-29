import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api/v1"
    : "http://afmp-api.daplanningcentral.net/api/v1";

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
