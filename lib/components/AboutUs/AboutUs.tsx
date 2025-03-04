import React from 'react';

import DreamerMarquee from '../DreamerMarquee/DreamerMarquee';
import DreamerProduct from '../DreamerProduct/DreamerProduct';
import OutFitWarm from '../OutFitWarm/OutFitWarm';
import FashionStages from '../FashionStage/FashionStage';
const AboutUs = () => {
  return (
    <>
      <div className="w-full relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white text-center px-4 z-10">
          About Us
        </p>
        <img
          src="/AboutUs/aboutUs.jpg"
          alt="About Us"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      </div>
      <OutFitWarm />
      <DreamerProduct />
      <FashionStages />
      <DreamerMarquee />
    </>
  );
};
export default AboutUs;
