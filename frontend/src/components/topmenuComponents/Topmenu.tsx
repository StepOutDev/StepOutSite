"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserMe from "@/libs/user/getUserMe";
import Link from "next/link";

import Cookies from 'js-cookie';

// Define user data interface
interface UserData {
  student_id: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  year: string;
  major: string;
  role: string;
  image: string;
  telephone: string;
  instagram: string;
  line: string;
}

export default function Topmenu() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Status:", status);
      console.log("Session:", session);
      console.log("Session Token:", session?.user?.token);
      const token = Cookies.get('jwt'); // Retrieve the token from the cookie.
      if (!token) {
          console.error("No JWT token found in cookies.");
          return;
      }
      console.log("1")
      if (status === "loading") {
        console.log("2")
        setSessionLoading(true);
      } else if (status === "authenticated" && session?.user?.token) {
        setSessionLoading(false);
        setUserLoading(true);
        console.log("3")

        try {
          const data = await getUserMe(session?.user?.token);
          if (data) {
            setUserData(data);
            console.log("4")
          } else {
            console.error("User data is null or undefined.");
          }
        } catch (err: any) {
          console.error("Error fetching user profile:", err.message, err);
          setError("Failed to load user data.");
        } finally {
          setUserLoading(false);
          console.log("5")
        }
      } else {
        setSessionLoading(false);
        console.log("6")
      }
    };

    fetchUserData();
    console.log("7")
  }, [session, status]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="h-[75px] grid grid-cols-2 backdrop-blur-lg bg-slate-100/70 fixed top-0 left-0 right-0 z-30 border-gray-200 shadow-lg px-5">
      {/* logo */}
      <div className="flex flex-1 items-center h-full ml-[10%]">
        <Link
          href="/"
          className="flex items-center space-x-2 text-black duration-300 ease-in-out hover:text-[#7A4E9A]"
        >
          <img
            src={"/images/logo/Logo1.png"}
            className="filter invert w-[75px] h-[75px] rounded-xl"
            alt="logo Icon"
          />
          <span className="self-center text-[28px] font-poppins font-bold whitespace-nowrap">
            StepOut
          </span>
        </Link>
      </div>

      {/* navigation links */}
      <div className="flex items-center justify-end space-x-6 h-full hidden md:flex">
        <Link
          href="/"
          className="flex items-center justify-center h-full py-2 pr-4 pl-3 text-gray-700 font-bold duration-300 ease-in-out hover:bg-[#7A4E9A] hover:text-white"
        >
          Home
        </Link>
        {session && (
          <Link
            href="/myprofile"
            className="flex items-center justify-center h-full py-2 pr-4 pl-3 text-gray-700 font-bold duration-300 ease-in-out hover:bg-[#7A4E9A] hover:text-white"
          >
            Member
          </Link>
        )}
        <a
          href="/#contact"
          className="flex items-center justify-center h-full py-2 pr-4 pl-3 text-gray-700 font-bold duration-300 ease-in-out hover:bg-[#7A4E9A] hover:text-white"
        >
          Contact
        </a>
        {session?.user.token ? (
          <div className="flex space-x-6">
            {/* Display user info */}
            
            <Link
              href="/api/auth/signout"
              className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
            >
              <div className="flex items-center justify-center py-2 px-4 text-gray-700 font-bold">
                <span>{userData?.nick_name || "Guest"}</span>
                <span className="ml-2">{userData?.year || "-"}</span>
                <span className="ml-2">{userData?.major || "-"}</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-6">
            <Link
              href="/signin"
              className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center h-full py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center h-full py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
