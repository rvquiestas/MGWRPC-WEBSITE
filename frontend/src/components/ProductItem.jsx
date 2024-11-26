import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Tag } from "antd";

const ProductItem = ({ id, image, name, price, availableStock }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer rounded-lg border shadow-xl 2xl:shadow-2xl"
      to={`/product/${id}`}
    >
      <div className="flex flex-col h-full">
        <div className="overflow-hidden flex-1">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={image[0]}
            alt=""
          />
          <p className="pt-3 pb-1 text-md 2xl:text-3xl pl-3 pr-3 line-clamp-2">
            {name}
          </p>
        </div>
        <div className="text-md 2xl:text-2xl font-medium px-3 pb-2 mt-2">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-sm text-lightText font-small">
              {availableStock > 0 ? (
                <Tag color="green">In Stock</Tag>
              ) : (
                <Tag color="gray">Out of Stock</Tag>
              )}
            </span>
            <span className="text-md 2xl:text-2xl text-orangeText font-medium">
              {currency}
              {new Intl.NumberFormat().format(price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
