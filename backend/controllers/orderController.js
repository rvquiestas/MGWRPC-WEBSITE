import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import ratingModel from "../models/ratingModel.js";
import Stripe from "stripe";

// global variables
const currency = "php";
const deliveryCharge = 100;

// gateway initialize
const stripe = new Stripe(
  "sk_test_51QH50HAG8M18owNd4XrElE873j6zSmhVbx6oLD5CNunLy3hMacfhUSzUm0L79EPapsiS4CWUpFtFXhjmpCmN8Wjt00dY5JpfaS"
);

// Placing Orders Using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Waiting for Confirmation" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Orders Using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Orders Using Razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// All Orders Data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    // const transformedOrders = orders.map(async (order) => ({
    //   const rate = await ratingModel.findOne({
    //     userId,
    //     productId: order.items[0]._id,
    //   })
    // }));
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const data = await orderModel.findByIdAndUpdate(orderId, { status });
    if (status === "Shipped") {
      const items = data.get("items");
      items.forEach(async (item) => {
        await productModel.findByIdAndUpdate(item._id, {
          $inc: { stock: -item.quantity },
        });
      });
    }
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel Order by ID
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find and update the order status to "Order Cancelled"
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: "Order Cancelled" }, // Update the status to "Order Cancelled"
      { new: true } // Return the updated order
    );

    if (updatedOrder) {
      res.json({ success: true, message: "Order cancelled successfully" });
    } else {
      res.json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  cancelOrder, // add the cancelOrder function here
};
