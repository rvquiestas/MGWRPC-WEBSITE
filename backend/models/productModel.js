import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product Name
  description: { type: String, required: true }, // Product Description
  price: { type: Number, required: true }, // Product Price
  image: { type: Array, required: true }, // Product Images
  category: { type: String, required: true }, // Product Category
  tags: { type: Array, required: true }, // Product Tags
  specs: { type: Array, required: true }, // Product Specifications
  details: { type: Array, required: true }, // Product Details
  sulitpc: { type: Boolean }, // Is it Sulit PC Build?
  date: { type: Number, required: true }, // Product? Date
  stock: { type: Number, default: 0 }, // New field for stock
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel