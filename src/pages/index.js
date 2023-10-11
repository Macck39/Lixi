import React, { useEffect } from "react";
import ContactSection from "../components/ContactSection";
import Forms from "../components/Forms";
// import OurMission from "../components/OurMission";
import Testimonals from "../components/Testimonals";
import WhyUs from "../components/WhyUs";
import OurServices from "../components/OurServices";

const Home = () => {
  return (
    <>
      <Forms />
      <OurServices />
      <Testimonals />
      <WhyUs/>
      <ContactSection />
    </>
  );
};

export default Home;
