import React from 'react'
import { NavLink } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaListCheck, FaRegCalendarCheck } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
            <IoMdAddCircleOutline className='w-6 h-6  2xl:w-10 2xl:h-10'/>
            <p className='hidden md:block 2xl:text-2xl'>Add Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
            <FaListCheck className='w-6 h-6 2xl:w-10 2xl:h-10'/>
            <p className='hidden md:block 2xl:text-2xl'>List Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
            <FaRegCalendarCheck className='w-6 h-6 2xl:w-10 2xl:h-10'/>
            <p className='hidden md:block 2xl:text-2xl'>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
