import { axiosInstance } from "../boot/axios";

export const setAuthHeader = token => {
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};
