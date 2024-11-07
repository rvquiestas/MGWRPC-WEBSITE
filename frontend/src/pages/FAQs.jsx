import React, { useState } from "react";
import Title from "./../components/Title";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open state
  };

  return (
    <div>
      {/* ----------------- FAQS ----------------- */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"FREQUENTLY ASKED"} text2={"QUESTIONS"} />
        <p className="text-lg leading-relaxed text-gray-600 mb-8 text-center">
          Got questions? Find answers to commonly asked questions here.
        </p>

        {/* Accordion Question 1 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(0)} // Toggle the first question
          >
            <span className="2xl:text-2xl">Are your products covered by warranty?</span>
            <span>{openIndex === 0 ? "-" : "+"}</span>
          </button>
          {openIndex === 0 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              All MGWR PC Products Carry A Standard One (1) Year Warranty Except Of The Following:
              <br /><br />
              <strong>One Month Warranty Applies Only For:</strong>
              <ul>
                <li>• External batteries of Laptops</li>
                <li>• Bundled Items (mouse, keyboards, speaker, etc.)</li>
                <li>• Chargers, Adaptors</li>
              </ul>
              <br />
              <strong>One Week Warranty Applies Only For:</strong>
              <ul>
                <li>• Tables and Chairs</li>
                <li>• Generic Fans, Laptop coolers, Heatsink, LAN tester</li>
                <li>• Powercord, Display Cables</li>
              </ul>
              <br />
              <strong>There Is No Warranty For:</strong>
              <ul>
                <li>• Consumables (ink, disc, etc.)</li>
                <li>• Software (OS, Office)</li>
                <li>• Accessories, promotional/sale items, freebies, cables</li>
              </ul>
            </div>
          )}
        </div>

        {/* Accordion Question 2 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(1)} // Toggle the second question
          >
            <span className="2xl:text-2xl">What payment methods do you accept?</span>
            <span>{openIndex === 1 ? "-" : "+"}</span>
          </button>
          {openIndex === 1 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              We Accept Cash and Online Payment for Visa or MasterCard holder.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
