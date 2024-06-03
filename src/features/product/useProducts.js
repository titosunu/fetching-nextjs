import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [setLoading, setListLoading] = useState(false);

  const fetchProducts = async () => {
    setListLoading(true);
    try {
      setTimeout(async () => {
        const products = await axiosInstance.get("/products");
        setProducts(products.data);
        setListLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    data: products,
    setLoading,
  };
};
