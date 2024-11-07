import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaSort } from "react-icons/fa"; // Import FaSort
import { useNavigate } from "react-router-dom"; // Import useNavigate

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isSortedAscending, setIsSortedAscending] = useState(true); // State to track sorting order
  const [sortField, setSortField] = useState("name"); // Track the current sort field
  const navigate = useNavigate(); // Initialize navigate

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle edit button click to navigate to edit route
  const handleEditClick = (productId) => {
    navigate(`/edit/${productId}`); // Redirect to the edit page with the product ID
  };

  // Sort the list by a given field
  const sortList = (field) => {
    const sortedList = [...list].sort((a, b) => {
      const valueA = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      const valueB = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];

      if (valueA < valueB) return isSortedAscending ? -1 : 1;
      if (valueA > valueB) return isSortedAscending ? 1 : -1;
      return 0;
    });
    
    setList(sortedList);
    setIsSortedAscending(!isSortedAscending); // Toggle sort order
    setSortField(field); // Update the current sort field
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 2xl:text-2xl">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ---------------- List Table Title ---------------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm 2xl:text-2xl">
          <b>Image</b>
          <b className="flex items-center cursor-pointer" onClick={() => sortList("name")}>
            Name
            <span className="ml-1 hover:text-orange-600">
              <FaSort /> {/* Sorting icon beside the Name */}
            </span>
          </b>
          <b className="flex items-center cursor-pointer" onClick={() => sortList("category")}>
            Category
            <span className="ml-1 hover:text-orange-600">
              <FaSort /> {/* Sorting icon beside the Category */}
            </span>
          </b>
          <b className="flex items-center cursor-pointer" onClick={() => sortList("price")}>
            Price
            <span className="ml-1 hover:text-orange-600">
              <FaSort /> {/* Sorting icon beside the Price */}
            </span>
          </b>
          <b className="flex items-center cursor-pointer" onClick={() => sortList("stock")}>
            Stocks
            <span className="ml-1 hover:text-orange-600">
              <FaSort /> {/* Sorting icon beside the Stocks */}
            </span>
          </b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------------- Product List ---------------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12 2xl:w-20" src={item.image[0]} alt="" />
            <p className="2xl:text-xl">{item.name}</p>
            <p className="2xl:text-xl">{item.category}</p>
            <p className="2xl:text-xl">
              {currency}
              {new Intl.NumberFormat().format(item.price)}
            </p>
            <p className="2xl:text-xl">{item.stock}</p>
            <p className="flex items-center gap-3 justify-self-center">
              <CiEdit
                className="w-5 h-5 2xl:w-8 2xl:h-8 cursor-pointer hover:text-orange-600 text-lg"
                onClick={() => handleEditClick(item._id)}
              />
              <AiOutlineDelete
                onClick={() => removeProduct(item._id)}
                className="w-5 h-5 2xl:w-6 2xl:h-6 cursor-pointer hover:text-red-600 text-lg"
              />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
