import { useState } from "react";
import { useMutation } from "react-query";
import { getProducts } from "../../services/product.services";

const useGetCardDetails = () => {
  const [cartData, setCartData] = useState({});
  const { mutateAsync, isLoading } = useMutation(getProducts, {
    onSuccess: (data) => {
      if (data && data.product) setCartData(data.product);
      console.log(data);
    },
  });
  return { cartData, mutateAsync, isLoading };
};

export default useGetCardDetails;
