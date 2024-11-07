import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border  border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-darkText">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-orangeText"></p>
            <p className="font-medium text-sm 2xl:text-xl md:text-base">
              FEATURING
            </p>
          </div>
          <h1 className="text-3xl 2xl:text-4xl sm:py-3 lg:text=5xl leading-relaxed">
            Royal Kludge R65
          </h1>
          <div className="flex items-center gap-2">
            {/* <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
             */}
            <Link to="/product/672cab4b82f76a22818dd834">
              <button className="rounded-md relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-darkText text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56">
                <p className="relative z-10">Shop Now</p>
              </button>
            </Link>
            <p className="w-8 md:w-11 h-[1px] bg-orangeText"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-400">
        <video
          className="w-full h-full object-cover"
          loop
          muted
          autoPlay
          disablePictureInPicture
          onMouseEnter={(e) => e.target.pause()}
          onMouseLeave={(e) => e.target.play()}
        >
          <source src={assets.kb_3d} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Hero;
