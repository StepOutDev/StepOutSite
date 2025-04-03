"use client"
import { useState, useEffect } from "react"
import userRegister from "@/libs/user/userRegister"
import { FormEvent, User } from "../../../../interface"
import userSignin from "@/libs/user/userSignin"
import { SetCookie } from "../../../components/signinForm"
import AddInput from "../../../components/addInput/AddInput"
import { TextField } from "@mui/material";
import { GetCookie } from "../../../components/signinForm"
import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import getUserMe from "@/libs/user/getUserMe"
import EventImg from '@/components/eventComponents/EventImg';
import updateEvent from "@/libs/event/updateEvent"

export default function EventEdit() {
    const [formEvent, setFormEvent] = useState<FormEvent>({
        song: [], 
        event_name: "",
        day: "", 
        time: "",
        image: "/images/logo/Logo1.png",
        place: "",
        description: ""
    })
    const [image, setImage] = useState<string|null>("https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/6633074721.webp");
    const [event, setEvent] = useState<FormEvent | null>(null);
    const [eventnameparam, setEventnameparam] = useState<string>("");
    
    const [cookie, setCookie] = useState<string | undefined>();
        useEffect(() => {
            function fetchCookie() {
                const ck = GetCookie("jwt");
                setCookie(ck);
            }
            fetchCookie();
    
            const interval = setInterval(() => {
                const currentCookie = GetCookie("jwt");
                if (currentCookie !== cookie) {
                    setCookie(currentCookie);
                }
            }, 500);
            return () => clearInterval(interval);
        }, [cookie])
        const [user, setUser] = useState<User>();
        useEffect(() => {
            const fetchUserData = async () => {
                if(cookie){
                    const user: User = await getUserMe(cookie);
                    setUser(user);
                } 
            };
            if(user === undefined){
                fetchUserData();
            }
        })

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result as string);
            try {
                setEvent((prevState) => ({
                ...prevState!,
                image: reader.result as string,
                }));
                console.log('User updated image successfully:', file);
            } catch (error) {
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
            day: newValue ? newValue.format('MM-DD-YYYY') : ''
        }));
    };

    const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
        setFormEvent(prevState => ({
            ...prevState,
            time: newValue ? newValue.format('HH:mm') : ''
        }));
    };

    const handleSongsChange = (updatedSongs: string[]) => {
        setFormEvent(prev => ({ ...prev, song: updatedSongs }));
        console.log(formEvent.song);
    };

    const handleEditSubmit = async () => {
        const formData = new FormData();

        formData.append("event_name", formEvent.event_name);
        formData.append("day", formEvent.day);
        formData.append("time", formEvent.time);
        formData.append("place", formEvent.place);
        formData.append("description", formEvent.description);

        if (image && image.startsWith("data:image")){
            const blob = await fetch(image).then((res)=>(res.blob()));
            formData.append("image", blob , "event_image.png");
        }else if(formEvent.image){
            formData.append("image", formEvent.image);
        }else{
            console.log("no image");
        }

        formEvent.song.forEach((song, index) => {
            formData.append(`song[${index}]`, song);
        });

        try{
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            await updateEvent(formData, eventnameparam, cookie);
            console.log("Event update successfully");

            window.location.href = "/eventmanage";
        }catch(error){
            console.error("Update Failed: ", error);
        }
    }

    useEffect(() => {
        const eventData = localStorage.getItem("eventData");
        if (eventData) {
            const parsedData = JSON.parse(eventData);
            setFormEvent(parsedData);
            setEventnameparam(parsedData.event_name);
        }
    }, []);

    return(
        <div className="flex flex-col bg-[#c596c2] min-h-screen">
            <div className="flex md:flex-row flex-col mt-[120px] mx-[10%] space-x-7 md:space-y-0 space-y-3 items-center">
                <div className="flex text-[#7A4E9A] font-extrabold text-[32px]">Edit Event</div>
            </div>

            <div className="py-auto px-[7%]">
                {/* Form Section */}
                <form className="justify-items-center mx-8 rounded-3xl flex flex-col p-10 text-[#184A92] md:relative shadow-2xl my-10 bg-gray-300" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex flex-col basis-1/2 gap-5">
                            <div className="relative">
                                <EventImg imageUrl={formEvent?.image} handleImageUpload={handleImageUpload} />
                            </div>
            
                            <div className="basis-1/2 flex flex-row mb-5">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">
                                    Song List
                                </div>
                                <div className="flex flex-col w-full gap-5">
                                    <AddInput initialSongs={formEvent.song} onSongsChange={handleSongsChange} />
                                </div>
                                
                            </div>
                        </div>
                    
                        <div className="flex flex-col basis-1/2 gap-5">
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Name</div>
                                <input
                                    type="text"
                                    name="event_name"
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
                                    value={formEvent.day ? dayjs(formEvent.day, "MM-DD-YYYY") : null}
                                    onChange={handleDateChange}
                                    slotProps={{
                                        textField: { 
                                            variant: "outlined", 
                                            fullWidth: true,
                                            sx: {
                                                border: "2px solid #7A4E9A",
                                                borderRadius: "12px",
                                                backgroundColor: "white",
                                                fontSize: "16px",
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        border: "0",
                                                        borderColor: "#7A4E9A",
                                                    }
                                                }
                                            },
                                            inputProps: { "aria-hidden": "false" }
                                        }
                                    }}
                                    className="w-full border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                />
                            </div>
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">
                                    Event Time
                                </div>
                                <TimePicker
                                    value={formEvent.time ? dayjs(formEvent.time, "HH:mm") : null}
                                    onChange={handleTimeChange}
                                    slotProps={{
                                        textField: { 
                                            variant: "outlined", 
                                            fullWidth: true,
                                            sx: {
                                                border: "2px solid #7A4E9A",
                                                borderRadius: "12px",
                                                backgroundColor: "white",
                                                fontSize: "16px",
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        border: "0",
                                                        borderColor: "#7A4E9A",
                                                    }
                                                }
                                            },
                                            inputProps: { "aria-hidden": "false" }
                                        }
                                    }}
                                    className="w-full border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                />
                            </div>
                            </LocalizationProvider>
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Place</div>
                                <input
                                    type="text"
                                    name="place"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formEvent.place}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="basis-1/2 flex md:flex-row flex-col">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Description</div>
                                <textarea
                                    name="description"
                                    className="w-full h-[200px] px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formEvent.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                    </div>

                    
                    {/* Edit Button */}
                    <div className="flex justify-end mt-5">
                        <button
                            type="button"
                            onClick={handleEditSubmit}
                            className="w-[150px] py-1 bg-[#7A4E9A] text-white rounded-2xl hover:bg-[#c596c2] transition-all"
                        >
                        Edit
                        </button>
                    </div>
                </form>
            </div>
  
        
        </div>

    )

}