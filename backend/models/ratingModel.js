import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  orderId: { type: String, required: true },
  rate: { type: Number, required: true },
  remarks: { type: Object, required: true, default: "" },
  insertedOn: { type: Number, required: true },
  updatedOn: { type: Number, required: true },
});

const ratingModel =
  mongoose.models.rating || mongoose.model("rating", ratingSchema);

export default ratingModel;
