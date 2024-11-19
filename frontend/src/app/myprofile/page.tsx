import * as React from 'react';
import Stack from '@mui/material/Stack';
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E8DEF8]">
        <h1 style={{
            fontFamily: '"Poppins", sans-serif', // Closest match to "Poppy"
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Custom shadow effect
            }}
            className="flex items-center justify-center w-full text-[75px] font-extrabold absolute top-[90px] text-[#7F62AC] drop-shadow-md transition-transform transform ">My Profile</h1>{/*hover:scale-105*/}
        {/* Profile Picture */}
        <img
            src={userProfile.profilePic}
            alt="Profile"
            className="w-[200px] h-[200px] rounded-full items-center absolute top-[190px]"
        />

    

      <div className='rounded-3xl bg-[#F2D3EF] flex-col flex items-center w-[900px] h-[300px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[185px]'>

        {/* Name */}
        <h1 className="flex items-center justify-center w-full text-2xl font-bold absolute top-[7px]">{userProfile.knickname}</h1>
        <div className='flex flex-row absolute w-full absolute top-[53px]'>
            <div className='flex flex-col w-[500px] h-[180px] absolute left-[50px] top-[0px] justify-between h-full'>
                <h1 className=" w-full text-2xl font-bold">Full Name : {userProfile.firstlastname}</h1>
                <h1 className="w-full text-2xl font-bold">Year : {userProfile.Year}</h1>
                <h1 className="w-full text-2xl font-bold items-center">Role : {userProfile.Role}</h1>
                <h1 className="w-full block text-2xl font-bold items-center">Tel : {userProfile.Tel}</h1>
            </div>
            <div className='flex flex-col w-[300px] h-[180px] absolute left-[570px] top-[0px] justify-between h-full'>
                <h1 className=" w-full text-2xl font-bold">StudentId : {userProfile.StudentId}</h1>
                <h1 className="w-full text-2xl font-bold">Major : {userProfile.Major}</h1>
                <h1 className="w-full text-2xl font-bold items-center">IG : {userProfile.IG}</h1>
                <h1 className="w-full block text-2xl font-bold items-center">LineID {userProfile.LineID}</h1>
            </div>
        </div>

        {/* <h1 className="flex items-center justify-center w-full text-2xl font-bold mt-12">{userProfile.name}</h1> */}
        
        <Button variant="outlined" 
            sx={{ width: 300, 
            border: '2px solid',      // Thicker border (3px)
            borderColor: '#184A92',  // Custom border color
            borderRadius: '10px',    // Makes the button rounder
            fontWeight: 'bold',
            '&:hover': {
            borderColor: '#1D3557', // Custom hover border color
            },}}  
        className="flex items-center justify-center bg-[#F5F5F5] text-[#184A92] hover:bg-gray-300 absolute top-[245px]">Edit</Button>
      </div>
    </div>
  );
};


export default ProfilePage;
