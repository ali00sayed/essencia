import React from 'react';
import Image from 'next/image';
import DreamerMarquee from '../DreamerMarquee/DreamerMarquee';
import DreamerProduct from '../DreamerProduct/DreamerProduct';
import OutFitWarm from '../OutFitWarm/OutFitWarm';
import FashionStages from '../FashionStage/FashionStage';

const AboutUs = () => {
  return (
    <>
      <div className="w-full relative h-[50vh] md:h-[60vh] lg:h-[80vh]">
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <Image
          src="/images/aboutUs/Group-3.jpeg"
          alt="About Us"
          className="w-full h-full object-cover absolute inset-0"
          fill
          priority
          sizes="100vw"
          quality={90}
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
