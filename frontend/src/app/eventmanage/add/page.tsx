"use client"
import { useState } from "react"
import userRegister from "@/libs/user/userRegister"
import { FormRegister } from "../../../../interface"
import userSignin from "@/libs/user/userSignin"
import { SetCookie } from "../../../components/signinForm"

export default function SignupForm() {
    const [formData, setFormData] = useState<FormRegister>({
        student_id: "",
        first_name: "",
        last_name: "",
        nick_name: "",
        year: "",
        major: "",
        isMember: false,
        password: "",
        confirmPassword: ""
    })

    const majorList = [
        '-','Civil','Electrical','Mechanical','Automotive','Industrial',
        'Environmental','Metallurgical & Materials','Mining & Petroleum','Chemical','Computer',
        'Nuclear','Georesources','Survey','Robotics & AI','ICE',
        'NANO','ADME','AERO','CHPE','CEDT','SEMI'
    ]

    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checked" ? (e.target as HTMLInputElement).checked : value
        }));

        if(name === "confirmPassword") {
            setConfirmPasswordError("");
        } 
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            setConfirmPasswordError("Password do not match");
            setFormData((prev)=>({
                ...prev,
                confirmPassword: ""
            }));
            return;
        }

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            const typedKey = key as keyof FormRegister;
            formDataObj.append(typedKey, String(formData[typedKey]));
        });

        console.log("Submitting:", Object.fromEntries(formDataObj.entries()));

        try{

            const signupResponse = await userRegister(formDataObj);
            console.log("User registered successfully:", signupResponse)

            if(!signupResponse){
                throw new Error("Signup failed");
            }

            const signinResponse = await userSignin(formData.student_id, formData.password);

            if(signinResponse?.error){
                console.error("Auto login failed:", signinResponse.error);
                return;
            }

            SetCookie("jwt", signinResponse?.data);

            window.location.href = "/";

        }catch(error){
            console.error("Error registered user:", error)

        }
    }

    return(
        
        <div className="flex flex-col bg-[#c596c2] min-h-screen">
            <div className="flex md:flex-row flex-col mt-[120px] mx-[10%] space-x-7 md:space-y-0 space-y-3 items-center">
                <div className="flex text-[#7A4E9A] font-extrabold text-[32px]">Add Event</div>
            </div>

            <div className="py-auto px-[7%]">
                {/* <div className=""> */}
                {/* Form Section */}
                <form className="justify-items-center mx-8 rounded-3xl flex flex-col p-10 text-[#184A92] md:relative shadow-2xl my-10 bg-gray-300" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex flex-col basis-1/2 gap-5">
                            {/* File Input */}
                            {/* <input
                                type="file"
                                name="student_id"
                                // placeholder="Student ID"
                                className="w-full h-[250px] px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-3xl"
                                value={formData.student_id}
                                onChange={handleChange}
                                required
                            /> */}
                            {/* Image preview and label */}
                            <label htmlFor="fileInput" className="cursor-pointer block relative">
                                <img
                                    src="https://stepoutsite.s3.ap-southeast-1.amazonaws.com/image/FreshyGame2024.webp"
                                    alt="event"
                                    className="w-full h-[250px] px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-3xl"
                                />
                                {/* Button for selecting file */}
                                <button
                                    type="button"
                                    className="absolute inset-0 m-auto w-fit h-fit py-2 px-4 bg-white text-[#7A4E9A] rounded-xl hover:bg-[#c596c2] border-2 border-[#7A4E9A]"
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    Select Photo
                                </button>
                            </label>

                            {/* Hidden file input */}
                            <input id="fileInput" type="file" accept="image/*" className="hidden" />
                            
                            {/* Select Photo Button inside the box */}
                            {/* <button
                                type="button"
                                className="absolute right-0 top-0 py-2 px-4 bg-[#E799AC] text-white rounded-2xl hover:bg-pink-600"
                                onClick={() => document.querySelector('input[type="file"]')?.click()}
                            >
                                Select Photo
                            </button> */}

                            <div className="basis-1/2 flex flex-row mb-5">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Song List</div>
                                <div className="flex flex-col w-full gap-5">
                                    <input
                                        type="text"
                                        name="student_id"
                                        // placeholder="Student ID"
                                        className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="student_id"
                                        // placeholder="Student ID"
                                        className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col basis-1/2 gap-5">
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Name</div>
                                <input
                                    type="text"
                                    name="event_name"
                                    // placeholder="Student ID"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formData.student_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Date</div>
                                <input
                                    type="date"
                                    name="event_date"
                                    // placeholder="Student ID"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formData.student_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Time</div>
                                <input
                                    type="text"
                                    name="event_time"
                                    // placeholder="Student ID"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formData.student_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="basis-1/2 flex flex-row">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Event Place</div>
                                <input
                                    type="text"
                                    name="event_place"
                                    // placeholder="Student ID"
                                    className="w-full px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formData.student_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="basis-1/2 flex md:flex-row flex-col">
                                <div className="basis-1/3 text-[#7A4E9A] font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Description</div>
                                <input
                                    type="text"
                                    name="student_id"
                                    // placeholder="Student ID"
                                    className="w-full h-[200px] px-4 py-2 border-2 border-[#7A4E9A] bg-white text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-2xl"
                                    value={formData.student_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                    </div>

                    
                    {/* Submit Button */}
                    <div className="flex justify-end mt-5">
                        <button
                        type="submit"
                        className="w-[150px] py-1 bg-[#7A4E9A] text-white rounded-2xl hover:bg-[#c596c2]"
                        >
                        Add
                        </button>
                    </div>
                </form>
                {/* </div> */}
            </div>
  
        
        </div>

    )

}