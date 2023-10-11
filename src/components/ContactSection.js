import React from "react";
import { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { BiPhoneCall } from 'react-icons/bi';


const ContactSection = () => {
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(true);

  const openWhatsAppWithMessage = () => {
    setShowWhatsAppPrompt(!showWhatsAppPrompt);
  };


  return (
    <div>
      <section className="py-6 dark:bg-gray-600 dark:text-gray-50">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-4xl font-bold leading-none text-center">
            Experience Great Support
          </h1>
          <p className=" md:text-xl font-medium text-center">
            Talk or chat directly with our team which comes with several years of industry experience.
          </p>
          <div className="flex flex-col items-center">
            <button
              onClick={openWhatsAppWithMessage}
              className="bg-[#32C534] text-white py-2 px-4 rounded-full shadow-md transition hover:bg-[#258626]"
            >
              Contact Us
            </button>

            {showWhatsAppPrompt && (
              <div className="mt-3  ">
                <p>How would you like to contact us?</p>
                <div className="flex justify-around mt-2">
                  <button
                    onClick={() => window.open('tel:8618888210')}
                    className="mt-2 px-3 py-1 flex bg-[#3681e2] text-white rounded-md shadow-md hover:bg-[#4074b8]"
                  >
                    <div className="flex items-center">
                      <BiPhoneCall className="h-4 w-4 mr-2" />
                      <span className="">Call</span>
                    </div>
                  </button>
                  <div className="mx-1 mt-2">|</div>
                  <button
                    onClick={() =>
                      window.open(
                        'https://wa.me/8618888210/?text=Hello,%20I%20have%20a%20question.'
                      )
                    }
                    className="mt-2 px-3 py-1 bg-[#32C534] flex text-white rounded-md shadow-md hover:bg-[#258626]"
                  >
                    <div className="flex items-center">
                      <BsWhatsapp className="h-4 w-4 mr-2 " />
                      <span className="">Message</span>
                    </div>
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
