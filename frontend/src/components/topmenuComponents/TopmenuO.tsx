// "use client"
// import { useState, useEffect } from "react"
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { useSession } from "next-auth/react";
// import { User } from "../../../interface";
// import Link from "next/link"
// import getUserMe from "@/libs/user/getUserMe";

// export default function Topmenu () {
//     const { data: session, status } = useSession();
//     console.log(session)
//     // const [user, setUser] = useState<User>(); 
//     const [menuOpen, setMenuOpen] = useState<boolean>(false);

//     useEffect(() => {
//         // Function to close the menu when screen width changes to md or larger
//         const handleResize = () => {
//           if (window.innerWidth >= 768) {
//             setMenuOpen(false);
//           }
//         };
//         // Add event listener
//         window.addEventListener("resize", handleResize);
//         // Clean up the event listener
//         return () => {
//           window.removeEventListener("resize", handleResize);
//         };
//       }, []);

//     //   useEffect(() => {
//     //     const fetchUserData = async () => {
//     //         if(session){
//     //             const userA:User = (await getUserMe(session?.user?.data)).data;
//     //             setUser(userA)
//     //         } 
//     //     };
//     //     fetchUserData();
//     //   }, [session, user])
    
//     return(
//         <nav className="h-[75px] grid grid-cols-2 backdrop-blur-lg  bg-slate-100/70 fixed top-0 left-0 right-0 z-30 border-gray-200 shadow-lg px-5">
//             {/* logo */}
//             <div className="flex flex-1 items-center h-full ml-[10%]">
//                 <Link
//                 href="/"
//                 className="flex items-center space-x-2 text-black duration-300 ease-in-out hover:text-[#7A4E9A]"
//                 >
//                 <img
//                     src={"/images/logo/Logo1.png"}
//                     className="filter invert w-[75px] h-[75px] rounded-xl"
//                     alt="logo Icon"
//                 ></img>
//                 <span className="self-center text-[28px] font-poppins font-bold whitespace-nowrap">
//                     StepOut
//                 </span>
//                 </Link>
//             </div>

//             {/* navigation links */}
//             <div className="flex items-center justify-end space-x-6 h-full hidden md:flex">
//                 <Link
//                     href="/"
//                     className="flex items-center justify-center h-full py-2 pr-4 pl-3 text-gray-700 font-bold duration-300 ease-in-out hover:bg-[#7A4E9A] hover:text-white"
//                     >
//                     Home
//                 </Link>
//                 { session? 
//                     (
//                         <Link
//                         href="/"
//                         className="flex items-center justify-center h-full py-2 pr-4 pl-3 text-gray-700 font-bold duration-300 ease-in-out hover:bg-[#7A4E9A] hover:text-white"
//                         >
//                         Member
//                         </Link>
//                     ): null
//                 }
//                 <a
//                     href="/#contact"
//                     className="flex items-center justify-center h-full py-2 pr-4 pl-3 text-gray-700 font-bold duration-300 ease-in-out hover:bg-[#7A4E9A] hover:text-white"
//                     >
//                     Contact
//                 </a>
//                 {session? 
//                     (
//                         <Link
//                         href="/api/auth/signout"
//                         className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
//                         >
//                             SignOut
//                         </Link>
//                     ):(
//                         <div className="flex space-x-6">
//                             <Link
//                                 href="/signin"
//                                 className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center h-full py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
//                                 >
//                                     Sign in
//                             </Link>
//                             <Link
//                                 href="/signup"
//                                 className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center h-full py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
//                                 >
//                                     Sign up
//                             </Link>
//                         </div>
//                     )
//                 }
//                 {/* {session?(
//                     <Link
//                         href="/myprofile"
//                         className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center h-full py-4 pr-7 pl-7 text-gray-100 font-bold duration-300 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg"
//                         >
                           
//                     </Link>
//                     ):null
//                 } */}
//             </div>

//             {/* hamburger menu */}
//             <div className="flex items-center justify-end h-full md:hidden">
//                 <button
//                     className="text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                 {/* Hamburger icon */}
//                 <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16m-7 6h7"
//                     ></path>
//                 </svg>
//                 </button>
//             </div>
//             {/* dropdown menu */}
//             {menuOpen && (
//                 <div className="absolute top-[75px] right-0 backdrop-blur-lg bg-slate-100/70 shadow-lg w-48 py-2 z-40">
//                 <Link
//                     href="/"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     Home
//                 </Link>
//                 <Link
//                     href="/"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     Member
//                 </Link>
//                 <Link
//                     href="/#contact"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     Contact
//                 </Link>
//                 </div>
//             )}
//         </nav>
//     )
// }