"use client"
import SigninForm, { SetCookie } from "@/components/signinForm";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Error() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const message = params.get('message');
        
        if (message) {
            setMessage(message);
        }

    }, []);

    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-20">
        <div className="flex flex-row items-center justify-center bg-white shadow-md rounded-[20px] sm:px-8 sm:pt-6 sm:pb-8
        w-[300px] sm:w-[700px] h-[160px] sm:h-[300px]">
            <div className="flex items-center justify-center m-4">
                <img src="/images/error/error.jpg" alt="Error" className="w-[150px] sm:w-[200px] rounded-[10px] sm:rounded-[20px]" />
            </div>
            <div className="flex flex-col items-center justify-center sm:ml-4">
                <div className="text-red-500 text-[15px] sm:text-[30px] font-[poppinsSemiBold]">
                    {message ? (
                    <div>{message}</div>
                    ) : (
                    <div>An error occurred</div>
                    )}
                </div>
                <div className="mt-4 flex justify-start w-full">
                    <button className="font-[poppinsSemiBold] bg-white hover:bg-[#E799AC] text-[#E799AC] hover:text-white 
                    border-2 border-[#E799AC] font-bold py-[5px] sm:py-[10px] px-[15px] rounded-[15px] sm:mt-4 text-[14px] sm:text-[20px]">
                        <a href="/">Go to Home</a>
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
}