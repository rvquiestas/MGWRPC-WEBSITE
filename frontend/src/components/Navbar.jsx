import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium sticky top-0 bg-whiteText z-50">
      <Link to="/">
        <img
          src={assets.black_logo}
          className="w-32 sm:w-40 md:w-44 lg:w-48"
          alt=""
        />
      </Link>

      {/* Navbar */}
      <ul className="hidden sm:flex gap-5 text-sm 2xl:text-xl text-DarkText">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-orangeText"
        >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-orangeText hidden" />
        </NavLink>

        <NavLink
          to="/product-list"
          className="flex flex-col items-center gap-1 hover:text-orangeText"
        >
          <p>Products</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-orangeText hidden" />
        </NavLink>

        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:text-orangeText"
        >
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-orangeText hidden" />
        </NavLink>

        <NavLink
          to="/troubleshooting"
          className="flex flex-col items-center gap-1 hover:text-orangeText"
        >
          <p>Troubleshooting</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-orangeText hidden" />
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Go to Product-List if Search Icon is Clicked */}
        <NavLink to="/product-list">
          {" "}
          <IoSearchOutline
            onClick={() => setShowSearch(true)}
            className="text-2xl 2xl:text-3xl cursor-pointer hover:text-orangeText"
          />
        </NavLink>

        {/* Will not go to Product-List even Search Icon is Clicked */}
        {/* <IoSearchOutline
            onClick={() => setShowSearch(true)}
            className="text-2xl 2xl:text-3xl cursor-pointer hover:text-orangeText"
          /> */}

        <div className="group relative">
          <FiUser
            onClick={() => (token ? null : navigate("/login"))}
            className="text-2xl 2xl:text-3xl cursor-pointer hover:text-orangeText"
          />
          {/* ---- Dropdown Menu ---- */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 2xl:text-xl">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-lightText rounded">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-orangeText"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-orangeText"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <FiShoppingCart className="w-5 min-w-5 text-xl 2xl:w-10 2xl:text-2xl hover:text-orangeText" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-darkText text-whiteText aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile View */}
        <BiMenuAltRight
          onClick={() => setVisible(true)}
          className="text-2xl cursor-pointer sm:hidden"
        />
        <div
          className={`fixed top-0 right-0 bottom-0 bg-white transition-transform transform ${
            visible ? "translate-x-0" : "translate-x-full"
          } w-full sm:hidden`}
        >
          <div className="flex flex-col text-darkText">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <IoClose className="h-8" />
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b"
              to="/product-list"
            >
              Products
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b"
              to="/troubleshooting"
            >
              Troubleshooting
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
