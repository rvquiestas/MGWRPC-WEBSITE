import ratingModel from "../models/ratingModel.js";

const postProductRating = async (req, res) => {
  try {
    const { userId, productId, rate, remarks } = req.body;

    const newRating = new ratingModel({
      userId,
      productId,
      orderId,
      rate,
      remarks,
      insertedOn: Date.now(),
      updatedOn: Date.now(),
    });
    await newRating.save();

    res.json({ success: true, message: "Product successfully rated." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { postProductRating };
