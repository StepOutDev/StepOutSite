"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Banner() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {src: "/images/bannerImg/freshyGameBanner.jpeg", name: "Freshy Game 2024", link:"https://www.youtube.com/watch?v=D00RjBXpHow&t=206s"},
    {src: "/images/bannerImg/vishnuBanner.jpg", name: "Vishnu 22th", link: "https://www.youtube.com/watch?v=JMXmwaOzHkI"},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="w-full h-[100vh] overflow-hidden relative">

        <div 
            className="absolute top-[5%] left-1/2 transform -translate-x-1/2 text-white text-[150px] z-30 font-serif font-bold tracking-wide"
            style={{
                textShadow: "0px 5px 0px rgba(0, 0, 0, 0.7)", // Drop shadow
                WebkitTextStroke: "1px #88383", // Stroke (outline)
            }}
        >
        <span className="text-[80px] sm:text-[90px] md:text-[100px] lg:text-[128px] xl:text-[150px] 2xl:text-[180px]">
            StepOut
        </span>
      </div>

      <div
        className="w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            {/* Purple Overlay */}
            <div className="absolute inset-0 bg-[#7A4E9A] opacity-60 z-20"></div>
            <Image
              src={image.src}
              alt={`Banner image ${index + 1}`}
              fill
              objectFit="cover"
            />
            {/* Image Name at the Bottom */}
            <div
              className="absolute bottom-14 left-1/2 transform -translate-x-1/2 text-white text-[20px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[50px] z-30 font-poppins"
              style={{
                textShadow: "0px 5px 0px rgba(0, 0, 0, 0.7)", // Drop shadow
                WebkitTextStroke: "1px #88383", // Stroke (outline)
            }}
            >
              <a href={image.link} className="hover:text-[#7A4E9A] transition duration-500">
                {image.name}
              </a>
            </div>
          </div>
        ))}
        
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              currentImageIndex === index ? "bg-gray-300" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
