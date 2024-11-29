import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const EditProduct = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [specs, setSpecs] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [sulitpc, setSulitpc] = useState(false);
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/single`,
        { productId },
        { headers: { token } }
      );
      if (response.data.success) {
        const fetchedProduct = response.data.product._doc;
        setProduct(fetchedProduct);
        setName(fetchedProduct.name);
        setPrice(fetchedProduct.price);
        setStock(fetchedProduct.stock || 0);
        setCategory(fetchedProduct.category);
        setSpecs(fetchedProduct.specs.join(", "));
        setImages(fetchedProduct.image);
        setImagePreviews(fetchedProduct.image); // Set initial previews
        setSulitpc(fetchedProduct.sulitpc);
        setDescription(fetchedProduct.description);
        setDetails(fetchedProduct.details.join(", "));
        setTags(fetchedProduct.tags.join(", "));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if the total selected images exceed 4
    if (files.length > 4) {
      toast.error("You can only upload up to 4 images");
      return;
    }

    // Replace existing images with newly uploaded images
    setImages(files);

    // Create image previews for the selected files
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUpdateProduct = async () => {
    const numericPrice = parseFloat(price);
    const numericStock = parseInt(stock, 10);

    if (isNaN(numericPrice) || isNaN(numericStock)) {
      toast.error("Price and Stock must be valid numbers.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("name", name);
      formData.append("price", numericPrice);
      formData.append("stock", numericStock);
      formData.append("category", category);
      formData.append(
        "specs",
        JSON.stringify(specs.split(",").map((s) => s.trim()))
      );
      formData.append("description", description);
      formData.append(
        "details",
        JSON.stringify(details.split(",").map((detail) => detail.trim()))
      );
      formData.append(
        "tags",
        JSON.stringify(tags.split(",").map((tag) => tag.trim()))
      );
      formData.append("sulitpc", sulitpc);

      images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", token },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="edit-product flex flex-col w-full items-start gap-3">
      <h2 className="font-medium text-xl 2xl:text-3xl uppercase text-black underline decoration-orange-600 underline-offset-4">
        Edit Product
      </h2>

      {/* ------------- Edit Image ------------- */}
      <div className="text-2xl">
        <label>
          Product Images (Max 4)
          <span className="text-black font-medium">
            {" "}
            NOTE: <span className="underline">ALL</span> Old Images will be{" "}
            <span className="underline">REPLACED</span>.
          </span>
        </label>
        <div className="images-preview flex gap-2 mt-2 mb-2">
          {imagePreviews.map((img, index) => (
            <div key={index} className="image-preview">
              <img
                src={img}
                alt={`Product preview ${index + 1}`}
                className="w-20 h-20 2xl:w-40 2xl:h-40"
              />
            </div>
          ))}
        </div>
        <input type="file" multiple onChange={handleImageChange} />
        <span className="text-black font-medium">{" "}IF MORE THAN 1, SELECT ALL THE IMAGES</span>
      </div>

      {/* ------------- Edit Name ------------- */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">
          Product Name <span className="text-red-600">*</span>
        </p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* ------------- Edit Description ------------- */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">
          Product Description <span className="text-red-600">*</span>
        </p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Write description here"
          required
        />
      </div>

      {/* ------------- Edit Specifications ------------- */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">
          Specifications <span className="text-red-600">*</span>
        </p>
        <textarea
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Enter specifications, separated by commas"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          required
        />
      </div>

      {/* ------------- Edit Details ------------- */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">Product Details</p>
        <textarea
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Enter details, separated by commas"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      {/* ------------- Edit Tags ------------- */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">
          Product Tags <span className="text-red-600">*</span>
        </p>
        <textarea
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Enter tags, separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>

      {/* Category, Price, and Stock */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {/* ------------- Edit Category ------------- */}
        <div>
          <p className="mb-2 2xl:text-2xl">
            Product Category <span className="text-red-600">*</span>
          </p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 2xl:px-6 2xl:py-4 2xl:text-xl"
            required
          >
            {/* Category options */}
            <option value="CPU Cooler">CPU Cooler</option>
            <option value="Cooling Fan">Cooling Fan</option>
            <option value="Graphics Card">Graphics Card</option>
            <option value="Hard Disk Drive">Hard Disk Drive</option>
            <option value="Headset">Headset</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Laptop">Laptop</option>
            <option value="Monitor">Monitor</option>
            <option value="Motherboard">Motherboard</option>
            <option value="Mouse">Mouse</option>
            <option value="PC Case">PC Case</option>
            <option value="Power Supply">Power Supply</option>
            <option value="Printer">Printer</option>
            <option value="Processor">Processor</option>
            <option value="RAM">RAM</option>
            <option value="Speaker">Speaker</option>
            <option value="Solid State Drive">Solid State Drive</option>
            <option value="Sulit Combo">Sulit Combo</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* ------------- Edit Price ------------- */}
        <div>
          <p className="mb-2 2xl:text-2xl">
            Product Price <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-[120px] 2xl:px-6 2xl:py-4 2xl:text-xl"
            placeholder="100"
            required
          />
        </div>

        {/* ------------- Edit Stock ------------- */}
        <div className="w-full sm:w-[120px]">
          <p className="mb-2 2xl:text-2xl">
            Stock <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 sm:w-[120px] 2xl:px-6 2xl:py-4 2xl:text-xl"
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* ------------- Sulit PC or Not ------------- */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          checked={sulitpc}
          onChange={() => setSulitpc(!sulitpc)}
          id="sulitpc"
        />
        <label className="cursor-pointer 2xl:text-xl" htmlFor="sulitpc">
          Add to Sulit PC
        </label>
      </div>

      {/* -------------- Update Button -------------- */}
      <button
        onClick={handleUpdateProduct}
        className="w-28 py-3 mt-4 bg-black text-white hover:bg-orange-600 2xl:text-2xl"
      >
        Update
      </button>
    </div>
  );
};

export default EditProduct;
