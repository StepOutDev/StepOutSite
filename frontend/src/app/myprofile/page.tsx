
"use client"

import * as React from 'react';
import Stack from '@mui/material/Stack';
import EditProfileForm from '@/components/EditProfileForm';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

import getUserMe from '@/libs/user/getUserMe';
import { GetCookie } from "../../components/signinForm";
import { User } from "../../../interface";

import updateUser from '@/libs/user/UpdateUserMe';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";


import ProfileImg from '@/components/profile/profileImg';

import { useRouter } from "next/navigation";


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
  // const userProfile = {
  //   knickname: 'JIMIN',
  //   firstlastname: 'PARK JIMIN',
  //   Year: 'Sophomore',
  //   Role: 'Admin',
  //   Tel: '1234567890',
  //   StudentId: '6633167421',
  //   Major: 'CEDT',
  //   IG: 'j.m',
  //   LineID: 'johndoe',
  //   profilePic: "https://via.placeholder.com/150", // Placeholder image. Replace with actual image URL.
  // };
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [editedProfile, setEditedProfile] = useState<User | null>(null); // New state to hold the edited profile
  const [image, setImage] = useState<string>("https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/6633074721.webp");
  const cookie = GetCookie("jwt");


  const handleClickOpen = () => {
    if (profile) {
      setEditedProfile({ ...profile }); // Copy current profile to the edit state
    }
    setOpen(true);
    // if (profile && !editedProfile) {  // Only set editedProfile if it's not set yet
    //   setEditedProfile(profile);  // Copy current profile to editedProfile
    // }
     //else {
    //   setEditedProfile(null); // Set to null if profile is undefined
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async() => {
    // Here you would save the editedProfile state to your backend or local storage
    if (!editedProfile) {
      console.error("No edited profile data.");
      return;
    }
  
    if (!profile?.role || !profile?.student_id) {
      console.error("Missing profile role or student ID.");
      return;
    }
  
    console.log("Saving profile:", editedProfile);

    const formData = new FormData();
    formData.append('first_name', editedProfile.first_name);
    formData.append('last_name', editedProfile.last_name);
    formData.append('year', editedProfile.year);
    // formData.append('role', editedProfile.role);
    formData.append('telephone', editedProfile.telephone);
    // formData.append('student_id', editedProfile.student_id);
    formData.append('major', editedProfile.major);
    formData.append('instagram', editedProfile.instagram);
    formData.append('line', editedProfile.line);

    try {
      const response = await updateUser(cookie, profile?.role || '', profile?.student_id || null, formData);
      console.log('User updated successfully:', response);
      setProfile({ ...editedProfile });  // Update profile with new data
      setOpen(false);  // Close the dialog
    } catch (error) {
      console.log('cookie', cookie, profile.role, profile.student_id);
      console.log('Failed to update user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {

    const { name, value } = e.target;

    setEditedProfile((prevState) => ({
      ...prevState!,
      [name]: value, // อัปเดตค่าตาม field ที่เปลี่ยนแปลง
    }));
  };

  const handleImageUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      console.log(file);

      reader.onloadend = async() => {
        setImage(reader.result as string);
        const formData = new FormData();
        formData.append('image', file);
        try {
          await updateUser(cookie, profile?.role || '', profile?.student_id || null, formData);
          // Once the image is uploaded, update the profile with the new image
          setProfile((prevState) => ({
            ...prevState!,
            image: reader.result as string  , // Update the profile image with the new image URL
          }));
          console.log('User updated image successfully:', file);
        } catch (error) {
          console.log('cookie', cookie, profile?.role, profile?.student_id);
          console.log('Failed to update user image :', error);
        }
      };

      
          
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (!cookie) {
      router.push("/signin"); // Redirect to login if no token
    } else {
      setLoading(false); // Allow access if token exists
    }
    
    const fetchUserData = async () => {
      if (cookie && !profile) {  // Fetch only if profile is not already set
        const userProfile: User = (await getUserMe(cookie)).data;
        setProfile(userProfile);
        setImage(userProfile?.image);
        // setEditedProfile(profile);  // Set initial profile for editing
      }
    };
    fetchUserData();
  }, [cookie, profile]);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8DEF8]">
      <h1
        style={{
          fontFamily: '"Poppins", sans-serif', // Closest match to "Poppy"
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Custom shadow effect
        }}
        className="flex items-center justify-center w-full text-[75px] font-extrabold absolute top-[90px] text-[#7F62AC] drop-shadow-md transition-transform transform"
      >
        My Profile
      </h1>
      

      <div className="rounded-3xl bg-[#F2D3EF] flex flex-row items-center w-[1400px] h-[300px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[100px]"> {/*absolute top-[220px]*/}

        
        <div className="flex flex-row absolute w-full absolute top-[53px]">{/*absolute top-[7px]*/}
          <div className='flex flex-row basis-1/2'>
            <div className='flex basis-1/3'><ProfileImg imageUrl={profile?.image} handleImageUpload={handleImageUpload} /></div>
            <div className="flex flex-col justify-end mb-10">{/*flex flex-col w-[500px] h-[180px] absolute left-[50px] top-[0px] justify-between h-full*/}
              <div className="flex flex-row gap-4 mb-6">
                <h1 className="text-4xl font-bold">{profile?.first_name} {profile?.last_name} ({profile?.nick_name})</h1>
                <h1 className="text-[15px] rounded-full px-6 h-6 mt-2 font-bold flex items-center bg-[#FFEDD5]">{profile?.role}</h1>
              </div>
              <h1 className=" w-full text-[20px] font-bold">StudentId : {profile?.student_id} </h1>
              <h1 className="w-full text-[20px] font-bold">Year : {profile?.year}</h1>
              <h1 className="w-full text-[20px] font-bold">Major : {profile?.major}</h1>
            </div>
          </div>
          <div className="basis-1/3 flex flex-col justify-end mb-10">{/*flex flex-col w-[300px] h-[180px] absolute left-[570px] top-[0px] justify-between h-full*/}
            <h1 className="w-full block text-[20px] font-bold items-center">Tel : {profile?.telephone}</h1>
            <h1 className="w-full text-[20px] font-bold items-center">IG : {profile?.instagram}</h1>
            <h1 className="w-full block text-[20px] font-bold items-center">LineID : {profile?.line}</h1>
          </div>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              width: 120,
              border: '2px solid', // Thicker border (3px)
              borderColor: '#184A92', // Custom border color
              borderRadius: '10px', // Makes the button rounder
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#1D3557', // Custom hover border color
              },
            }}
            className="flex items-center justify-center bg-[#F5F5F5] text-[#184A92] hover:bg-gray-300 absolute right-[100px] top-[10px] text-[13px]"
          >
            Edit Profile
          </Button>
        </div>

        

      </div>

      {/* Edit Profile Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="first_name"
            value={editedProfile?.first_name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={editedProfile?.last_name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Year"
            name="year"
            value={editedProfile?.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          /> */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={editedProfile?.year || ""}
              onChange={handleInputChange}
            >
              <MenuItem value="1">Year 1</MenuItem>
              <MenuItem value="2">Year 2</MenuItem>
              <MenuItem value="3">Year 3</MenuItem>
              <MenuItem value="4">Year 4</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Role"
            name="role"
            value={editedProfile?.role}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tel"
            name="telephone"
            value={editedProfile?.telephone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Student ID"
            name="StudentId"
            value={editedProfile?student_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          /> */}
          <TextField
            label="Major"
            name="major"
            value={editedProfile?.major}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Instagram"
            name="instagram"
            value={editedProfile?.instagram}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Line ID"
            name="line"
            value={editedProfile?.line}
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