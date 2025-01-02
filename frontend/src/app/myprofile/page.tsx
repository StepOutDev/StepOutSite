"use client";

import * as React from 'react';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserMe from "@/libs/user/getUserMe";

import Cookies from 'js-cookie';


import Stack from '@mui/material/Stack';
import EditProfileForm from '@/components/EditProfileForm';
import Button from '@mui/material/Button';

const ProfilePage = () => {
  // Example profile data
  const userProfile = {
    knickname : 'JIMIN',
    firstlastname : 'PARK JIMIN',
    Year : 'Sophomore',
    Role : 'Admin',
    Tel : '1234567890',
    StudentId : '6633167421',
    Major : 'CEDT',
    IG : 'j.m',
    LineID : 'johndoe',
    profilePic:
      "https://via.placeholder.com/150", // Placeholder image. Replace with actual image URL.
  };


  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchUserData = async () => {
      const token = Cookies.get('jwt'); // Retrieve the token from the cookie.
      // if (status === "loading") {
      //   console.log("2")
      //   setSessionLoading(true);
      if (status === "authenticated" && session?.user?.token) {
      //   setSessionLoading(false);
      //   setUserLoading(true);
      //   console.log("3")

        try {
          const data = await getUserMe(session?.user?.token);
          if (data) {
            setUserData(data);
          } else {
            console.error("User data is null or undefined.");
          }
        } catch (err: any) {
          console.error("Error fetching user profile:", err.message, err);
          setError("Failed to load user data.");
        } 
      }
    };

    fetchUserData();
    console.log("7")
  }, [session, status]);
    
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E8DEF8]">
        <h1 style={{
            fontFamily: '"Poppins", sans-serif', // Closest match to "Poppy"
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Custom shadow effect
            }}
            className="flex items-center justify-center w-full text-[75px] font-extrabold absolute top-[90px] text-[#7F62AC] drop-shadow-md transition-transform transform ">My Profile</h1>{/*hover:scale-105*/}
        {/* Profile Picture */}
        <img
            src={userData?.image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="absolute top-[190px]"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%', // Ensures a circular frame
              objectFit: 'cover', // Fits the frame while maintaining aspect ratio
              objectPosition: 'center', // Centers the image within the frame
            }}
          
        />

    

      <div className='rounded-3xl bg-[#F2D3EF] flex-col flex items-center w-[900px] h-[300px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[185px]'>

        {/* Name */}
        <h1 className="flex items-center justify-center w-full text-2xl font-bold absolute top-[7px]">{userData?.nick_name || "-"}</h1>
        <div className='flex flex-row absolute w-full absolute top-[53px]'>
            <div className='flex flex-col w-[500px] h-[170px] absolute left-[50px] top-[5px] justify-between h-full'>
                <h1 className=" w-full text-2xl font-bold">Full Name : {userData?.first_name || "-"}</h1>
                <h1 className="w-full text-2xl font-bold">Year : {userData?.year || "-"}</h1>
                <h1 className="w-full text-2xl font-bold items-center">Role : {userData?.role || "-"}</h1>
                <h1 className="w-full block text-2xl font-bold items-center">Tel : {userData?.telephone || "-"}</h1>
            </div>
            <div className='flex flex-col w-[300px] h-[170px] absolute left-[570px] top-[5px] justify-between h-full'>
                <h1 className=" w-full text-2xl font-bold">StudentId : {userData?.student_id || "-"}</h1>
                <h1 className="w-full text-2xl font-bold">Major : {userData?.major || "-"}</h1>
                <h1 className="w-full text-2xl font-bold items-center">IG : {userData?.instagram || "-"}</h1>
                <h1 className="w-full block text-2xl font-bold items-center">LineID : {userData?.line || "-"}</h1>
            </div>
        </div>

        {/* <h1 className="flex items-center justify-center w-full text-2xl font-bold mt-12">{userProfile.name}</h1> */}
        
        <div className="flex items-center justify-center absolute top-[245px] w-full">
          <EditProfileForm />
        </div>
        {/* <Button variant="outlined" 
            sx={{ width: 300, 
            border: '2px solid',      // Thicker border (3px)
            borderColor: '#184A92',  // Custom border color
            borderRadius: '10px',    // Makes the button rounder
            fontWeight: 'bold',
            '&:hover': {
            borderColor: '#1D3557', // Custom hover border color
            },}}  
        className="flex items-center justify-center bg-[#F5F5F5] text-[#184A92] hover:bg-gray-300 absolute top-[245px]">Edit</Button> */}
      </div>
    </div>
  );
};


export default ProfilePage;
