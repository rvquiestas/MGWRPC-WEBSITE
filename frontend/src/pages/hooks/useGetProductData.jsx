import { useState } from "react";
import { useMutation } from "react-query";
import { getProducts } from "../../services/product.services";

const useGetProductData = () => {
  const [productData, setProductData] = useState({});
  const { mutateAsync, isLoading } = useMutation(getProducts, {
    onSuccess: (data) => {
      if (data && data.product) setProductData(data.product);
      console.log(data);
    },
  });
  return { productData, mutateAsync, isLoading };
};

export default useGetProductData;
