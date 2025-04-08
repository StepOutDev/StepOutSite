"use client"
import { useState } from "react";
import userSignin from "@/libs/user/userSignin";
import { signOut } from "@/components/topmenuComponents/Topmenu";
import { useRouter } from "next/navigation";

export default function Signout() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center py-20">
            {/* Header */}
            <div className="flex flex-col justify-center gap-5 sm:gap-10">
                <div className="flex text-[#E799AC] text-[50px] sm:text-[70px] lg:text-[100px] font-extrabold justify-center text-center sm:text-left">
                    Sign Out
                </div>
                <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg gap-6">
                    <div className="font-bold text-[#E799AC]">
                        Are you sure you want to sign out?
                    </div>
                    <div className="flex flex-row justify-center gap-6">
                        <button
                            type="submit"
                            onClick={signOut}
                            className="flex-1 bg-[#E799AC] border-2 border-[#E799AC] text-white py-2 px-6 rounded-lg hover:bg-pink-600 hover:border-pink-600"
                        >
                        OK
                        </button>
                        <button
                            type="submit"
                            onClick={() => router.back()}
                            className="flex-1 bg-white border-2 border-[#E799AC] text-[#E799AC] py-2 px-6 rounded-lg hover:bg-pink-600 hover:text-white hover:border-pink-600"
                        >
                        Cancel
                        </button>
                    </div>
                </div>             
            </div>       
        </div>
    );
  }