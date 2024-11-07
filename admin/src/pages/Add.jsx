import React, { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import axios from "axios";
import { backendUrl } from "./../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("CPU Cooler");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(""); // New state for stock input
  const [sulitpc, setSulitpc] = useState(false);

  // For Arrays
  const [specs, setSpecs] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");

  const handleSpecsChange = (e) => {
    setSpecs(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock); // Append stock to formData
      formData.append("sulitpc", sulitpc);

      // Convert the input values to arrays, splitting by commas
      const specsArray = specs
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      const detailsArray = details
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      const tagsArray = tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      formData.append("specs", JSON.stringify(specsArray));
      formData.append("details", JSON.stringify(detailsArray));
      formData.append("tags", JSON.stringify(tagsArray));

      // Add images to formData if they exist
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setStock(""); // Reset stock input
        setSpecs("");
        setDetails("");
        setTags("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      {/* Add Image */}
      <div>
        <p className="mb-2 2xl:text-2xl">
          Upload Image <span className="text-red-600">*</span>
        </p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <label
              key={index}
              htmlFor={`image${index + 1}`}
              className="relative cursor-pointer"
            >
              {image ? (
                <img
                  className="w-20 h-20 2xl:w-40 2xl:h-40"
                  src={URL.createObjectURL(image)} // Show uploaded image
                  alt="Uploaded Preview"
                />
              ) : (
                <RiImageAddFill className="w-20 h-20 2xl:w-40 2xl:h-40 border-2 border-dashed border-gray-400 p-4" />
              )}
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const setImageFuncs = [
                    setImage1,
                    setImage2,
                    setImage3,
                    setImage4,
                  ];
                  setImageFuncs[index](e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Add Product Name */}
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

      {/* Add Product Description */}
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

      {/* Add Specifications */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">
          Specifications <span className="text-red-600">*</span>
        </p>
        <textarea
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Enter specifications, separated by commas"
          value={specs}
          onChange={handleSpecsChange}
          required
        />
      </div>

      {/* Add Product Details */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">Product Details</p>
        <textarea
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Enter details, separated by commas"
          value={details}
          onChange={handleDetailsChange}
        />
      </div>

      {/* Add Product Tags */}
      <div className="w-full">
        <p className="mb-2 2xl:text-2xl">
          Product Tags <span className="text-red-600">*</span>
        </p>
        <textarea
          className="w-full max-w-[500px] 2xl:max-w-[700px] 2xl:text-xl px-3 py-2"
          placeholder="Enter tags, separated by commas"
          value={tags}
          onChange={handleTagsChange}
          required
        />
      </div>

      {/* Category, Price, and Stock */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 2xl:text-2xl">
            Product Category <span className="text-red-600">*</span>
          </p>
          <select
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
        {/* Product Price */}
        <div>
          <p className="mb-2 2xl:text-2xl">
            Product Price <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px] 2xl:px-6 2xl:py-4 2xl:text-xl"
            type="number"
            placeholder="100"
            required
          />
        </div>
        {/* Product Stock */}
        <div className="w-full sm:w-[120px]">
          <p className="mb-2 2xl:text-2xl">
            Stock <span className="text-red-600">*</span>
          </p>
          <input
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            className="w-full px-3 py-2 sm:w-[120px] 2xl:px-6 2xl:py-4 2xl:text-xl"
            type="number"
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* Checkbox for Sulit PC */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setSulitpc((prev) => !prev)}
          checked={sulitpc}
          type="checkbox"
          id="sulitpc"
        />
        <label className="cursor-pointer 2xl:text-xl" htmlFor="sulitpc">
          Add to Sulit PC
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white hover:bg-orange-600 2xl:text-2xl"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
