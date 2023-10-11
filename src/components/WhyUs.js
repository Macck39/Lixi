import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isVisible, controls]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2, // Delay between each list item
      },
    },
  };

  const listItemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-gray-100 my-12 py-3 relative"
      style={{
        background: 'url("/images/images/innovaCristaimage.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row-reverse items-center pt-4 ">
          <div className="w-full md:pl-24 pl-5 md:ml-96 font-mono">
            <motion.ul
              initial="hidden"
              animate={controls}
              variants={listVariants}
              className="md:pl-96 md:pr-10 list-none flex font-extrabold flex-col  justify-center"
            >
              <motion.li
                variants={listItemVariants}
                className="text-2xl  mb-4 flex items-center shadow-md  border-b-2 rounded-md "
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600 text-4xl mx-2">✓</span> Reserved Taxi
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="text-2xl  mb-4 flex items-center shadow-md rounded-md border-b-2 "
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600 text-4xl ml-2 mr-1">✓</span> Effective Trip Planning
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="text-2xl  mb-4 flex items-center shadow-md rounded-md border-b-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600 text-4xl mx-2">✓</span> Fixed Price
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="text-2xl  mb-4 flex items-center shadow-md rounded-md border-b-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600 text-4xl mx-2">✓</span> Premium Sedan Taxi
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="text-2xl  mb-4 flex items-center shadow-md rounded-md border-b-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600 text-4xl mx-2">✓</span> 24/7 Service
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="text-2xl  mb-4 flex items-center shadow-md rounded-md border-b-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600 text-4xl mx-2">✓</span> Professional Drivers
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
