import { useState } from "react";
import { useMutation } from "react-query";
import { getProducts } from "../../services/product.services";
import { handleGetRating } from "../../services/rating.services";

const useGetProductRatings = () => {
  const getProductRatings = useMutation(handleGetRating, {
    onSuccess: (data) => {},
  });
  return { getProductRatings };
};

export default useGetProductRatings;
