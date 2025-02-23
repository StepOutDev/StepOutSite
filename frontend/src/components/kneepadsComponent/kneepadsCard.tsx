import { Kneepads } from "../../../interface";

export default function KneepadsCard(props: {kneepads: Kneepads}) {
    return (
        <div className="flex flex-row justify-start border-[3px]
        border-[#5892CA] rounded-[20px] m-[2%] w-[344px] h-[230px] bg-white
        shadow-[3px_5px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-center inline mx-[20px] mt-[30px] p-[30px] font-[poppinsExtraBold] 
            text-[30px] text-[#1A5AB8] bg-[#E6F0FF] h-[80px] w-[120px] rounded-[20px]">
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
    );
}