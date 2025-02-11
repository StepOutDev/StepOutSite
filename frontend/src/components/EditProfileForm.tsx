"use client"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';


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

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleOk = () => {
    setIsModalOpen(false); // Close the modal when OK is clicked
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal when Cancel is clicked
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

      <Button
        type="primary"
        onClick={showModal}
        style={{
            width: '300px', 
            border: '2px solid',      // Thicker border
            borderColor: '#184A92',   // Custom border color
            borderRadius: '10px',     // Makes the button rounder
            fontWeight: 'bold',       // Bold text
            color: '#184A92',         // Custom text color
            backgroundColor: '#F5F5F5', // Custom background color
            transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effect
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C5C5C5'; // Background color on hover
            e.currentTarget.style.color = '#184A92'; // Text color on hover
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F5F5F5'; // Revert to original background
            e.currentTarget.style.color = '#184A92'; // Revert to original text color
        }}
        >Edit
        </Button>

      <Modal
        title="Basic Modal"
        open={isModalOpen} // Controlled state for modal visibility
        onOk={handleOk} // Handles OK button click
        onCancel={handleCancel} // Handles Cancel button click
        getContainer={false} // Optional: fixes rendering issues with React 19
      >
        
        
        <div>
        {/* Name */}
        <h1 className='flex items-center justify-center w-full'>{userProfile.knickname}</h1>
        <div className='flex flex-row absolute w-full absolute top-[53px]'>
            <div className='flex flex-col w-[500px] h-[180px] absolute left-[50px] top-[0px] justify-between h-full'>
                <h1>Full Name : {userProfile.firstlastname}</h1>
                <h1>Year : {userProfile.Year}</h1>
                <h1>Role : {userProfile.Role}</h1>
                <h1>Tel : {userProfile.Tel}</h1>
            </div>
            <div className='flex flex-col w-[300px] h-[180px] absolute left-[570px] top-[0px] justify-between h-full'>
                <h1>StudentId : {userProfile.StudentId}</h1>
                <h1>Major : {userProfile.Major}</h1>
                <h1>IG : {userProfile.IG}</h1>
                <h1>LineID {userProfile.LineID}</h1>
            </div>
        </div>

        {/* <h1 className="flex items-center justify-center w-full text-2xl font-bold mt-12">{userProfile.name}</h1> */}
      </div>

      </Modal>
    </>
  );
};

export default App;
