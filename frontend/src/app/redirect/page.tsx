"use client"
import SigninForm, { SetCookie } from "@/components/signinForm";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Redirect() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token){
            SetCookie("jwt", token);
            // console.log(token);
        }
        window.location.href = "/";
    }, []);
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-20">
        Redirecting...
      </div>
    );
}