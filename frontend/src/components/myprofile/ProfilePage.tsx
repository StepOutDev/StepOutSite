// src/components/myprofile/ProfilePage.tsx

import React from 'react';
import { Button } from '@mui/material';
import EditProfileForm from '@/components/myprofile/EditProfileForm';

interface UserProfile {
  knickname: string;
  firstlastname: string;
  Year: string;
  Role: string;
  Tel: string;
  StudentId: string;
  Major: string;
  IG: string;
  LineID: string;
  profilePic: string;
}

interface ProfilePageProps {
  userProfile: UserProfile;
  onEditClick: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onEditClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E8DEF8]">
      <h1
        style={{
          fontFamily: '"Poppins", sans-serif',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}
        className="flex items-center justify-center w-full text-[75px] font-extrabold absolute top-[90px] text-[#7F62AC] drop-shadow-md transition-transform transform "
      >
        My Profile
      </h1>
      <img
        src={userProfile.profilePic}
        alt="Profile"
        className="w-[200px] h-[200px] rounded-full items-center absolute top-[190px]"
      />
      <div className="rounded-3xl bg-[#F2D3EF] flex-col flex items-center w-[900px] h-[300px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[185px]">
        <h1 className="flex items-center justify-center w-full text-2xl font-bold absolute top-[7px]">
          {userProfile.knickname}
        </h1>
        <div className="flex flex-row absolute w-full absolute top-[53px]">
          <div className="flex flex-col w-[500px] h-[180px] absolute left-[50px] top-[0px] justify-between h-full">
            <h1 className=" w-full text-2xl font-bold">Full Name : {userProfile.firstlastname}</h1>
            <h1 className="w-full text-2xl font-bold">Year : {userProfile.Year}</h1>
            <h1 className="w-full text-2xl font-bold">Role : {userProfile.Role}</h1>
            <h1 className="w-full text-2xl font-bold">Tel : {userProfile.Tel}</h1>
          </div>
          <div className="flex flex-col w-[300px] h-[180px] absolute left-[570px] top-[0px] justify-between h-full">
            <h1 className=" w-full text-2xl font-bold">StudentId : {userProfile.StudentId}</h1>
            <h1 className="w-full text-2xl font-bold">Major : {userProfile.Major}</h1>
            <h1 className="w-full text-2xl font-bold">IG : {userProfile.IG}</h1>
            <h1 className="w-full text-2xl font-bold">LineID {userProfile.LineID}</h1>
          </div>
        </div>

        <Button
          variant="outlined"
          onClick={onEditClick}
          sx={{
            width: 300,
            border: '2px solid',
            borderColor: '#184A92',
            borderRadius: '10px',
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#1D3557',
            },
          }}
          className="flex items-center justify-center bg-[#F5F5F5] text-[#184A92] hover:bg-gray-300 absolute top-[245px]"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
