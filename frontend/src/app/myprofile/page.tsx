
"use client"

import * as React from 'react';
import Stack from '@mui/material/Stack';
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
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";


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

const majorList = [
  "-", "Civil", "Electrical", "Mechanical", "Automotive", "Industrial",
  "Environmental", "Metallurgical & Materials", "Mining & Petroleum", "Chemical", "Computer",
  "Nuclear", "Georesources", "Survey", "Robotics & AI", "ICE",
  "NANO", "ADME", "AERO", "CHPE", "CEDT", "SEMI"
];


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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {

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
        try {
          const response = await getUserMe(cookie);
          console.log("getUserMe response:", response);
    
          if (response) {
            console.log("User data received:", response); 
            setProfile(response); 
            setImage(response?.image);
          } else {
            console.error("User data is undefined or null:", response);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [cookie, profile]);
  

  return (
    <div className=''>
      <div className="min-h-screen flex flex-col bg-[#E8DEF8]">
        <h1
          style={{
            fontFamily: '"Poppins", sans-serif', // Closest match to "Poppy"
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Custom shadow effect
          }}
          className="flex mt-10 items-center justify-center w-full md:text-[75px] text-[60px] font-extrabold pt-10 text-[#7F62AC] drop-shadow-md transition-transform transform"
        >
          My Profile
        </h1>
        

        <div className="justify-items-center md:px-10 px-5 ">{/*rounded-3xl bg-[#FFE3EF] flex md:flex-row flex-col items-center w-[1400px] h-[400px] mx-auto p-6 text-[#184A92] relative shadow-2xl absolute top-[100px] absolute top-[220px]*/}

          
          <div className="w-full mx-8 rounded-3xl flex flex-col p-6 text-[#184A92] shadow-2xl my-10 bg-[#FFE3EF] overflow-hidden">{/*absolute top-[7px]*/}
            <div className='flex md:flex-row flex-col'>
              <div className='flex px-10 pb-10 md:w-fit w-full md:justify-start justify-center'>
                <ProfileImg imageUrl={profile?.image} handleImageUpload={handleImageUpload} />
              </div>

              <div className='flex flex-col w-full ml-6'>
                <div className="flex flex-row flex-wrap">
                  <div className='flex flex-col space-y-2 mr-4'>
                    <div className='flex md:flex-row flex-wrap gap-2'>
                      <h1 className="md:text-4xl text-3xl font-bold">{profile?.first_name} </h1>
                      <h1 className="md:text-4xl text-3xl font-bold">{profile?.last_name} </h1>
                    </div>
                    <div>
                      <h1 className="md:text-4xl text-3xl font-bold">({profile?.nick_name})</h1>
                    </div>
                  </div>
                  <div className="text-[15px] rounded-full px-6 h-6 mt-2 font-bold bg-[#FFDC94]">{profile?.role}</div>
                </div>

                <div className='my-6'>
                  <hr style={{ 
                    border: "1.5px solid", 
                    width: "90%" 
                    }} />
                </div>

                <div className='flex md:flex-row flex-col flex-wrap w-full gap-8'>
                  <div className='flex flex-1 flex-row space-x-10 mr-5'>
                    <div className='flex flex-col space-y-8'>
                      <h1 className="md:text-[20px] text-[16px] font-bold">StudentId</h1>
                      <h1 className="md:text-[20px] text-[16px] font-bold">Year</h1>
                      <h1 className="md:text-[20px] text-[16px] font-bold">Major</h1>
                    </div>
                    <div className='flex flex-col space-y-8'>
                      <h1 className="md:text-[20px] text-[16px] font-semibold"> {profile?.student_id} </h1>
                      <h1 className="md:text-[20px] text-[16px] font-semibold"> {profile?.year} </h1>
                      <h1 className="md:text-[20px] text-[16px] font-semibold"> {profile?.major} </h1>
                    </div>
                  </div>

                  <div className='flex flex-1 flex-row space-x-10'>
                    <div className='flex flex-col space-y-8'>
                      <h1 className="md:text-[20px] text-[16px] font-bold">Tel</h1>
                      <h1 className="md:text-[20px] text-[16px] font-bold">IG</h1>
                      <h1 className="md:text-[20px] text-[16px] font-bold">LineID</h1>
                    </div>
                    <div className='flex flex-col space-y-8'>
                      <h1 className="md:text-[20px] text-[16px] font-semibold"> {profile?.telephone} </h1>
                      <h1 className="md:text-[20px] text-[16px] font-semibold"> {profile?.instagram} </h1>
                      <h1 className="md:text-[20px] text-[16px] font-semibold"> {profile?.line} </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='flex items-center justify-center w-full my-10'>
              <button
                onClick={handleClickOpen}
                className="px-10 py-2 text-nowrap bg-[#F5F5F5] rounded-xl border-2 border-[#184A92] font-bold text-[#184A92] hover:bg-[#184A92] hover:text-[#F5F5F5] shadow-xl transition duration-150 text-[14px]"
              >
                EDIT PROFILE
              </button>
            </div>
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
            <TextField
              label="Nick Name"
              name="nick_name"
              value={editedProfile?.nick_name || ""}
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
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              label="Role"
              name="role"
              value={editedProfile?.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            /> */}
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Major</InputLabel>
              <Select
                name="major"
                value={editedProfile?.major || ""}
                onChange={handleInputChange}
              >
                {majorList.map((major) => (
                  <MenuItem key={major} value={major}>
                    {major}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
    </div>

    
  );
};

export default MyProfilePage;