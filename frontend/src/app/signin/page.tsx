"use client"
import SigninForm from "@/components/signinForm";
import { useState } from "react";
import userSignin from "@/libs/user/userSignin";

export default function Signin() {

    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-20">
        {/* Header */}
        <div className="justify-center sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="flex text-[#E799AC] text-[50px] sm:text-[70px] lg:text-[100px] font-extrabold justify-center text-center sm:text-left">
            Sign in
          </div>
          <div className="flex justify-center w-[95%]">
            <SigninForm
            ></SigninForm>
          </div>
        </div>
        
      </div>
    );
  }