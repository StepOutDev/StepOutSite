import { useState } from "react";


interface ProfileImgProps {
  imageUrl?: string; // imageUrl is now an optional prop
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileImg({ imageUrl, handleImageUpload }: ProfileImgProps) {
  const [image, setImage] = useState<string>(imageUrl || "https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/6633074721.webp");

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div>
      <label htmlFor="fileInput" className="cursor-pointer">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
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
