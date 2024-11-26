import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const SulitPC = () => {
  const { products } = useContext(ShopContext);
  const [sulitPC, setSulitPC] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.sulitpc);
    setSulitPC(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-left py-8 text-2xl">
        <Title text1={"RECOMMENDED"} text2={"BUILDS"} />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {sulitPC.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            availableStock={item.availableStock}
          />
        ))}
      </div>
    </div>
  );
};

export default SulitPC;
