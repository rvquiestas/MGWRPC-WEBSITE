import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const SulitCombo = () => {
  const { products } = useContext(ShopContext);
  const [sulitCombo, setSulitCombo] = useState([]);

  useEffect(() => {
    // Include only those with category "Sulit Combo"
    const filteredProducts = products
      .filter((item) => item.category === "Sulit Combo")
      .slice(0, 10);
    setSulitCombo(filteredProducts);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-left py-8 text-2xl">
        <Title text1={"SULIT"} text2={"COMBOS"} />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {sulitCombo.map((item, index) => (
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

export default SulitCombo;
