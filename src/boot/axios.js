import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:8000/api/v1" : "http://afmp-api.daplanningcentral.net/api/v1",
  timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
};

export { axiosInstance}
