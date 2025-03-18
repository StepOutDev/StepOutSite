import { Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Kneepads } from "../../../interface";
import { useEffect, useState } from "react";
import { GetCookie } from "../signinForm";
import updateKneepads from "@/libs/kneepads/updateKneepads";
import getUserMe from "@/libs/user/getUserMe";
import { User } from "../../../interface";
import KneepadsBookPopup from "./kneepadsBookPopup";
import KneepadsReturnPopup from "./kneepadsReturnPopup";
import BookedCard from "./bookedCard";

export default function KneepadsData(props: {kneepads: Kneepads, cookie: string|undefined, user: User|undefined}) {
    // const [cookie, setCookie] = useState<string | undefined>();
    //         useEffect(() => {
    //             function fetchCookie() {
    //                 const ck = GetCookie("jwt");
    //                 setCookie(ck);
    //             }
    //             fetchCookie();
        
    //             const interval = setInterval(() => {
    //                 const currentCookie = GetCookie("jwt");
    //                 if (currentCookie !== cookie) {
    //                     setCookie(currentCookie);
    //                 }
    //             }, 500);
    //             return () => clearInterval(interval);
    //         }, [cookie]);
    //     const [user, setUser] = useState<User>();
    //     useEffect(() => {
    //         const fetchUserData = async () => {
    //             if(cookie){
    //                 const user: User = await getUserMe(cookie);
    //                 setUser(user);
    //             } 
    //         };
    //         if(user === undefined){
    //             fetchUserData();
    //         }
    //     })
    
    switch(props.kneepads.status) {
        case "available":
            const [open, setOpen] = useState(false);
            return (
               <div className="flex flex-col justify-center mt-[10px] w-[100%]">
                    <div className="inline flex flex-row justify-center items-center
                    font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8]">
                        Do you want to book kneepads?
                    </div>
                    <Button variant="contained" color="primary" size="small" sx={ 
                        [{   
                            bgcolor: "#FFFFFF",
                            color: "#1A5AB8",
                            borderColor: "#1A5AB8",	
                            borderWidth: "2px",
                            borderStyle: "solid",
                            borderRadius: "10px",
                            fontFamily: "poppinsSemiBold",
                            fontSize: "12px",
                            mx: "30px",
                            mt: "20px",
                            height: "40px",
                        },{
                            '&:hover': {
                                backgroundColor: "#1A5AB8",
                                color: "#FFFFFF",
                            }
                        }]
                    } onClick={()=>{setOpen(true)}}>Book</Button>
                    <Modal
                        open={open}
                        onClose={()=>{setOpen(false)}}
                        aria-labelledby="modal-modal-book"
                        aria-describedby="modal-modal-description"
                        disableScrollLock
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                    >
                       <KneepadsBookPopup kneepads={props.kneepads} setOpen={setOpen}></KneepadsBookPopup>
                    </Modal>
               </div> 
            )
        case "booked":
            return (
                <>
                {props.cookie&&props.user ?
                <BookedCard kneepads={props.kneepads} cookie={props.cookie} user={props.user}></BookedCard>:null
                }
                </>
            )
        case "unavailable":
            return (
                <div className="flex flex-row justify-center w-[100%]">
                    <img src="/images/kneepads/cat.jpg" className="w-[90px] mt-[10px] rounded-[20px]"/>
                </div>
            )
        case "disappear":
            return (
                <div className="flex flex-row justify-center w-[100%]">
                    <img src="/images/kneepads/cat2.jpeg" className="w-[90px] mt-[10px] rounded-[20px]"/>
                </div>
            )  
        case "pending":
            const [approve, setApprove] = useState(true);
            return (
                <div className="flex flex-col w-[100%]">
                    <div className="mt-[10px] flex flex-row justify-start ml-[20px] sm:ml-[0px]">
                        <div className="inline mt-[5px] sm:mt-[4px] sm:ml-[35px] mr-[10px] font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8]">
                            Applicant : 
                        </div>  
                        <div className="inline mt-[5px] sm:mt-[4px] font-[poppinsSemiBold] text-[14px] sm:text-[16px] text-[#1A5AB8]">
                            {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
                        </div>
                        {props.user?.role === "admin"||props.user?.role === "core"?
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
                                    fontSize: { xs: "10px", sm: "12px" },
                                    width: { xs: "60px", sm: "80px" },
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
                                    fontSize: { xs: "10px", sm: "12px" },
                                    width: { xs: "60px", sm: "80px" },
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
                    {props.user?.role === "admin"||props.user?.role === "core"?
                        <div>
                        {approve? 
                        <div className="flex flex-row justify-between">
                            <p className="inline ml-[18px] mt-[10px] sm:ml-[35px] sm:mt-[15px]"> 
                                <span className="block font-[poppinsRegular]  text-[14px] sm:text-[16px] text-[#1A5AB8]">
                                    Book Date :
                                </span>
                                <span className="block font-[poppinsRegular]  text-[14px] sm:text-[16px] text-[#1A5AB8]">
                                    {props.kneepads.booking_date}
                                </span>    
                            </p>
                            <p className="inline mr-[18px] mt-[10px] sm:mr-[35px] sm:mt-[15px]"> 
                                <span className="block font-[poppinsRegular]  text-[14px] sm:text-[16px] text-[#1A5AB8]">
                                    Return Date :
                                </span>
                                <span className="block font-[poppinsRegular]  text-[14px] sm:text-[16px] text-[#1A5AB8]">
                                    {props.kneepads.return_date}
                                </span>    
                            </p>
                        </div>
                        :
                        <div className="mt-[20px] flex flex-row justify-center">
                            <div className="inline mt-[5px] sm:mt-[4px] font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8]">
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
                                    paddingX: "2px", 
                                    minWidth: {xs:"40px", sm:"60px"},
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
                                    paddingX: "2px", 
                                    minWidth: {xs:"40px", sm:"60px"},
                                },{
                                    '&:hover': {
                                        backgroundColor: "#1A5AB8",
                                        color: "#FFFFFF",
                                    }
                                }]
                            } onClick={()=>{setApprove(true); console.log(approve);props.kneepads.status = "booked"; 
                            updateKneepads(props.kneepads,props.kneepads.number,props.cookie); window.location.reload()}}><DoneIcon></DoneIcon></Button>
                        </div>}
                        </div>
                        :<div className="mt-[20px] ml-[35px] mr-[10px] font-[poppinsSemiBold] 
                        text-[14px] sm:text-[16px] text-[#E799AC]">Waiting for admin to approve.</div>}
                </div>
            )           
    }
}