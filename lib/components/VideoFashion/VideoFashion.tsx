'use client';
import React, { useEffect, useState } from 'react';

const VideoFashion = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white mb-8">
      <p
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
        text-center font-light text-black/80 
        mb-4 px-4 py-4 leading-tight"
      >
        Essancia Fashion
      </p>
      <div className="w-full relative flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`
            w-full h-[400px] sm:h-[500px] md:h-[600px] 
            object-cover transition-all duration-700 ease-out
            ${!isMobile && 'md:w-[500px] hover:w-full hover:h-[700px]'}
          `}
        >
          <source src="/videos/video-girl-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoFashion;
