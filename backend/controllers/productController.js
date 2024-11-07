import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product Function
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      tags,
      specs,
      details,
      sulitpc,
      stock,
    } = req.body;

    // Check if the fields are provided and valid JSON
    const parsedTags = tags ? JSON.parse(tags) : [];
    const parsedSpecs = specs ? JSON.parse(specs) : [];
    const parsedDetails = details ? JSON.parse(details) : [];

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Create product data with stock information
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      tags: parsedTags,
      specs: parsedSpecs,
      details: parsedDetails,
      sulitpc: sulitpc === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
      stock: Number(stock), // Added stock field
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List Product Function
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Removing Product Function
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single Product Info Function
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Product Function
const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      description,
      price,
      category,
      tags,
      specs,
      details,
      sulitpc,
      stock,
    } = req.body;

    // Parse arrays if provided as JSON strings
    const parsedTags = tags ? JSON.parse(tags) : [];
    const parsedSpecs = specs ? JSON.parse(specs) : [];
    const parsedDetails = details ? JSON.parse(details) : [];

    // Check if new images are provided
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];
    const newImages = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload new images if provided
    let newImagesUrl = [];
    if (newImages.length > 0) {
      newImagesUrl = await Promise.all(
        newImages.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    // Get the existing product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Update product details
    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.category = category;
    product.tags = parsedTags;
    product.specs = parsedSpecs;
    product.details = parsedDetails;
    product.sulitpc = sulitpc === "true" ? true : false;
    product.stock = Number(stock);

    // Only update images if new images are provided
    if (newImagesUrl.length > 0) {
      product.image = newImagesUrl;
    }

    await product.save();

    res.json({ success: true, message: "Product Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
};
