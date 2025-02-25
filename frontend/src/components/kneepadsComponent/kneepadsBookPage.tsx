import { useEffect, useState } from "react";
import { Kneepads, User } from "../../../interface";
import KneepadsData from "./kneepadsData";
import { GetCookie } from "../signinForm";
import getUserMe from "@/libs/user/getUserMe";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";

export default function KneepadsBookPage(props: {kneepads: Kneepads}) {
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
    const [bookingDate, setBookingDate] = useState<Dayjs | null|undefined>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null|undefined>(null);            
    return (
        <div className="flex flex-col shadow-[3px_5px_4px_rgba(0,0,0,0.25)] overflow-hidden 
        border-[3px] border-[#1A5AB8] rounded-[20px] w-[330px] sm:w-[505px] aspect-[1/1.5] sm:aspect-[1.3/1] bg-white">
            <div className="flex flex-row justify-start ">
                <div className="flex items-center justify-center inline mx-[20px] mt-[30px]
                p-[30px] font-[poppinsExtraBold] text-[30px] text-[#1A5AB8] bg-[#E6F0FF] 
                h-[80px] w-[120px] rounded-[20px]">
                    No.{props.kneepads.number}
                </div>
                <p className="inline"> 
                    <span className="block mt-[40px] mb-[8px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                        size : {props.kneepads.size}
                    </span>
                    <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                        status : {props.kneepads.status}
                    </span>    
                </p>
            </div>
            <div className="mt-[20px]">
                        <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                            User : 
                        </div>
                        <div className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]">
                            {user?.nick_name} {user?.year} {user?.major}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row justify-start">
                        <div className="inline ml-[35px] mt-[20px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Book Date :
                            </span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} sx={{mt: 1}}>
                                    <DatePicker label="Pick the date"  value={bookingDate} 
                                    onChange={(newValue) => setBookingDate(newValue)} 
                                    disablePast maxDate={returnDate? dayjs(returnDate).subtract(1, 'day') : undefined}
                                    slotProps={{
                                        popper: {
                                          sx: {
                                            "& .MuiPaper-root": {
                                              color:"#000",  
                                              backgroundColor: "#ffffff", // Light blue background for the calendar
                                              border: "3px solid #1A5AB8", // Border color for the calendar
                                              borderRadius: "10px", // Rounded corners for the popup
                                              padding: "15px", // Padding around the calendar
                                              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Shadow around the calendar
                                            },
                                            "& .MuiTypography-root": {
                                              fontFamily: "PoppinsRegular", // Custom font for the calendar
                                              fontSize: "16px", 
                                            },
                                            "& .MuiPickersDay-root": {
                                              fontFamily: "PoppinsRegular", // Custom font for the day cells
                                              fontSize: "16px", // Font size for the day cells
                                              color: "#1A5AB8", // Text color for the day numbers
                                              "&:hover": {
                                                backgroundColor: "lightblue", // Highlight the day on hover
                                              },
                                            },
                                            "& .MuiPickersDay-daySelected": {
                                              backgroundColor: "#ffffff", // Background color for the selected day
                                              color: "#ffffff", // Text color for the selected day
                                            },
                                          },
                                        },
                                      }}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            color: "#1A5AB8",
                                            fontSize: "16px",
                                            fontFamily: "PoppinsRegular",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderRadius: "20px", 
                                                borderColor: "#1A5AB8", 
                                                borderWidth: 2,
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "lightblue",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#4fc3f7",                                            },
                                        },
                                        "& label": {
                                            color: "#1A5AB8",
                                            fontSize: "16px",
                                            fontFamily: "PoppinsRegular",
                                        },
                                        "& label.Mui-focused": {
                                            color: "#1A5AB8",
                                        },
                                        "& .MuiInputLabel-shrink": {
                                            color: "#1A5AB8", 
                                        },
                                        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                                            color: "#1A5AB8",  
                                        },
                                        width: "20%",
                                    }}/>
                                </DemoContainer>
                            </LocalizationProvider> 
                        </div>
                        <div className="inline mt-[20px] ml-[35px] sm:ml-[0px] md:ml-[0px] lg:ml-[0px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Return Date :
                            </span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} sx={{mt: 1}}>
                                    <DatePicker label="Pick the date"  value={returnDate} 
                                    onChange={(newValue) => setReturnDate(newValue)} 
                                    disablePast minDate={bookingDate? dayjs(bookingDate).add(1, 'day') : undefined}
                                    slotProps={{
                                        popper: {
                                          sx: {
                                            "& .MuiPaper-root": {
                                              color:"#000",  
                                              backgroundColor: "#ffffff", // Light blue background for the calendar
                                              border: "3px solid #1A5AB8", // Border color for the calendar
                                              borderRadius: "10px", // Rounded corners for the popup
                                              padding: "15px", // Padding around the calendar
                                              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Shadow around the calendar
                                            },
                                            "& .MuiTypography-root": {
                                              fontFamily: "PoppinsRegular", // Custom font for the calendar
                                              fontSize: "16px", 
                                            },
                                            "& .MuiPickersDay-root": {
                                              fontFamily: "PoppinsRegular", // Custom font for the day cells
                                              fontSize: "16px", // Font size for the day cells
                                              color: "#1A5AB8", // Text color for the day numbers
                                              "&:hover": {
                                                backgroundColor: "lightblue", // Highlight the day on hover
                                              },
                                            },
                                            "& .MuiPickersDay-daySelected": {
                                              backgroundColor: "#ffffff", // Background color for the selected day
                                              color: "#ffffff", // Text color for the selected day
                                            },
                                          },
                                        },
                                      }}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            color: "#1A5AB8",
                                            fontSize: "16px",
                                            fontFamily: "PoppinsRegular",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderRadius: "20px", 
                                                borderColor: "#1A5AB8", 
                                                borderWidth: 2,
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "lightblue",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#4fc3f7",                                            },
                                        },
                                        "& label": {
                                            color: "#1A5AB8",
                                            fontSize: "16px",
                                            fontFamily: "PoppinsRegular",
                                        },
                                        "& label.Mui-focused": {
                                            color: "#1A5AB8",
                                        },
                                        "& .MuiInputLabel-shrink": {
                                            color: "#1A5AB8", 
                                        },
                                        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                                            color: "#1A5AB8",  
                                        },
                                        width: "20%",
                                    }}/>
                                </DemoContainer>
                            </LocalizationProvider>   
                        </div>
                    </div>
                <div>
                    <button className={`inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]
                    mt-[20px] border-[2px] border-[#1A5AB8] rounded-[10px] px-[20px] py-[10px] 
                    w-[250px] sm:w-[433px] ml-[35px] h-[55px] ${(!bookingDate || !returnDate) ? 
                    'border-gray-400 text-gray-400' : 'hover:bg-[#1A5AB8] hover:text-white'}`} 
                    disabled={!bookingDate || !returnDate}>Book</button>
                </div>    
        </div>
    );
}