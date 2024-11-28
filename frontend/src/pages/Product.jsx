import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "./../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { notification, Rate } from "antd";
import useGetProductData from "./hooks/useGetProductData";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [remainingStock, setRemainingStock] = useState(0); // New state to track stock
  const {
    productData: product,
    mutateAsync: getProductData,
    isLoading,
  } = useGetProductData();

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        setRemainingStock(item.availableStock); // Set initial stock value
        return null;
      }
    });
  };
  useEffect(() => {
    getProductData({
      productId,
    });
  }, [productId]);

  const handleAddToCart = () => {
    if (product.stock > 0) {
      if (cartItems[productData._id] < product.stock) {
        addToCart(productData._id);
        notification.success({
          message: "That was easy!",
          description: "The product was added to the cart",
        });
      } else {
        notification.warning({
          message: "Product is out of stock",
          description: "Please check your cart",
        });
      }
      getProductData({
        productId,
      }).then((res) => {
        console.log(product);
      });
      //setRemainingStock(remainingStock - 1); // Decrease stock when added to cart
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* -------- Product Data -------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-col md:flex-row">
        {/* -------- Product Images -------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full responsive-max-height">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info -------- */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl 2xl:text-4xl mt-2">
            {productData.name}
          </h1>
          <p className="mt-5 text-2xl 2xl:text-4xl font-medium">
            {currency}
            {new Intl.NumberFormat().format(productData.price)}
          </p>
          <p className="mt-5 text-gray-500 2xl:text-2xl md:w-4/5 text-justify">
            {productData.description}
          </p>
          <div className="mt-4">
            <h3 className="text-sm 2xl:text-2xl font-medium text-gray-900">
              Rating
            </h3>
            <div className="mt-4">
              <Rate allowHalf defaultValue={2.5} />
            </div>
          </div>
          <div className="mt-4">
            {/* ------ Product Small Details ------ */}
            <h3 className="mt-4 text-sm 2xl:text-2xl font-medium text-gray-900">
              Details
            </h3>
            <div className="mt-4">
              <ul
                role="list"
                className="list-disc space-y-2 pl-4 text-sm 2xl:text-2xl"
              >
                {productData.details.map((detail) => (
                  <li key={detail} className="text-gray-400">
                    <span className="text-gray-600 text-md 2xl:text-lg">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --------- Add To Cart and Stock --------- */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleAddToCart()}
              className={`bg-darkText text-whiteText px-8 py-3 text-sm 2xl:text-lg ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "active:bg-gray-700 hover:bg-orangeText"
              }`}
              disabled={product.stock === 0} // Disable button if out of stock
            >
              Add to Cart
            </button>
            <div className="text-sm 2xl:text-lg font-medium text-gray-700">
              {product.stock > 0 ? (
                <p className="text-green-600">In Stock ({product.stock})</p>
              ) : (
                <p className="text-red-600">Out of stock</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ Specification ------------ */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm 2xl:text-2xl">
            Specifications
          </b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6">
          <div className="mt-4">
            <ul
              role="list"
              className="list-disc space-y-2 pl-4 text-sm 2xl:text-xl"
            >
              {productData.specs.map((spec) => (
                <li key={spec} className="text-gray-700">
                  <span className="text-gray-600">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ------------ Related Products ------------ */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
