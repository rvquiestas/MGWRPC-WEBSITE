import React, { useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Troubleshooting = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"TROUBLESHOOTING"} text2={"VIDEO"} />
      </div>

      {/* No Display Vid (Replaced with YouTube) */}
      <p className="2xl:text-3xl font-bold">Troubleshooting No Display</p>
      <div className="flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-0" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/pJW2sKjEcb0?si=RYXPCH8hyxbxDNdX"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p className="2xl:text-2xl pt-4 font-semibold">Follow these steps:</p>
      <ul className="list-disc pl-8 text-lg pt-4 2xl:text-2xl">
        <li>Plug power cord to an outlet and turn on the monitor.</li>
        <li>
          Check to see if the cable is properly connected to the monitor and
          look for damages.
        </li>
        <li>
          Switch on the power supply switch then the system unit power button.
        </li>
        <li>
          If still no display, properly turn off the system unit and remove the
          stick of ram.
        </li>
        <li>
          Rub the gold plates with an eraser, such as a pencil-type eraser.
        </li>
        <li>
          Properly insert the ram back and turn on the system unit and monitor
          to check for a display.
        </li>
        <li>
          If still no display, check the CMOS battery to see if it needs to be
          replaced.
        </li>
        <li>If the problem still persists, ask for a professional.</li>
      </ul>

      {/* No Power Vid (Replaced with new YouTube video) */}
      <p className="pt-20 2xl:text-3xl font-bold">Troubleshooting No Power</p>
      <div className="flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-0" style={{ paddingTop: '56.25%' }}>
          <iframe
            width="560"
            height="315"
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/RBkHT8FNX2E?si=mpOFaDcVyFmD8WH-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p className="2xl:text-2xl pt-4 font-semibold">Follow these steps:</p>
      <ul className="list-disc pl-8 text-lg pt-4 2xl:text-2xl">
        <li>Press the power button and check for signs of power.</li>
        <li>Verify the power outlet works with another device.</li>
        <li>Check the power cable with another device.</li>
        <li>Unplug and remove the power supply for troubleshooting.</li>
        <li>Inspect the power switch.</li>
        <li>
          If issues persist, replace the motherboard or consult a technician.
        </li>
      </ul>
    </div>
  );
};

export default Troubleshooting;
