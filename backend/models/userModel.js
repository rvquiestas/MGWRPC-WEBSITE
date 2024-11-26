import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String }, // Temporary field for OTP
    cartData: {
      type: Object,
      additionalProperties: { type: Number },
    },
  },
  { minimize: false }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
