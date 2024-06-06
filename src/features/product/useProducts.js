import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryFn: async () => {
      const products = await axiosInstance.get("/products");
      return products;
    },
    refetchOnWindowFocus: false,
    queryKey: ["fetch.product"],
  });
};
