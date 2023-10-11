import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonals = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const feedback = [
    {
      id: 1,
      name: "Kishore Kumar Singh K",
      comment:
        "Professional and friendly driver. The cab was also completely neat and clean which made me feel more comfortable and all of this at a discounted price as compared to OLA or UBER. I would go ahead and say every time i would prefer travelling with lixi.",
    },
    {
      id: 2,
      name: "Kavya Dhurv",
      comment:
        " Lixi is the next best cab service in India. The app is easy to use, the drivers are always before time, and the prices are reasonable. I highly recommend Lixi to everyone.",
    },
    {
      id: 3,
      name: "Gopal",
      comment:
        "I've been using Lixi for over 3 months now and I've never had a bad experience. The drivers are always friendly and helpful, and the cars are always clean and comfortable. I would definitely recommend Lixi to anyone looking for a reliable and affordable ride.",
    },
    {
      id: 4,
      name: "Sujata",
      comment:
        "I'm a huge fan of Lixi! It's the best way to get around town. The drivers are always on time, the cars are always clean, and the prices are very reasonable. I highly recommend Lixi to anyone.",
    },
  ];

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Function to update scrollY value on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const translateY = `${scrollY * 0.4}px`;
  // Adjust the background position based on scrollY for the parallax effect
  const backgroundPosition = `bottom center ${-scrollY * 0.2}px`; // You can adjust the multiplier for the parallax effect


  return (
    <div className="bg-[#D4F4FF]">
      <div className="md:text-4xl text-center font-semibold mb-4 pt-4 ">
        What our Customers say
      </div>
      <div className="flex justify-center">
        <div className="w-4/5 md:w-3/5 flex justify-center  items-center mb-8">
          <Slider
            {...settings}
            className="w-3/4 h-fit rounded-3xl border-2 bg-white border-blue-400 shadow-xl"
          >
            {feedback.map((comm) => (
              <div key={comm.id} className="p-4  rounded-3xl  md:py-10">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="inline-block w-8 h-8 text-gray-400 mb-8"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                </div>
                <p className="text-xs md:text-base font-semibold overflow-clip">
                  {comm.comment}
                </p>
                <p className="md:text-sm text-xs text-center mt-2 italic">- {comm.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonals;
