import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoMenu } from "react-icons/io5";
// import {UserButton} from "@clerk/nextjs";
import Link from "next/link";


const Navbar = () => {
    return (
       <>
           <Sheet>
             <div className={"flex items-center justify-between p-5"}>
                 <SheetTrigger><IoMenu  className={"text-3xl"}/></SheetTrigger>
                 <button >
                    {/* <UserButton className={"h-24"}/> */}
                    </button>
             </div>
               <SheetContent className={"bg-[#212121] text-white"} side={"left"}>
                   <SheetHeader className={"text-white"}>
                       <SheetTitle className={"text-white"}>Navigation Menu</SheetTitle>
                       <SheetDescription>
                           <Link href={"/"}> <h1 className={"text-xl mt-4 p-5 bg-white rounded-md text-black"}>Home</h1></Link>
                           <Link href={"/create-idcard"}> <h1 className={"text-xl mt-4 p-5 bg-white rounded-md text-black"}>Create-IdCard</h1></Link>
                           <Link href={"/"}> <h1 className={"text-xl mt-4 p-5 bg-white rounded-md text-black"}>Show-All-Card</h1></Link>
                       </SheetDescription>
                   </SheetHeader>
               </SheetContent>
           </Sheet>

       </>
    )
}
export default Navbar
