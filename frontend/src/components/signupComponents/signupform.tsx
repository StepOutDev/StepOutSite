"use client"
import { useState } from "react"
import userRegister from "@/libs/user/userRegister"
import { FormRegister } from "../../../interface"
import userSignin from "@/libs/user/userSignin"
import { SetCookie } from "../signinForm"

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
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
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

        <div className="flex bg-white rounded-lg shadow-lg">
  
          {/* Form Section */}
          <form className="flex flex-col flex-1 p-6 space-y-4" onSubmit={handleSubmit}>
            {/* Student ID */}
            <div>
                <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">StudentID</div>
                <input
                    type="text"
                    name="student_id"
                    // placeholder="Student ID"
                    className="w-full px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                    value={formData.student_id}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Firstname</div>
                    <input
                        type="text"
                        name="first_name"
                        // placeholder="Firstname"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Lastname</div>
                    <input
                        type="text"
                        name="last_name"
                        // placeholder="Lastname"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />                  
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Nickname</div>
                    <input
                        type="text"
                        name="nick_name"
                        // placeholder="Nickname"
                        className="px-4 py-2 bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        value={formData.nick_name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
  
            {/* Year and Major */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Year</div>
                    <select
                        name="year"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                        Year
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Major</div>
                    <select
                        id="major"
                        name="major"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        value={formData.major}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Major</option>
                            {majorList.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
  
            {/* Checkbox */}
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="isMember"
                    className="w-4 h-4 text-pink-500 border-gray-300 bg-white rounded focus:ring-pink-300"
                    checked={formData.isMember}
                    onChange={handleChange}
                />
                <span className="text-sm text-gray-700">
                    Are you a StepOut member?{" "}
                    <span className="text-pink-500 text-xl">🦋</span>
                </span>
            </label>
  
            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Password</div>
                    <input
                        type="password"
                        name="password"
                        // placeholder="Password"
                        className="px-4 py-2 border bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <div className="text-black font-poppins text-[14px] sm:text-[14px] lg:text-[16px]">Confirm Password</div>
                    <input
                        type="password"
                        name="confirmPassword"
                        // placeholder="Confirm Password"
                        className={`px-4 py-2 border ${
                            confirmPasswordError ? "border-red-500" : ""
                        } bg-gray-300 text-[14px] sm:text-[14px] lg:text-[16px] text-black rounded-xl`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {confirmPasswordError && (
                        <span className="text-red-500 text-sm mt-1">{confirmPasswordError}</span>
                    )}
                </div>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E799AC] text-white py-2 rounded-xl hover:bg-pink-600"
            >
              Sign up
            </button>
          </form>
        </div>

    )

}