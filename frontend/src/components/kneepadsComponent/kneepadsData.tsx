import { Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { Kneepads } from "../../../interface";
import { useState } from "react";

export default function KneepadsData(props: {kneepads: Kneepads}) {
    
    switch(props.kneepads.status) {
        case "available":
            return (
               <>available</> 
            )
        case "booked":
            return (
                <div className="flex flex-col w-[100%]">
                    <div className="mt-[10px]">
                        <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                            User : 
                        </div>
                        <div className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]">
                            {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="inline ml-[35px] mt-[15px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Book Date :
                            </span>
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                {props.kneepads.booking_date}
                            </span>    
                        </p>
                        <p className="inline mr-[35px] mt-[15px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Return Date :
                            </span>
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                {props.kneepads.return_date}
                            </span>    
                        </p>
                    </div>
                </div>
            )
        case "unavailable":
            return (
                <img src="/images/kneepads/cat.jpg" className="w-[90px] mt-[10px] rounded-[20px] mx-[127px]"/>
            )
        case "disappear":
            return (
                <img src="/images/kneepads/cat2.jpeg" className="w-[90px] mt-[10px] rounded-[20px] mx-[127px]"/>
            )  
        case "pending":
            const [approve, setApprove] = useState(true);
            return (
                <div className="flex flex-col w-[100%]">
                    <div className="mt-[10px]">
                        <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                            Applicant : 
                        </div>
                        <div className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]">
                            {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
                        </div>
                        {approve? <Button variant="contained" color="primary" size="small" sx={
                            [{   
                                bgcolor: "#FFFFFF",
                                color: "#ED79B7",
                                borderColor: "#ED79B7",	
                                borderWidth: "2px",
                                borderStyle: "solid",
                                marginLeft: "14px",
                                fontFamily: "poppinsRegular",
                                fontSize: "12px",
                            },{
                                '&:hover': {
                                    backgroundColor: "#ED79B7",
                                    color: "#FFFFFF",
                                }
                            }]
                        } onClick={()=>{setApprove(false)}}>Approve</Button>
                        : <Button variant="contained" color="primary" size="small" sx={ 
                            [{   
                                bgcolor: "#FFFFFF",
                                color: "#ED79B7",
                                borderColor: "#ED79B7",	
                                borderWidth: "2px",
                                borderStyle: "solid",
                                marginLeft: "14px",
                                fontFamily: "poppinsRegular",
                                fontSize: "12px",
                            },{
                                '&:hover': {
                                    backgroundColor: "#ED79B7",
                                    color: "#FFFFFF",
                                }
                            }]
                        } onClick={()=>{setApprove(true)}}>Data</Button>
                        }
                        
                    </div>
                    {approve?
                    <div className="flex flex-row justify-between">
                        <p className="inline ml-[35px] mt-[15px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Book Date :
                            </span>
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                {props.kneepads.booking_date}
                            </span>    
                        </p>
                        <p className="inline mr-[35px] mt-[15px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Return Date :
                            </span>
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                {props.kneepads.return_date}
                            </span>    
                        </p>
                    </div>
                    :
                    <div className="mt-[20px] flex flex-row justify-center">
                        <div className="inline font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                            Approve or not ?
                        </div>
                        <Button variant="contained" color="primary" size="small" sx={ 
                            [{   
                                bgcolor: "#FFFFFF",
                                color: "#ED79B7",
                                borderColor: "#ED79B7",	
                                borderWidth: "2px",
                                borderStyle: "solid",
                                marginLeft: "14px",
                                fontFamily: "poppinsRegular",
                                fontSize: "12px",
                                display: "inline",
                                borderRadius: "100px",
                            },{
                                '&:hover': {
                                    backgroundColor: "#ED79B7",
                                    color: "#FFFFFF",
                                }
                            }]
                        } onClick={()=>{setApprove(true)}}><ClearIcon></ClearIcon></Button>
                        <Button variant="contained" color="primary" size="small" sx={ 
                            [{   
                                bgcolor: "#FFFFFF",
                                color: "#1A5AB8",
                                borderColor: "#1A5AB8",	
                                borderWidth: "2px",
                                borderStyle: "solid",
                                borderRadius: "100px",
                                marginLeft: "14px",
                                fontFamily: "poppinsRegular",
                                fontSize: "12px",
                                display: "inline",
                            },{
                                '&:hover': {
                                    backgroundColor: "#1A5AB8",
                                    color: "#FFFFFF",
                                }
                            }]
                        } onClick={()=>{setApprove(true)}}><DoneIcon></DoneIcon></Button>
                    </div>}
                </div>
            )              
    }
}