'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  images: string[];
  name: string;
}

export default function ProductCarousel({
  images,
  name,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("Hello from carousel let's connect together!!!");

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src={images[currentIndex] || '/placeholder.svg'}
          alt={`${name} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
