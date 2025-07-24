import {useState} from "react";
import toast from "react-hot-toast";

export const useService = <T>(service: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async (...args: any[]) => {
    setIsLoading(true);
    try {
      const result = await service(...args);
      setData(result);
      return result;
    } catch (error) {
      console.error("Service error:", error);
      if (error instanceof Error) {
        if (
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response
        ) {
          const responseData = error.response.data as {results?: {message: string}[]};
          if (responseData.results?.[0]?.message) {
            toast.error(responseData.results[0].message);
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("An unknown error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {data, isLoading, execute};
};
