import { useState } from "react";
import { Kneepads, User } from "../../../interface";
import KneepadsData from "./kneepadsData";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal } from "@mui/material";
import KneepadsDeletePopup from "./deleteCard";
import { cookies } from "next/headers";

export default function KneepadsCard(props: {kneepads: Kneepads, cookie: string|undefined, user: User|undefined}) {
    const [openDelete, setOpenDelete] = useState(false);
    return (
        <div className="relative flex flex-col shadow-[3px_5px_4px_rgba(0,0,0,0.25)] 
        border-[3px] border-[#5892CA] rounded-[20px] m-[2%] w-[280px] h-[187px] sm:w-[344px] sm:h-[230px] bg-white">
            {props.user?.role === "admin" || props.user?.role === "core" ?(
            <div className="z-2 absolute right-[1px] mt-[10px] mr-[10px] h-[1px]
            sm:mt-[25px] sm:mr-[15px]">
                    <Button sx={{ 
                        color: "#1A5AB8",
                        borderRadius: "20px",
                        '&:hover': {
                            backgroundColor: "#5892CA",
                            color: "#FFFFFF",
                        }
                    }} onClick={() => {
                        setOpenDelete(true);
                    }}
                    >
                    <DeleteIcon sx={
                        { 
                            fontSize: "25px" 
                        }
                    }/>
                    </Button>
            </div>) : null}
            {openDelete && props.cookie ?(
                <Modal open={openDelete} onClose={() => {
                    setOpenDelete(false);
                }}
                aria-labelledby="modal-modal-return"
                aria-describedby="modal-modal-description"
                disableScrollLock
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <KneepadsDeletePopup number={props.kneepads.number} cookie={props.cookie} setDelete={setOpenDelete}/>
                </Modal>
            ): null}
            <div className="flex flex-row justify-start ">
                <div className="flex items-center justify-center inline mx-[15px] mt-[15px] sm:mx-[20px] sm:mt-[30px]
                sm:p-[30px] font-[poppinsExtraBold] text-[25px] sm:text-[30px] text-[#1A5AB8] bg-[#E6F0FF] 
                h-[60px] w-[100px] sm:h-[80px] sm:w-[120px] rounded-[10px] sm:rounded-[20px]">
                    No.{props.kneepads.number}
                </div>
                <p className="inline"> 
                    <span className="block mt-[18px] mb-[5px] sm:mt-[40px] sm:mb-[8px] font-[poppinsRegular] 
                    text-[14px] sm:text-[16px] text-[#1A5AB8] z-1">
                        size : {props.kneepads.size}
                    </span>
                    <span className="block font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8] z-1">
                        status : {props.kneepads.status}
                    </span>    
                </p>
            </div>

            <div className="flex flex-row justify-start">
                <KneepadsData kneepads={props.kneepads} cookie={props.cookie} user={props.user} />
            </div>
        </div>
    );
}