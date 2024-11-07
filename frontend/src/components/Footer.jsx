import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-darkText w-full'>
     <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 mt-10'>
        <div className='md:flex md:justify-between'>
            <div className='mb-6 md:mb-0'>
            <Link to='/' className='flex items-center'><img src={assets.white_logo} className='h-8 me-3' alt="No BG Logo" /></Link>
            <p className='mt-2 text-gray-400 text-md 2xl:text-lg max-w-lg'>
            Committed in providing you with the best Computer parts and accessories, with a focus on product quality, best service, and real-time assistance.
            </p>
            </div>

            {/* Support */}
            <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
                <div>
                    <h2 className='mb-6 text-md 2xl:text-lg font-semibold uppercase text-whiteText'>Support</h2>
                    <ul className='text-gray-400 font-medium'>
                        <li className='mb-4'>
                            <Link to='/terms' className='hover:underline decoration-orangeText underline-offset-4'>Terms & Condition</Link>
                        </li>
                        <li>
                            <Link to='/privacy' className='hover:underline decoration-orangeText underline-offset-4'>Privacy Policy</Link>
                        </li>
                    </ul>
                </div>

                {/* Community */}
                <div>
                    <h2 className='mb-6 text-md 2xl:text-lg font-semibold uppercase text-whiteText'>Community</h2>
                    <ul className='text-gray-400 font-medium'>
                        <li className='mb-4'>
                            <Link to='/faqs' className='hover:underline decoration-orangeText underline-offset-4'>FAQs</Link>
                        </li>
                    </ul>
                </div>

                {/* About */}
                <div>
                    <h2 className='mb-6 text-md 2xl:text-lg font-semibold uppercase text-whiteText'>About</h2>
                    <ul className='text-gray-400 font-medium'>
                        <li className='mb-4'>
                            <Link to='/about#contact_us' className='hover:underline decoration-orangeText underline-offset-4'>Contact</Link>
                        </li>
                        <li>
                            <Link to='/about' className='hover:underline decoration-orangeText underline-offset-4'>Store</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Bottom Part */}
        <hr className='my-6 sm:mx-auto border-gray-700 lg:my-8'/>
        <div className='sm:flex sm:items-center sm:justify-between'>
            <span className='text-sm sm:text-center text-gray-400'>
                &copy; 2024 MGWR PC. All Rights Reserved.
            </span>
            <div className='flex mt-4 sm:justify-center sm:mt-0'>
                <Link  to='https://www.facebook.com/mgwrpccalamba' className='text-gray-500 hover:text-orangeText' target="_blank" rel="noopener noreferrer">
                    <FaFacebook className='w- h-" aria-hidden="true"'/>
                </Link>
                <Link  to='https://www.instagram.com/mgwrpc/?hl=en' className='text-gray-500 hover:text-orangeText' target="_blank" rel="noopener noreferrer">
                    <FaInstagram className='w-4 h-4" aria-hidden="true" ms-5'/>
                </Link>
                <Link  to='https://www.tiktok.com/@mgwrpctrading?lang=en' className='text-gray-500 hover:text-orangeText' target="_blank" rel="noopener noreferrer">
                    <FaTiktok className='w-4 h-4" aria-hidden="true" ms-5'/>
                </Link>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Footer
