import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import ratingModel from "../models/ratingModel.js";
import userModel from "../models/userModel.js";

const postProductRating = async (req, res) => {
  try {
    const { userId, productId, orderId, rate, remarks } = req.body;

    const newRating = new ratingModel({
      userId,
      productId,
      orderId,
      rate,
      remarks,
      insertedOn: Date.now(),
      updatedOn: Date.now(),
    });
    const existingRating = await ratingModel.findOne({
      userId,
      productId,
      orderId,
    });
    if (!existingRating) {
      await ratingModel.insertMany([newRating]);
      res.json({ success: true, message: "Product successfully rated." });
    } else {
      await ratingModel.deleteMany({ userId, productId, orderId });
      res.json({ success: true, message: "Rating has been changed." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProductRating = async (req, res) => {
  try {
    const { productId } = req.query;
    const ratings = await ratingModel.find({ productId });
    const transformedRatings = ratings.map(async (rating) => {
      return {
        userId: rating.userId,
        rate: rating.rate,
        remarks: rating.remarks,
        insertedOn: rating.insertedOn,
        updatedOn: rating.updatedOn,
        user: await userModel.findById(rating.userId),
        product: await productModel.findById(rating.productId),
        order: await orderModel.findById(rating.orderId),
      };
    });

    res.json({ success: true, ratings: await Promise.all(transformedRatings) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { postProductRating, getProductRating };
