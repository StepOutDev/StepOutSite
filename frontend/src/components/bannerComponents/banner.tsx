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

      <div className="flex flex-col absolute w-full h-[80vh] pt-[100px] left-[5%] transform text-white z-20 font-bold">
        <span className="text-[80px] md:text-[150px]"
          style={{
            textShadow: "5px 8px 0px rgba(0, 0, 0, 0.7)", // Drop shadow
            WebkitTextStroke: "1px #88383", // Stroke (outline)
          }}
        >
            StepOut
        </span>
        <div className="flex flex-col space-y-2 ml-5 ">
          <span className="md:text-[26px] text:text-[14px]"
            style={{
              textShadow: "0px 3px 0px rgba(0, 0, 0, 0.7)", // Drop shadow
              WebkitTextStroke: "1px #88383", // Stroke (outline)
            }}
          >
            "See the music, Hear the dance"
          </span>
          {/* <span className="md:text-[16px]">
            CU INTANIA DANCE CLUB, Faculty of Engineering
          </span>
          <span className="md:text-[16px]">
            Chulalonglorn University
          </span> */}
        </div>
      </div>

      <div className="w-full h-full flex transition-transform duration-1000 ease-in-out"
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
            <div className="absolute bottom-14 z-40 left-1/2 transform -translate-x-1/2 text-white md:text-[26px] text-[14px]"
              style={{
                textShadow: "0px 3px 0px rgba(0, 0, 0, 0.7)", // Drop shadow
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
      <div className="absolute bottom-4 left-1/2 transform z-50 -translate-x-1/2 flex space-x-2 z-50">
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
