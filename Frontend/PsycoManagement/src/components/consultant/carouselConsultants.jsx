/* eslint-disable react/prop-types */
import { useState } from 'react';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const goPrev = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <button className="absolute left-0 p-4" onClick={goPrev}>Prev</button>
      <button className="absolute right-0 p-4" onClick={goNext}>Next</button>
    </div>
  );
};

export default Carousel;
