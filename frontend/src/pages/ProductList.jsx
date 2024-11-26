import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./../context/ShopContext";
import { FaChevronRight } from "react-icons/fa6";
import ProductItem from "./../components/ProductItem";

const ProductList = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]); // State for selected tags
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Function to toggle tags
  const toggleTags = (e) => {
    const value = e.target.value;
    if (tags.includes(value)) {
      setTags((prev) => prev.filter((tag) => tag !== value)); // Remove tag if already selected
    } else {
      setTags((prev) => [...prev, value]); // Add tag if not selected
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      const searchLower = search.toLowerCase();

      productsCopy = productsCopy.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchLower);
        const categoryMatch = item.category.toLowerCase().includes(searchLower);
        const tagMatch =
          Array.isArray(item.tags) &&
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower));

        return nameMatch || categoryMatch || tagMatch;
      });
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by selected tags
    if (tags.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.tags.some((tag) => tags.includes(tag))
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "Low to High":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "High to Low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products, tags]); // Add tags to dependencies

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl 2xl:text-3xl flex items-center gap-2"
        >
          FILTERS
          <FaChevronRight
            className={`h-4 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm  2xl:text-xl font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm 2xl:text-xl font-light text-gray-700">
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"CPU Cooler"}
                onChange={toggleCategory}
              />{" "}
              CPU Cooler
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Cooling Fan"}
                onChange={toggleCategory}
              />{" "}
              Cooling Fan
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Graphics Card"}
                onChange={toggleCategory}
              />{" "}
              Graphics Card
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Hard Disk Drive"}
                onChange={toggleCategory}
              />{" "}
              Hard Disk Drive
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Headset"}
                onChange={toggleCategory}
              />{" "}
              Headset
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Keyboard"}
                onChange={toggleCategory}
              />{" "}
              Keyboard
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Laptop"}
                onChange={toggleCategory}
              />{" "}
              Laptop
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Monitor"}
                onChange={toggleCategory}
              />{" "}
              Monitor
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Motherboard"}
                onChange={toggleCategory}
              />{" "}
              Motherboard
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Mouse"}
                onChange={toggleCategory}
              />{" "}
              Mouse
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"PC Case"}
                onChange={toggleCategory}
              />{" "}
              PC Case
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Power Supply"}
                onChange={toggleCategory}
              />{" "}
              Power Supply
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Printer"}
                onChange={toggleCategory}
              />{" "}
              Printer
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Processor"}
                onChange={toggleCategory}
              />{" "}
              Processor
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"RAM"}
                onChange={toggleCategory}
              />{" "}
              RAM
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Speaker"}
                onChange={toggleCategory}
              />{" "}
              Speaker
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Solid State Drive"}
                onChange={toggleCategory}
              />{" "}
              Solid State Drive
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Sulit Combo"}
                onChange={toggleCategory}
              />{" "}
              Sulit Combo
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Others"}
                onChange={toggleCategory}
              />{" "}
              Others
            </p>
          </div>
        </div>

        {/* Tags Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm 2xl:text-xl font-medium">BUILDS</p>
          <div className="flex flex-col gap-2 text-sm 2xl:text-xl font-light text-gray-700">
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Gaming"}
                onChange={toggleTags}
              />{" "}
              Gaming
            </p>
            <p className="flex gap-2 accent-orangeText">
              <input
                className="w-3"
                type="checkbox"
                value={"Video Editing"}
                onChange={toggleTags}
              />{" "}
              Video Editing
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <p className="text-darkText 2xl:text-4xl underline decoration-orangeText underline-offset-4">
            PRODUCTS
          </p>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm 2xl:text-xl px-2"
          >
            {/* Product Sort */}
            <option value="Relevant">Sort by: Relevant</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
              availableStock={item.availableStock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
