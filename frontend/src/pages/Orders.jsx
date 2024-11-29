import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { render } from "react-dom";
import { Avatar, Button, List, Table } from "antd";
import RateProduct from "./components/RateProduct/RateProduct";

const Orders = () => {
  const { backendUrl, token, currency, delivery_fee } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);
  const [rateProduct, setRateProduct] = useState({
    isModalOpen: false,
    record: undefined,
    order: undefined,
  });

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
        setorderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  const columns = [
    { title: "Transaction Id", dataIndex: "_id", key: "_id" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Date Ordered",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_v, _r) => (
        <div>
          {(_r.status === "Waiting for Confirmation" ||
            _r.status === "Order Placed" ||
            _r.status === "Packing") && (
            <Button danger onClick={() => cancelOrder(_v)}>
              Cancel Order
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Cancel order handler with confirmation
  const cancelOrder = async (orderId) => {
    console.log(orderId)
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
      {rateProduct.isModalOpen && (
        <RateProduct
          isModalOpen={rateProduct.isModalOpen}
          record={rateProduct.record}
          order={rateProduct.order}
          handleOk={() => setRateProduct({ isModalOpen: false, record: null })}
          handleCancel={() =>
            setRateProduct({ isModalOpen: false, record: null })
          }
        />
      )}
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <Table
        rowKey={"_id"}
        size="small"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
              <List
                size="small"
                dataSource={record.items}
                renderItem={(item) => (
                  <List.Item key={item._id}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.image[0]} />}
                      title={<a href={`/product/${item._id}`}>{item.name}</a>}
                      description={
                        <div>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {item.price}</p>
                        </div>
                      }
                    />
                    <Button
                      hidden={item.status !== "Delivered"}
                      onClick={() =>
                        setRateProduct({
                          isModalOpen: true,
                          record: item,
                          order: record,
                        })
                      }
                    >
                      Rate Product
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={orderData}
      />
    </div>
  );
};

export default Orders;
