import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/Navbar";

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

export const metadata = {
  title: "JHFHPL IdCard Maker",
  description: "Nothing here",
};

export default function RootLayout({ children }) {
  return (
      // <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#212121] text-white h-screen w-screen`}
      >

        <div className={" "}>
          {/* <Navbar/> */}

             {children}

        </div>
      </body>
    </html>
      
  );
}
