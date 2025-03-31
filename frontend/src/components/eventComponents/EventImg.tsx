import { useState } from "react";


interface EventImgProps {
  imageUrl?: string; // imageUrl is now an optional prop
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EventImg({ imageUrl, handleImageUpload }: EventImgProps) {
  const [image, setImage] = useState<string>(imageUrl || "https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/6633074721.webp");

  return (
    <div>
      <label htmlFor="fileInput" className="cursor-pointer">
        <img
          src={imageUrl}
          alt="event"
          className="w-full h-[250px] px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-3xl"
        />
        <button
            type="button"
            className={`absolute inset-0 m-auto w-fit h-fit py-2 px-4 text-[#7A4E9A] rounded-xl border-2 border-[#7A4E9A] hover:bg-[#c596c2] transition-all ${
              imageUrl ? "bg-transparent" : "bg-white"
            }`}
            onClick={() => document.getElementById("fileInput")?.click()}
        >
            Select Image
        </button>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
