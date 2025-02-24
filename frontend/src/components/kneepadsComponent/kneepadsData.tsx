import { Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { Kneepads } from "../../../interface";
import { useEffect, useState } from "react";
import { GetCookie } from "../signinForm";
import updateKneepads from "@/libs/kneepads/updateKneepads";
import getUserMe from "@/libs/user/getUserMe";
import { User } from "../../../interface";

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
            return (
                <div className="flex flex-col w-[100%]">
                    <div className="mt-[10px]">
                        <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                            Applicant : 
                        </div>
                        <div className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]">
                            {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
                        </div>
                        {user?.role === "admin"||user?.role === "core"?
                        <div className="inline">
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
                        :null}
                    </div>
                    {user?.role === "admin"||user?.role === "core"?
                        <div>
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
                            } onClick={()=>{props.kneepads.status = "booked"; setApprove(true); 
                            updateKneepads(props.kneepads,props.kneepads.number,cookie); }}><DoneIcon></DoneIcon></Button>
                        </div>}
                        </div>
                        :null}
                </div>
            )              
    }
}