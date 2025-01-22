import { logger } from "@/lib/logger";

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
const axiosConfig: AxiosRequestConfig = {
  baseURL: "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = getToken();

    // if (token) {
    //   config.headers = config.headers || {};
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          logger.error("Bad Request: ", error.response.data);
          break;
        case 401:
          logger.error("Unauthorized - logging out", error.response.data);
          //Logout logic here
          break;
        case 403:
          logger.error("Forbidden: ", error.response.data);
          break;
        case 404:
          logger.error("Not Found: ", error.response.data);
          break;
        case 500:
          logger.error("Internal Server Error: ", error.response.data);
          break;
        default:
          logger.error("Error:", error.response.data);
      }
    } else if (error.request) {
      logger.error("No Response: ", error.request);
      alert("Network error. Please try again.");
    } else {
      logger.error("Request Error: ", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
