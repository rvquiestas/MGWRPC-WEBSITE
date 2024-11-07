import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { BsBoxFill } from "react-icons/bs";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;

      // Send status update to the backend (admin side)
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        // If the update is successful, fetch updated orders for both sides
        await fetchAllOrders();
        toast.success("Order status updated successfully.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error updating order status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="2xl:text-2xl">Order Page</h3>
      <div>
        {orders.length === 0 ? (
          <p>No orders available</p> // Display message if no orders
        ) : (
          orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 2xl:text-xl"
              key={index}
            >
              <BsBoxFill className="w-10 h-10 2xl:w-20 2xl:h-20" />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <p className="py-0.5" key={index}>
                      {item.name} x {item.quantity}
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.barangay +
                      ", " +
                      order.address.city +
                      ", " +
                      order.address.province +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px] 2xl:text-[20px]">Items : {order.items.length}</p>
                <p className="mt-3 2xl:mt-5">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px] 2xl:text-[20px]">{currency}{new Intl.NumberFormat().format(order.amount)}</p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold"
                disabled={order.status === "Order Cancelled"}  // Disable the select dropdown if status is "Order Cancelled"
              >
                <option value="Waiting for Confirmation">Waiting for Confirmation</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Order Cancelled" disabled>Order Cancelled</option> {/* Disable the "Order Cancelled" option */}
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
