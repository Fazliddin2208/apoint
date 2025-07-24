import {useLocalStorage} from "@/hooks/use-local-storage";
import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

const baseApi = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const baseApiFile = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const addInterceptors = (apiInstance: typeof baseApi) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = useLocalStorage().getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API error:", error);
      return Promise.reject(error);
    }
  );
};

addInterceptors(baseApi);
addInterceptors(baseApiFile);

export {baseApi, baseApiFile};
