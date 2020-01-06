// import something here
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-planning.daplanningcentral.net"
});

export default axiosInstance;
