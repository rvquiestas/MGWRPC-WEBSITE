import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./../components/Title";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleCheckout = () => {
    if (!token) {
      // If the user is not logged in, navigate to the login page or show a message
      navigate("/login");
    } else {
      navigate("/place-order");
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <Link
                to={`/product/${productData._id}`}
                className="flex items-start gap-6"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg 2xl:text-2xl font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="2xl:text-xl">
                        {currency}
                        {new Intl.NumberFormat().format(productData.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Quantity input */}
              <div className="items-center flex gap-2">
                <span className="pr-2 2xl:text-2xl">Quantity: </span>
                <input
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value === 0 || e.target.value === "") return; // Prevent 0 or empty value
                    if (value > productData.availableStock) {
                      // Set to stock if input exceeds available stock
                      e.target.value = productData.stock;
                      updateQuantity(item._id, productData.stock);
                    } else {
                      updateQuantity(item._id, value);
                    }
                  }}
                  className="border border-darkText max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 2xl:text-2xl"
                  type="number"
                  min={1}
                  max={productData.availableStock} // Set max value to stock
                  defaultValue={item.quantity}
                />
                <span className="text-gray-500 text-xs sm:text-sm 2xl:text-lg">
                  Stocks: {productData.availableStock}
                </span>
              </div>
              <RiDeleteBin6Line
                onClick={() => updateQuantity(item._id, 0)}
                className="text-xl mr-4 sm:w-5 2xl:text-2xl 2xl:w-10 cursor-pointer hover:text-redText"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleCheckout}
              className={`bg-black text-white text-sm 2xl:text-xl my-8 px-8 py-3 hover:bg-orangeText ${
                !token ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={!token} // Disable button if no token
            >
              PROCEED TO CHECKOUT
            </button>

            {!token && (
              <p className="text-red-500 text-xs">
                You need to be logged in to proceed with the checkout.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
