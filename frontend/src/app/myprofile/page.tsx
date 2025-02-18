// "use client"
// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// const ProfilePage = () => {
//   // Example profile data
//   const userProfile = {
//     knickname: 'JIMIN',
//     firstlastname: 'PARK JIMIN',
//     Year: 'Sophomore',
//     Role: 'Admin',
//     Tel: '1234567890',
//     StudentId: '6633167421',
//     Major: 'CEDT',
//     IG: 'j.m',
//     LineID: 'johndoe',
//     profilePic: 'https://via.placeholder.com/150', // Placeholder image. Replace with actual image URL.
//   };

//   const [isEditing, setIsEditing] = React.useState(false);
//   const [profile, setProfile] = React.useState(userProfile);

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-[#E8DEF8]">
//       <h1
//         style={{
//           fontFamily: '"Poppins", sans-serif', // Closest match to "Poppy"
//           textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Custom shadow effect
//         }}
//         className="flex items-center justify-center w-full text-[75px] font-extrabold absolute top-[90px] text-[#7F62AC] drop-shadow-md transition-transform transform "
//       >
//         My Profile
//       </h1>

//       {/* Profile Picture */}
//       <img
//         src={profile.profilePic}
//         alt="Profile"
//         className="w-[200px] h-[200px] rounded-full items-center absolute top-[190px]"
//       />

//       <div className="rounded-3xl bg-[#F2D3EF] flex-col flex items-center w-[900px] h-[300px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[185px]">
//         {/* Name */}
//         <h1 className="flex items-center justify-center w-full text-2xl font-bold absolute top-[7px]">
//           {profile.knickname}
//         </h1>
//         <div className="flex flex-row absolute w-full absolute top-[53px]">
//           <div className="flex flex-col w-[500px] h-[180px] absolute left-[50px] top-[0px] justify-between h-full">
//             <h1 className="w-full text-2xl font-bold">
//               Full Name:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="firstlastname"
//                   value={profile.firstlastname}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.firstlastname
//               )}
//             </h1>
//             <h1 className="w-full text-2xl font-bold">
//               Year:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="Year"
//                   value={profile.Year}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.Year
//               )}
//             </h1>
//             <h1 className="w-full text-2xl font-bold items-center">
//               Role:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="Role"
//                   value={profile.Role}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.Role
//               )}
//             </h1>
//             <h1 className="w-full block text-2xl font-bold items-center">
//               Tel:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="Tel"
//                   value={profile.Tel}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.Tel
//               )}
//             </h1>
//           </div>
//           <div className="flex flex-col w-[300px] h-[180px] absolute left-[570px] top-[0px] justify-between h-full">
//             <h1 className="w-full text-2xl font-bold">
//               StudentId:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="StudentId"
//                   value={profile.StudentId}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.StudentId
//               )}
//             </h1>
//             <h1 className="w-full text-2xl font-bold">
//               Major:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="Major"
//                   value={profile.Major}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.Major
//               )}
//             </h1>
//             <h1 className="w-full text-2xl font-bold items-center">
//               IG:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="IG"
//                   value={profile.IG}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.IG
//               )}
//             </h1>
//             <h1 className="w-full block text-2xl font-bold items-center">
//               LineID:{' '}
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="LineID"
//                   value={profile.LineID}
//                   onChange={handleChange}
//                   className="border rounded p-2"
//                 />
//               ) : (
//                 profile.LineID
//               )}
//             </h1>
//           </div>
//         </div>

//         <Button
//           variant="outlined"
//           onClick={handleEditClick}
//           sx={{
//             width: 300,
//             border: '2px solid', // Thicker border (3px)
//             borderColor: '#184A92', // Custom border color
//             borderRadius: '10px', // Makes the button rounder
//             fontWeight: 'bold',
//             '&:hover': {
//               borderColor: '#1D3557', // Custom hover border color
//             },
//           }}
//           className="flex items-center justify-center bg-[#F5F5F5] text-[#184A92] hover:bg-gray-300 absolute top-[245px]"
//         >
//           {isEditing ? 'Save' : 'Edit'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;




"use client"

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";
// import ProfilePage from "@/components/myprofile/ProfilePage";
// import EditProfileForm from "@/components/myprofile/EditProfileForm";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

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

const MyProfilePage = () => {
  // Example profile data
  const userProfile = {
    knickname: 'JIMIN',
    firstlastname: 'PARK JIMIN',
    Year: 'Sophomore',
    Role: 'Admin',
    Tel: '1234567890',
    StudentId: '6633167421',
    Major: 'CEDT',
    IG: 'j.m',
    LineID: 'johndoe',
    profilePic: "https://via.placeholder.com/150", // Placeholder image. Replace with actual image URL.
  };

  const [open, setOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Here you would save the editedProfile state to your backend or local storage
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E8DEF8]">
      <h1
        style={{
          fontFamily: '"Poppins", sans-serif', // Closest match to "Poppy"
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Custom shadow effect
        }}
        className="flex items-center justify-center w-full text-[75px] font-extrabold absolute top-[90px] text-[#7F62AC] drop-shadow-md transition-transform transform "
      >
        My Profile
      </h1>
      {/* Profile Picture */}
      <img
        src={userProfile.profilePic}
        alt="Profile"
        className="w-[200px] h-[200px] rounded-full items-center absolute top-[190px]"
      />

      <div className="rounded-3xl bg-[#F2D3EF] flex-col flex items-center w-[900px] h-[300px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[185px]">
        {/* Name */}
        <h1 className="flex items-center justify-center w-full text-2xl font-bold absolute top-[7px]">
          {userProfile.knickname}
        </h1>
        <div className="flex flex-row absolute w-full absolute top-[53px]">
          <div className="flex flex-col w-[500px] h-[180px] absolute left-[50px] top-[0px] justify-between h-full">
            <h1 className=" w-full text-2xl font-bold">
              Full Name : {userProfile.firstlastname}
            </h1>
            <h1 className="w-full text-2xl font-bold">Year : {userProfile.Year}</h1>
            <h1 className="w-full text-2xl font-bold items-center">Role : {userProfile.Role}</h1>
            <h1 className="w-full block text-2xl font-bold items-center">Tel : {userProfile.Tel}</h1>
          </div>
          <div className="flex flex-col w-[300px] h-[180px] absolute left-[570px] top-[0px] justify-between h-full">
            <h1 className=" w-full text-2xl font-bold">
              StudentId : {userProfile.StudentId}
            </h1>
            <h1 className="w-full text-2xl font-bold">Major : {userProfile.Major}</h1>
            <h1 className="w-full text-2xl font-bold items-center">IG : {userProfile.IG}</h1>
            <h1 className="w-full block text-2xl font-bold items-center">LineID {userProfile.LineID}</h1>
          </div>
        </div>

        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            width: 300,
            border: '2px solid', // Thicker border (3px)
            borderColor: '#184A92', // Custom border color
            borderRadius: '10px', // Makes the button rounder
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#1D3557', // Custom hover border color
            },
          }}
          className="flex items-center justify-center bg-[#F5F5F5] text-[#184A92] hover:bg-gray-300 absolute top-[245px]"
        >
          Edit
        </Button>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            name="firstlastname"
            value={editedProfile.firstlastname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Year"
            name="Year"
            value={editedProfile.Year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="Role"
            value={editedProfile.Role}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tel"
            name="Tel"
            value={editedProfile.Tel}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Student ID"
            name="StudentId"
            value={editedProfile.StudentId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Major"
            name="Major"
            value={editedProfile.Major}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Instagram"
            name="IG"
            value={editedProfile.IG}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Line ID"
            name="LineID"
            value={editedProfile.LineID}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyProfilePage;
