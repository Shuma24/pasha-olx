import React, { useState } from 'react';
import Image from 'next/image';
interface Image {
  url: string;
}

export const Slider = ({ images }: { images: Image[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className='relative w-full h-auto'>
      <div className='overflow-hidden'>
        {images.map((img, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } absolute inset-0`}>
            <Image
              unoptimized
              className='w-6/12 h-6/12'
              src={img.url}
              alt='Advert image'
              width={200}
              height={150}
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-600 text-white p-2 z-10'>
        Prev
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-600 text-white p-2 z-10'>
        Next
      </button>
    </div>
  );
};
