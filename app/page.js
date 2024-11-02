import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
    return (
        <div className={"h-full w-full content-center  text-center justify-center flex items-center"}>
            <div className={"pt-52 p-6"}>
                <h1 className={"text-3xl font-[inconsolata] font-bold"}>Now! You Can Create Id Cards In Just few minutes</h1>
                <p className={"text-xl font-[inconsolata] font-bold pt-4 text-gray-500"}>This Website Is Only For <br/> JAIVIK HABITAT FARMER HORTICULTURE PVT.LTD</p>
               <Link href={"/create-idcard"}> <Button className={"mt-4 text-xl p-8"}>Create The IdCard</Button></Link>
            </div>
        </div>
    )
}
export default Page
