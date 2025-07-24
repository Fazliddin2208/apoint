import { baseApi } from "../axios/axiosConfig";

export const getReports = async (params: Record<string, any>) => {
    const response = await baseApi.get("/reports/reports/materials", {params});
    return response.data;
  };