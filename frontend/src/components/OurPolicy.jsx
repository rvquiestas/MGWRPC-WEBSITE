import React from 'react'
import { RiCheckboxCircleLine, RiCustomerService2Line, RiDiscountPercentLine  } from "react-icons/ri";

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm 2xl:text-lg md:text-base text-gray-700'>
      
      <div>
        <RiDiscountPercentLine className='w-12 m-auto mb-5 text-5xl text-darkText' />
        <p className=' font-semibold'>Discounts on Selected Items</p>
        <p className=' text-gray-400'>Enjoy exclusive discounts on selected items</p>
      </div>
      <div>
        <RiCheckboxCircleLine className='w-12 m-auto mb-5 text-5xl text-darkText' />
        <p className=' font-semibold'>One Year Warranty</p>
        <p className=' text-gray-400'>Selected items come with warranty coverage</p>
      </div>
      <div>
        <RiCustomerService2Line className='w-12 m-auto mb-5 text-5xl text-darkText' />
        <p className=' font-semibold'>Best Customer Support</p>
        <p className=' text-gray-400'>We respond to all inquiries as quickly as possible</p>
      </div>
    </div>
  )
}

export default OurPolicy
