import axios from "axios";

var token = localStorage.getItem('token')

const axiosInstance = axios.create({
	baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:8000/api/v1" : "http://afmp-api.daplanningcentral.net/api/v1",
  timeout: 5000,
  headers: {
	  'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
});

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
};

export { axiosInstance}