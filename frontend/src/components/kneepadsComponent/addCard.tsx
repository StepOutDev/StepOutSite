import { ChangeEventHandler, useState } from "react";
import { Kneepads } from "../../../interface";

export default function KneepadsAddPopup(props: {cookie: string, setOpen: Function}) {
    const [kneepads, setKneepads] = useState<Kneepads>();
    const changeNumber= (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;

        // Allow only digits up to 2 characters
        if (/^\d{0,2}$/.test(input)) {
            // Pad with 0 if single digit
            if (input.length === 1) {
            input = input.padStart(2, '0');
            }
            var newKneepads : Kneepads;
            if (kneepads){ 
                newKneepads = kneepads;
                newKneepads.number = input;
            }
            else{
                newKneepads = {
                    number: input,
                    size: "",
                    status: "",
                    booking_date: "",
                    return_date: "",
                    nick_name: "",
                    year: "",
                    major:"",
                };
            }
            setKneepads(newKneepads);
        }
    };

    const changeSize= (e: React.ChangeEvent<HTMLSelectElement>) => {
        var newKneepads : Kneepads;
        if (kneepads){ 
            newKneepads = kneepads;
            newKneepads.size = e.target.value;
        }
        else{
            newKneepads = {
                number: "",
                size: e.target.value,
                status: "",
                booking_date: "",
                return_date: "",
                nick_name: "",
                year: "",
                major:"",
            };
        }
        setKneepads(newKneepads);
    };

    const changeStatus= (e: React.ChangeEvent<HTMLSelectElement>) => {
        var newKneepads : Kneepads;
        if (kneepads){ 
            newKneepads = kneepads;
            newKneepads.status = e.target.value;
        }
        else{
            newKneepads = {
                number: "",
                size: "",
                status: e.target.value,
                booking_date: "",
                return_date: "",
                nick_name: "",
                year: "",
                major:"",
            };
        }
        setKneepads(newKneepads);
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter' && nextRef.current) {
      nextRef.current.focus();
    }
    };
    return (
        <div className="flex flex-col item-center bg-white w-[306px] h-[300px] sm:w-[550px] sm:h-[270px]
        border-[3px] border-[#1A5AB8] rounded-[20px] shadow-[3px_5px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row justify-between font-[poppinsSemiBold] text-[24px] text-[#1A5AB8]">
                <div className="p-[20px] mx-[20px]">
                    Number :
                </div>
                <input type="number" inputMode="numeric" pattern="[0-9]*" maxLength={2} 
                min={0} max={99} placeholder="00" onChange={changeNumber}
                className="no-spinner border-[2px] border-[#1A5AB8] rounded-[40px]
                pl-[20px] py-[5px] w-[50%] sm:w-[50%] h-[40px] sm:h-[50px] mt-[20px] mr-[70px]
                focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
            </div>
            <div className="flex flex-row justify-between font-[poppinsSemiBold] text-[24px] text-[#1A5AB8]">
                <div className="p-[20px] mx-[20px]">
                    Size :
                </div>
               <select onChange={changeSize} className="border-[2px] border-[#1A5AB8] rounded-[40px]
                pl-[20px] py-[5px] w-[50%] sm:w-[50%] h-[40px] sm:h-[50px] mt-[20px] mr-[70px] text-[#1A5AB8]
                font-[poppinsSemiBold] text-[20px] focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="" disabled>Select an option</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
            <div className="flex flex-row justify-between font-[poppinsSemiBold] text-[24px] text-[#1A5AB8]">
                <div className="p-[20px] mx-[20px]">
                    Status :
                </div>
               <select onChange={changeStatus} className="border-[2px] border-[#1A5AB8] rounded-[40px]
                pl-[20px] py-[5px] w-[50%] sm:w-[50%] h-[40px] sm:h-[50px] mt-[20px] mr-[70px] text-[#1A5AB8]
                font-[poppinsSemiBold] text-[20px] focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="" disabled>Select an option</option>
                    <option value="available">available</option>
                    <option value="unavailable">unavailable</option>
                    <option value="disappear">disappear</option>
                </select>
            </div>
            <div>
                <button className="inline font-[poppinsSemiBold] text-[16px] text-[#ED79B7]
                    border-[2px] border-[#ED79B7] rounded-[10px] px-[20px] py-[10px] 
                    w-[35%] sm:w-[35%] ml-[10%] mr-[5%] hover:bg-[#ED79B7] hover:text-white" onClick={() =>{ props.setOpen(false);}}>
                    No
                </button>
                <button className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]
                    border-[2px] border-[#1A5AB8] rounded-[10px] px-[20px] py-[10px] 
                    w-[35%] sm:w-[35%] mr-[10%] ml-[5%] hover:bg-[#1A5AB8] hover:text-white" onClick={() => {props.setOpen(false);
                    }}>
                    Yes
                </button>
            </div>
        </div>
    )
}
