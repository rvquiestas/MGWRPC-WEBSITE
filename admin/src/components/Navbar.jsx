import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <NavLink to="/">
      <div className="flex items-center py-5 px-[4%] justify-between">
        <img
          className="w-[max(10%,80px)] 2xl:w-[max(15%,90px)]"
          src={assets.noBg_logo}
          alt="Logo"
        />
        <button
          onClick={() => setToken("")}
          className="bg-black text-white hover:bg-orange-600 px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm 2xl:text-xl"
        >
          Logout
        </button>
      </div>
    </NavLink>
  );
};

export default Navbar;
