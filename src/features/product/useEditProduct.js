import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const products = await axiosInstance.patch(`/products/${body.id}`, body);
      return products;
    },
    onSuccess,
  });
};
