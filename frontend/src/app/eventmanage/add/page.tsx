"use client"
import { useState } from "react"
import userRegister from "@/libs/user/userRegister"
import { AddEvent } from "../../../../interface"
import userSignin from "@/libs/user/userSignin"
import { SetCookie } from "../../../components/signinForm"
import AddInput from "../../../components/addInput/AddInput"
import { TextField } from "@mui/material";

import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import EventImg from '@/components/eventComponents/EventImg';

import createEvent from "@/libs/event/createEvent"
import { GetCookie } from "../../../components/signinForm";





const mockFormEvent: AddEvent = {
    song: ["Fire", "BST", "BWL"],  
    event_name: "vidlove 2025",
    day: "2023-09-30",  // วันที่ปัจจุบัน
    time: "10:00",
    image: "https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/6633074721.webp",
    place: "Bangkok Convention Center",
    description: "An annual technology conference covering the latest trends in software development."
};


export default function EventForm() {
    const [formEvent, setFormEvent] = useState<AddEvent>({
        song: [], 
        event_name: "",
        day: "", 
        time: "",
        image: "",
        place: "",
        description: ""
    })
    const [image, setImage] = useState<string>("https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/6633074721.webp");
    const [file, setFile] = useState<File | null>(null);

    const [event, setEvent] = useState<AddEvent | null>(null);
    const cookie = GetCookie("jwt");
    const [songList, setSongList] = useState<string[]>([]);

    const majorList = [
        '-','Civil','Electrical','Mechanical','Automotive','Industrial',
        'Environmental','Metallurgical & Materials','Mining & Petroleum','Chemical','Computer',
        'Nuclear','Georesources','Survey','Robotics & AI','ICE',
        'NANO','ADME','AERO','CHPE','CEDT','SEMI'
    ]

    
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
            setFile(file);
            try {
            // await updateUser(cookie, profile?.role || '', profile?.student_id || null, formData);
            // Once the image is uploaded, update the profile with the new image
            setEvent((prevState) => ({
            ...prevState!,
            image: reader.result as string  , // Update the profile image with the new image URL
            }));
            console.log('User updated image successfully:', file);
            } catch (error) {
                // console.log('cookie', cookie, profile?.role, profile?.student_id);
                console.log('Failed to update user image :', error);
            }
        };
        reader.readAsDataURL(file);
      
    }
    
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
        setFormEvent(prevState => ({
            ...prevState,
            day: newValue ? newValue.format('DD/MM/YYYY') : ''
        }));
    };

    const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
        setFormEvent(prevState => ({
            ...prevState,
            time: newValue ? newValue.format('HH:mm') : ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { image, ...EventWithoutImg } = { ...formEvent, song: songList}; // ใช้ songList ที่อัปเดตจาก AddInput
        console.log("file",file)
        const updatedEvent = { ...EventWithoutImg, image: file };
        
        try {
            formEvent.song = songList;
            // const updatedEvent = mockFormEvent;
            const response = await createEvent(updatedEvent, cookie ); // ใส่ token ถ้ามีระบบ auth
            console.log("Event created:", response);
            alert("Event created successfully!");
            window.location.href = "/eventmanage";
        } catch (error) {
            console.error("Error creating event:", error);
            console.log("updatedEvent",updatedEvent);
            alert("Failed to create event.");
        }
    };

    

    return(
        
        <div className="flex flex-col bg-[#c596c2] min-h-screen">
            <div className="flex md:flex-row flex-col mt-[120px] mx-[10%] space-x-7 md:space-y-0 space-y-3 items-center">
                <div className="flex text-[#7A4E9A] font-extrabold text-[32px]">Add Event</div>
            </div>

            <div className="py-auto px-[7%]">
                {/* <div className=""> */}
                {/* Form Section */}
                <form className="justify-items-center mx-8 rounded-3xl flex flex-col p-10 text-[#184A92] md:relative shadow-2xl my-10 bg-gray-300" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex flex-col basis-1/2 gap-5">
                            <div className="relative"><EventImg imageUrl={event?.image} handleImageUpload={handleImageUpload} /></div>
                            {/* Image preview and label */}

                            {/* Hidden file input */}
                            {/* <input id="fileInput" type="file" accept="image/*" className="hidden" /> */}
                        
                            <div className="basis-1/2 flex flex-row mb-5">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Song List</div>
                                <div className="flex flex-col w-full gap-5">
                                    <AddInput setSongs={setSongList}/>
                                </div>
                                
                            </div>
                        </div>
                    
                        <div className="flex flex-col basis-1/2 gap-5">
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Name</div>
                                <input
                                    type="text"
                                    name="event_name"
                                    // placeholder="Student ID"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formEvent.event_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="basis-1/2 flex flex-row">
                                    <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">
                                    Event Date
                                    </div>
                                    <DatePicker
                                    value={formEvent.day ? dayjs(formEvent.day, "DD/MM/YYYY") : null}
                                    onChange={handleDateChange}
                                    // format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: { 
                                            variant: "outlined", 
                                            fullWidth: true,
                                            inputProps: { "aria-hidden": "false" }
                                        }
                                    }}
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                />
                                </div>
                                <div className="basis-1/2 flex flex-row">
                                    <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">
                                    Event Time
                                    </div>
                                    <TimePicker
                                        value={formEvent.time ? dayjs(formEvent.time, "HH:mm") : null}
                                        onChange={handleTimeChange}
                                        className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    />
                                </div>
                            </LocalizationProvider>
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Place</div>
                                <input
                                    type="text"
                                    name="place"
                                    // placeholder="Student ID"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formEvent.place}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="basis-1/2 flex md:flex-row flex-col">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Description</div>
                                <input
                                    type="text"
                                    name="description"
                                    // placeholder="Student ID"
                                    className="w-full h-[200px] px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formEvent.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                    </div>

                    
                    {/* Add Button */}
                    <div className="flex justify-end mt-5">
                        <button
                        type="submit"
                        className="w-[150px] py-1 bg-[#7A4E9A] text-white rounded-2xl hover:bg-[#c596c2] transition-all"
                        >
                        Add
                        </button>
                    </div>
                </form>
                {/* </div> */}
            </div>
  
        
        </div>

    )

}