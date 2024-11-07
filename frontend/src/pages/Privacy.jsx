import React, { useState } from "react";
import Title from "./../components/Title";

const Privacy = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open state
  };

  return (
    <div>
      {/* ----------------- PRIVACY POLICY ----------------- */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"PRIVACY"} text2={"POLICY"} />
      </div>

      {/* Accordion Section for Privacy Policy */}
      <div className="mt-8">

        {/* Accordion Question 1 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(0)} // Toggle the first term
          >
            <span className="2xl:text-2xl">Information We Collect</span>
            <span>{openIndex === 0 ? "-" : "+"}</span>
          </button>
          {openIndex === 0 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              Information You Provide: We may collect personal information that you provide to us when you use the Website, such as your name, email address, phone number, and any other information you choose to provide.
            </div>
          )}
        </div>

        {/* Accordion Question 2 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(1)} // Toggle the second term
          >
            <span className="2xl:text-2xl">How We Use Your Information</span>
            <span>{openIndex === 1 ? "-" : "+"}</span>
          </button>
          {openIndex === 1 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              We may use the information we collect to:
              <ul className="list-disc pl-5">
                <li>Provide, maintain, and improve the Website.</li>
                <li>Communicate with you about your account or transactions.</li>
                <li>Send you promotional materials or other communications.</li>
                <li>Detect, investigate, and prevent fraud or other illegal activities.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Accordion Question 3 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(2)} // Toggle the third term
          >
            <span className="2xl:text-2xl">Sharing of Your Information</span>
            <span>{openIndex === 2 ? "-" : "+"}</span>
          </button>
          {openIndex === 2 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              We may share your personal information with third parties in the following circumstances:
              <ul className="list-disc pl-5">
                <li>With service providers who assist us in operating the Website or providing services to you.</li>
                <li>With third parties for marketing or advertising purposes, where you have provided consent.</li>
                <li>In response to a legal request or government investigation.</li>
                <li>If we believe disclosure is necessary to protect the rights, property, or safety of MGWR PC, our users, or others.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Accordion Question 4 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(3)} // Toggle the fourth term
          >
            <span className="2xl:text-2xl">Your Choices</span>
            <span>{openIndex === 3 ? "-" : "+"}</span>
          </button>
          {openIndex === 3 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              You may choose not to provide certain personal information, but this may limit your ability to use certain features of the Website.
              <br />
              Please note that any reservation made on our system will be regarded as nonexistent if it is not utilized within 3 days from the date of reservation. This means your reservation will be automatically cancelled after this period. If you wish to use our system again, you will need to make a new reservation.
            </div>
          )}
        </div>

        {/* Accordion Question 5 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(4)} // Toggle the fifth term
          >
            <span className="2xl:text-2xl">Data Security</span>
            <span>{openIndex === 4 ? "-" : "+"}</span>
          </button>
          {openIndex === 4 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              We take reasonable measures to protect your personal information from loss, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </div>
          )}
        </div>

        {/* Accordion Question 6 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(5)} // Toggle the sixth term
          >
            <span className="2xl:text-2xl">Children's Privacy</span>
            <span>{openIndex === 5 ? "-" : "+"}</span>
          </button>
          {openIndex === 5 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              The Website is not intended for children under the age of 13, and we do not knowingly collect personal information from children under this age. If you are under 13, please do not use the Website or provide any personal information to us.
            </div>
          )}
        </div>

        {/* Accordion Question 7 */}
        <div className="border-b">
          <button
            className="w-full text-left px-4 py-2 text-lg font-semibold hover:bg-orange-400 transition-colors flex justify-between items-center"
            onClick={() => toggleAccordion(6)} // Toggle the seventh term
          >
            <span className="2xl:text-2xl">Changes to This Privacy Policy</span>
            <span>{openIndex === 6 ? "-" : "+"}</span>
          </button>
          {openIndex === 6 && (
            <div className="px-4 py-2 text-gray-600 text-sm text-left bg-orange-100 2xl:text-2xl">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
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
              If you have any questions about these terms and conditions, please contact us at:
              <ul className="list-disc pl-5">
                <li>Tel: +49 5401 581</li>
                <li>Gmail: mgwr.cp.accs@</li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Privacy;
