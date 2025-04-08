import { useState, useEffect, use } from "react";
import KneepadsReturnPopup from "./kneepadsReturnPopup";
import { Kneepads, User } from "../../../interface";
import { Button, Modal } from "@mui/material";

export default function BookedCard(props: {kneepads: Kneepads, cookie: string,user: User}) {
    const [openReturn, setOpenReturn] = useState(false);
    useEffect(() => {
        setOpenReturn(false);
    }, [props.kneepads]); 

    let audio = new Audio("/sound/oiia.mp3");

    audio.loop = true;
    useEffect(() => {
        openReturn ? audio.play() : audio.pause();
        return () => {
            audio.pause();
        }; 
      },
    ),[openReturn];

    return (
        <div className="flex flex-col w-[100%]">
            <div className="mt-[10px]">
                <div className="inline ml-[18px] sm:ml-[35px] mr-[10px] font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8]">
                    User : 
                </div>
                <div className="inline font-[poppinsSemiBold] text-[14px] sm:text-[16px] text-[#1A5AB8]">
                    {props.kneepads.nick_name} {props.kneepads.year} {props.kneepads.major}
                </div>
                {props.cookie && props.user?.nick_name===props.kneepads.nick_name && 
                props.user?.year===props.kneepads.year && props.user?.major===props.kneepads.major ? 
                    <div className="inline">
                    <Button variant="contained" color="primary" size="small" sx={
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
                    } onClick={()=>{setOpenReturn(true);}}>Return</Button>
                    { openReturn &&(
                    <Modal
                        open={openReturn}
                        onClose={()=>{setOpenReturn(false)}}
                        aria-labelledby="modal-modal-return"
                        aria-describedby="modal-modal-description"
                        disableScrollLock
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                    >
                    <KneepadsReturnPopup kneepads={props.kneepads} setOpenReturn={setOpenReturn} cookie={props.cookie} audio={audio}></KneepadsReturnPopup>
                    </Modal> )}
                    </div>
                    : null}
            </div>
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
        </div>
    );
}