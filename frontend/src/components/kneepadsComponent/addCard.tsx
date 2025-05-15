import { ChangeEventHandler, useState } from "react";
import { Kneepads } from "../../../interface";
import createKneepads from "@/libs/kneepads/createKneepads";

export default function KneepadsAddPopup(props: {cookie: string, setOpen: Function}) {
    const [kneepads, setKneepads] = useState<Kneepads>({
        number: "",
        size: "",
        status: "",
        nick_name: "",
        year: "",
        major: "",
        return_date: "",
        booking_date: "",
    });
    interface FormData {
        number: string;
        size: string;
        status: string;
    }

    const [formData, setFormData] = useState<FormData>({
        number: "",
        size: "",
        status: "",
    });
    const handleChange =(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.number.length === 1) {
            formData.number = "0" + formData.number;
            setFormData(formData);
        }
        kneepads.number = formData.number;
        kneepads.size = formData.size;
        kneepads.status = formData.status;
        setKneepads(kneepads);
        createKneepads(kneepads, props.cookie);
        props.setOpen(false);
        window.location.reload();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter' && nextRef.current) {
      nextRef.current.focus();
    }
    };
    return (
        <div className="flex flex-col item-center bg-white w-[306px] h-[270px] sm:w-[550px] sm:h-[330px]
        border-[3px] border-[#1A5AB8] rounded-[20px] shadow-[3px_5px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row justify-between font-[poppinsSemiBold] text-[16px] sm:text-[24px] text-[#1A5AB8]">
                <div className="flex flex-col justify-between p-[20px] sm:p-[20px] mx-[0px] sm:mx-[20px]">
                    <div>
                        Number :
                    </div>
                    <div>
                        Size :
                    </div>
                    <div>
                        Status :
                    </div>
                </div>
                <form id="addForm" className="flex flex-col justify-between w-[60%] sm:w-[60%]" onSubmit={handleSubmit}>
                    <div>
                        <label className="flex flex-col justify-center">
                            <input type="number" inputMode="numeric" pattern="[0-9]*" maxLength={2} 
                            min="0" max="99" value={formData["number"]} placeholder="00" onChange={handleChange} name="number" required
                            className="no-spinner border-[2px] border-[#1A5AB8] rounded-[40px]
                            pl-[15px] sm:pl-[20px] sm:py-[5px] w-[80%] sm:w-[80%] h-[35px] sm:h-[50px]
                            mt-[17px] mb-[5px] sm:mt-[20px] sm:mb-[10px] font-[poppins] text-[#1A5AB8]
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-col justify-center">
                            <select onChange={handleChange} value={formData["size"]} name="size" required className="border-[2px] border-[#1A5AB8] rounded-[40px]
                            pl-[15px] sm:pl-[20px] sm:py-[5px] w-[80%] sm:w-[80%] h-[35px] sm:h-[50px] text-[#1A5AB8] 
                            mt-[19px] mb-[8px] sm:mt-[20px] sm:mb-[10px]
                            font-[poppins] focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="" disabled>Select an option</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-col justify-center">
                            <select onChange={handleChange} value={formData["status"]} name="status" required className="border-[2px] border-[#1A5AB8] rounded-[40px]
                            pl-[15px] sm:pl-[20px] sm:py-[5px] w-[80%] sm:w-[80%] h-[35px] sm:h-[50px] text-[#1A5AB8] 
                            mt-[17px] mb-[13px] sm:mt-[20px] sm:mb-[10px]
                            font-[poppins] focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="" disabled>Select an option</option>
                                <option value="available">available</option>
                                <option value="unavailable">unavailable</option>
                                <option value="disappear">disappear</option>
                            </select>
                        </label>
                    </div>
                </form>
            </div>
            <div className="mt-[15px]">
                <button className="inline font-[poppinsSemiBold] text-[16px] text-[#ED79B7]
                    border-[2px] border-[#ED79B7] rounded-[10px] px-[20px] py-[10px] 
                    w-[35%] sm:w-[35%] ml-[10%] mr-[5%] hover:bg-[#ED79B7] hover:text-white" onClick={() =>{ props.setOpen(false);}}>
                    Cancel
                </button>
                <button type="submit" form="addForm" className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]
                    border-[2px] border-[#1A5AB8] rounded-[10px] px-[20px] py-[10px] 
                    w-[35%] sm:w-[35%] mr-[10%] ml-[5%] hover:bg-[#1A5AB8] hover:text-white">
                    Add
                </button>
            </div>
        </div>
    )
}
