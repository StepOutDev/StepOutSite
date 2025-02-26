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

export default function KneepadsData(props: {kneepads: Kneepads}) {
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
            }, [cookie]);
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
    
    switch(props.kneepads.status) {
        case "available":
            const [open, setOpen] = useState(false);
            return (
               <div className="flex flex-col justify-center mt-[10px] w-[100%]">
                    <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
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
                {cookie&&user ?
                <BookedCard kneepads={props.kneepads} cookie={cookie} user={user}></BookedCard>:null
                }
                </>
            )
            // const [openReturn, setOpenReturn] = useState(false);
            // useEffect(() => {
            //     setOpenReturn(false);
            // }, [props.kneepads]); 
            // return (
            //     <div className="flex flex-col w-[100%]">
            //         <div className="mt-[10px]">
            //             <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
            //                 User : 
            //             </div>
            //             <div className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]">
            //                 {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
            //             </div>
            //             {cookie && user?.nick_name===props.kneepads.nick_name && 
            //             user?.year===props.kneepads.year && user?.major===props.kneepads.major ? 
            //                 <div className="inline">
            //                 <Button variant="contained" color="primary" size="small" sx={
            //                     [{   
            //                         bgcolor: "#FFFFFF",
            //                         color: "#ED79B7",
            //                         borderColor: "#ED79B7",	
            //                         borderWidth: "2px",
            //                         borderStyle: "solid",
            //                         marginLeft: "14px",
            //                         fontFamily: "poppinsRegular",
            //                         fontSize: "12px",
            //                     },{
            //                         '&:hover': {
            //                             backgroundColor: "#ED79B7",
            //                             color: "#FFFFFF",
            //                         }
            //                     }]
            //                 } onClick={()=>{setOpenReturn(true)}}>Return</Button>
            //                 { openReturn &&(
            //                 <Modal
            //                     open={openReturn}
            //                     onClose={()=>{setOpenReturn(false)}}
            //                     aria-labelledby="modal-modal-return"
            //                     aria-describedby="modal-modal-description"
            //                     disableScrollLock
            //                     style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            //                 >
            //                 <KneepadsReturnPopup kneepads={props.kneepads} setOpenReturn={setOpenReturn} cookie={cookie}></KneepadsReturnPopup>
            //                 </Modal> )}
            //                 </div>
            //                 : null}
            //         </div>
            //         <div className="flex flex-row justify-between">
            //             <p className="inline ml-[35px] mt-[15px]"> 
            //                 <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
            //                     Book Date :
            //                 </span>
            //                 <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
            //                     {props.kneepads.booking_date}
            //                 </span>    
            //             </p>
            //             <p className="inline mr-[35px] mt-[15px]"> 
            //                 <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
            //                     Return Date :
            //                 </span>
            //                 <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
            //                     {props.kneepads.return_date}
            //                 </span>    
            //             </p>
            //         </div>
            //     </div>
            // )
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
                            } onClick={()=>{setApprove(true); console.log(approve);props.kneepads.status = "booked"; 
                            updateKneepads(props.kneepads,props.kneepads.number,cookie); window.location.reload()}}><DoneIcon></DoneIcon></Button>
                        </div>}
                        </div>
                        :null}
                </div>
            )           
    }
}