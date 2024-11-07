import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency, delivery_fee } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order._id; // store the orderId for cancellation
            allOrdersItem.push(item);
          });
        });
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Cancel order handler with confirmation
  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    
    if (!confirmCancel) return; // Stop if the user doesn't confirm
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/cancel`, // Ensure the endpoint is correctly matched
        { orderId },
        { headers: { token } }
      );
  
      if (response.data.success) {
        // Reload orders after successful cancellation
        loadOrderData();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {/* Check if there are no orders */}
        {orderData.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No Orders</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 2xl:w-40"
                  src={item.image[0]}
                  alt=""
                />
                <div>
                  <p className="sm:text-base font-medium 2xl:text-2xl">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700 2xl:text-2xl">
                    <p>
                      {currency}
                      {new Intl.NumberFormat().format(
                        item.price * item.quantity + delivery_fee
                      )}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="mt-1 2xl:text-2xl">
                    Date:{" "}
                    <span className="text-gray-400  2xl:text-2xl">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1 2xl:text-2xl">
                    Payment:{" "}
                    <span className="text-gray-400  2xl:text-2xl">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 2xl:h-4 2xl:w-4 rounded-full ${item.status === "Waiting for Confirmation" ? "bg-gray-500" : item.status === "Order Placed" || item.status === "Packing" ? "bg-green-500" : "bg-green-500"}`}
                  ></p>
                  <p className="text-sm md:text-base 2xl:text-2xl">
                    {item.status}
                  </p>
                </div>
                {(item.status === "Waiting for Confirmation" ||
                  item.status === "Order Placed" ||
                  item.status === "Packing") && (
                  <button
                    onClick={() => cancelOrder(item.orderId)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
