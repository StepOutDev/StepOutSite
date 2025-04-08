import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Topmenu from "@/components/topmenuComponents/Topmenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "@/providers/NextAuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// const poppins = localFont({
//   src: "./fonts/Poppins-Regular.ttf",
//   variable: "--font-poppins",
// });

const poppinsBlack = localFont({
  src: "./fonts/Poppins-1/Poppins-Black.ttf",
  variable: "--font-poppins-black",
})

const poppinsExtraBold = localFont({
  src: "./fonts/Poppins-1/Poppins-ExtraBold.ttf",
  variable: "--font-poppins-extrabold",
})

const poppinsLight = localFont({
  src: "./fonts/Poppins-1/Poppins-Light.ttf",
  variable: "--font-poppins-light",
})

const poppinsRegular = localFont({
  src: "./fonts/Poppins-1/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
})

const poppinsSemiBold = localFont({
  src: "./fonts/Poppins-1/Poppins-SemiBold.ttf",
  variable: "--font-poppins-semibold",
})

export const metadata: Metadata = {
  title: "StepOut",
  description: "CU Intania Dance Club",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const nextAuthSession = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo/Logo1.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextAuthProvider session={ nextAuthSession }>
          <Topmenu></Topmenu>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
