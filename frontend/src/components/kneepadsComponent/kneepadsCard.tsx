import { Kneepads, User } from "../../../interface";
import KneepadsData from "./kneepadsData";

export default function KneepadsCard(props: {kneepads: Kneepads, cookie: string|undefined, user: User|undefined}) {
    return (
        <div className="flex flex-col shadow-[3px_5px_4px_rgba(0,0,0,0.25)] 
        border-[3px] border-[#5892CA] rounded-[20px] m-[2%] w-[280px] h-[187px] sm:w-[344px] sm:h-[230px] bg-white">
            <div className="flex flex-row justify-start ">
                <div className="flex items-center justify-center inline mx-[15px] mt-[15px] sm:mx-[20px] sm:mt-[30px]
                sm:p-[30px] font-[poppinsExtraBold] text-[25px] sm:text-[30px] text-[#1A5AB8] bg-[#E6F0FF] 
                h-[60px] w-[100px] sm:h-[80px] sm:w-[120px] rounded-[10px] sm:rounded-[20px]">
                    No.{props.kneepads.number}
                </div>
                <p className="inline"> 
                    <span className="block mt-[18px] mb-[5px] sm:mt-[40px] sm:mb-[8px] font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8]">
                        size : {props.kneepads.size}
                    </span>
                    <span className="block font-[poppinsRegular] text-[14px] sm:text-[16px] text-[#1A5AB8]">
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