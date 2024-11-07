import React, { useState } from "react";
import Title from "./../components/Title";

const Terms = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open state
  };

  return (
    <div>
      {/* ----------------- TERMS AND CONDITIONS ----------------- */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"TERMS AND"} text2={"CONDITIONS"} />
      </div>

      {/* Accordion Section for Terms and Conditions */}
      <div className="mt-8">
        {/* Accordion Question: Refund */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(8)} // Toggle the ninth term (Refund)
          >
            <span className="2xl:text-2xl">Refund</span>
            <span>{openIndex === 8 ? "-" : "+"}</span>
          </button>
          {openIndex === 8 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              If you are seeking a refund, please visit our store. Our customer
              service team will assist you with the refund process in person.
            </div>
          )}
        </div>

        {/* Accordion Question 1 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(0)} // Toggle the first term
          >
            <span className="2xl:text-2xl">Terms of Use</span>
            <span>{openIndex === 0 ? "-" : "+"}</span>
          </button>
          {openIndex === 0 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              These terms of use and conditions govern your use of MGWR PC’s
              website and your participation in any promotions or offers
              provided on it. By accessing or using the website, you agree to be
              bound by these terms and conditions. If you do not agree to these
              terms and conditions, please do not use the website.
            </div>
          )}
        </div>

        {/* Accordion Question 2 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(1)} // Toggle the second term
          >
            <span className="2xl:text-2xl">Eligibility</span>
            <span>{openIndex === 1 ? "-" : "+"}</span>
          </button>
          {openIndex === 1 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              To participate in any promotions or offers on the website, you
              must be at least 18 years old or the legal age of majority in your
              jurisdiction. Employees, officers, and directors of MGWR PC, its
              affiliates, subsidiaries, and advertising or promotion agencies,
              and their immediate family members and/or those living in the same
              household are not eligible to participate in any promotions or
              offers.
            </div>
          )}
        </div>

        {/* Accordion Question 3 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(2)} // Toggle the third term
          >
            <span className="2xl:text-2xl">Promotions and Offers</span>
            <span>{openIndex === 2 ? "-" : "+"}</span>
          </button>
          {openIndex === 2 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              All promotions and offers provided on the website are subject to
              availability and may be withdrawn, amended, or suspended by MGWR
              PC at any time and for any reason without notice. MGWR PC reserves
              the right to cancel or refuse any promotion or offer to any
              individual for any reason at its sole discretion. Promotions and
              offers may be subject to additional terms and conditions, which
              will be made available on the website.
            </div>
          )}
        </div>

        {/* Accordion Question 4 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(3)} // Toggle the fourth term
          >
            <span className="2xl:text-2xl">Intellectual Property</span>
            <span>{openIndex === 3 ? "-" : "+"}</span>
          </button>
          {openIndex === 3 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              The content on the website, including but not limited to text,
              graphics, logos, images, audio clips, digital downloads, and
              software, is the property of MGWR PC or its licensors and is
              protected by copyright and other intellectual property laws. You
              may not modify, copy, distribute, transmit, display, perform,
              reproduce, publish, license, create derivative works from,
              transfer, or sell any information, software, products, or services
              obtained from the website without the prior written consent of
              MGWR PC.
            </div>
          )}
        </div>

        {/* Accordion Question 5 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(4)} // Toggle the fifth term
          >
            <span className="2xl:text-2xl">Limitation of Liability</span>
            <span>{openIndex === 4 ? "-" : "+"}</span>
          </button>
          {openIndex === 4 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              To the fullest extent permitted by law, MGWR PC shall not be
              liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to
              your use of the website or any promotions or offers provided on
              it. MGWR PC makes no representations or warranties of any kind,
              express or implied, regarding the accuracy, reliability, or
              completeness of any information or content provided on the
              website.
            </div>
          )}
        </div>

        {/* Accordion Question 6 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(5)} // Toggle the sixth term
          >
            <span className="2xl:text-2xl">Governing Law</span>
            <span>{openIndex === 5 ? "-" : "+"}</span>
          </button>
          {openIndex === 5 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              These terms and conditions shall be governed by and construed in
              accordance with the laws of the jurisdiction in which MGWR PC is
              incorporated, without regard to its conflict of law provisions.
            </div>
          )}
        </div>

        {/* Accordion Question 7 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(6)} // Toggle the seventh term
          >
            <span className="2xl:text-2xl">
              Changes to Terms and Conditions
            </span>
            <span>{openIndex === 6 ? "-" : "+"}</span>
          </button>
          {openIndex === 6 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              MGWR PC reserves the right to update or modify these terms and
              conditions at any time without prior notice. Your continued use of
              the website after any such changes constitutes your acceptance of
              the new terms and conditions.
            </div>
          )}
        </div>

        {/* Accordion Question 8 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(7)} // Toggle the eighth term
          >
            <span className="2xl:text-2xl">Contact Information</span>
            <span>{openIndex === 7 ? "-" : "+"}</span>
          </button>
          {openIndex === 7 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              If you have any questions about these terms and conditions, please
              contact us at:
              <br />
              • +49 5401 581
              <br />• mgwr.cp.accs@gmail.com
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;
