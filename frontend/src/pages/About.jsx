import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Title from './../components/Title';
import { assets } from '../assets/assets';
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>

      {/* ----------------- ABOUT ----------------- */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[350px] 2xl:max-w-[450px]' src={assets.about_us} alt="about_us.png" />
        <div className='flex flex-col text-justify 2xl:text-2xl justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Committed to providing you with the best computer parts and accessories, with a focus on product quality, best service, and real-time assistance.</p>
          <p>As a dynamic and innovative organization, we focus on providing the best computer products and building a long-term relationship with our valued clients.</p>
          <p>At MGWR PC, we are dedicated with passion to excellence and commitment in delivering premium solutions to meet your specific needs. Our dedicated team works diligently to ensure your satisfaction and success.</p>
        </div>
      </div>

      <div className='text-2xl py-4'>
        <Title text1={'OUR'} text2={'MISSION'} />
      </div>
      <p className='pb-5 2xl:text-2xl'>Our mission is to provide outstanding value to our customers, employees, and business partners through our ability to deliver superior results using industry best practices.</p>
      <div className='text-2xl py-4'>
        <Title text1={'OUR'} text2={'VISION'} />
      </div>
      <p className='pb-5 2xl:text-2xl'>Become indispensable to our customers by offering computer products and services that assist them in achieving their goals.</p>
      <div className='text-2xl py-4'>
        <Title text1={'CORE'} text2={'VALUES'} />
      </div>
      <p className='pb-5 2xl:text-2xl'>Collaborative, Respect, Integrity, Pride.</p>

      {/* -------------- CONTACT -------------- */}
      <div id='contact_us' className='text-2xl text-center pt-8 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* --------- MAPS AND CONTACT INFORMATION --------- */}
      <div className="flex flex-col gap-8 mt-8">

      {/* --------- CALAMBA BRANCH --------- */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        {/* MAP */}
        <div className="w-full md:w-1/2">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.845372560087!2d121.156537!3d14.   2038307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.  1!3m3!1m2!1s0x33bd63000e2b5865%3A0xefc37e6cb88c8a92!2sMGWR-PC%20COMPUTER%20TRADING%20CALAMBA%20BRANC   H!5e0!3m2!1sen!2sph!4v1728578809782" 
            width="100%" 
            height="400" 
            style={{ border: 0 }}
            allowFullScreen 
            loading="lazy">
          </iframe>
        </div>
      {/* CONTACT INFO */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-center md:text-left">
        <h3 className="text-lg 2xl:text-3xl font-semibold">MGWR PC Computer Trading</h3>
        <p className="flex items-center mt-2 2xl:text-2xl"><SlLocationPin className="text-3xl 2xl:text-5xl mr-2" /> D&A Building Cadena    De Amor Corner Ilang-Ilang Street, Calamba, Philippines, 4027</p>
        <p className="flex items-center mt-2 2xl:text-2xl"><MdOutlineEmail className="text-3xl 2xl:text-4xl mr-2" />   mgwrpccalamba@gmail.com</p>
        <p className="flex items-center mt-2 2xl:text-2xl"><FiPhone className="text-3xl 2xl:text-4xl mr-2" /> 0977 776 2448</p>
      </div>
    </div>

    </div>

    </div>
  );
};

export default About;
