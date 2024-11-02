'use client'

import React, { useState, useRef } from 'react'
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        s_o: '',
        post: '',
        workingArea: '',
        aadhaarNumber: '',
        contactNumber: '',
        address: '',
        dateOfJoining: '',
        expiryDate: '',
        image: null
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const idCardRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prevData => ({ ...prevData, image: file }))
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    const downloadPDF = async () => {
        if (idCardRef.current) {
            const canvas = await toPng(idCardRef.current, { quality: 0.95 })
            const pdf = new jsPDF('l', 'mm', [297, 210]) // A4 landscape
            pdf.addImage(canvas, 'PNG', 0, 0, 297, 210)
            pdf.save('id-card.pdf')
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
            <SignedIn>
                <Card className="w-full max-w-md p-7 mx-auto mb-6 bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Create ID Card</CardTitle>
                        <CardDescription className="text-center text-sm">JAIVIK HABITAT</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <Input type="text" name="name" required placeholder="Enter your name" value={formData.name} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Post</label>
                                <Input type="text" name="post" required placeholder="Enter your post" value={formData.post} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">S/o</label>
                                <Input type="text" name="s_o" required placeholder="Enter father's name" value={formData.s_o} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Working Area</label>
                                <Input type="text" name="workingArea" required placeholder="Enter working area" value={formData.workingArea} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Aadhaar Number</label>
                                <Input type="text" name="aadhaarNumber" required placeholder="Enter Aadhaar number" value={formData.aadhaarNumber} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <Input type="text" name="address" required placeholder="Enter address" value={formData.address} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Contact Number</label>
                                <Input type="tel" name="contactNumber" required placeholder="Enter contact number" value={formData.contactNumber} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date of Joining</label>
                                <Input type="date" name="dateOfJoining" required value={formData.dateOfJoining} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <Input type="date" name="expiryDate" required value={formData.expiryDate} onChange={handleChange}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Upload Image</label>
                                <Input type="file" accept="image/*" required onChange={handleImageChange}/>
                            </div>
                            <div className="text-center mt-4">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {isSubmitted && (
                    <div className="mb-6">
                        <div ref={idCardRef} className="min-h-[600px] bg-green-700 w-[800px] p-[1px] rounded-[10px]">
                            <div className="h-2/6 bg-white flex p-8 items-center justify-between">
                                <Image src="/logoone.png" alt="Logo One" height={100} width={100}/>
                                <h1 className="text-black [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-center font-[inconsolata] text-sm min-w-24 h-24">
                                    A COLLABORATED PANEL OF HABITAT G.I<br/>
                                    FARMER PRODUCER ORANISATION + ICAR-NATIONAL RESEARCH CENTER <br/>
                                    <span className="mt-4 pt-2 text-xl leading-3 font-bold text-green-800">
                                        PRODUCT SALES MARKETING BY <br/>
                                        JAIVIK HABITAT FARMER HORTICULTURE PVT.LTD (UP)
                                    </span>
                                </h1>
                                <Image src="/logo.png" alt="Logo Two" height={100} width={100} className="shadow-md rounded-full"/>
                            </div>
                            <div className="h-[7px] bg-orange-400"/>
                            <div className="p-4 flex text-center items-center justify-between">
                                <div>
                                    <div className="h-12 bg-black rounded w-60 flex items-center text-center justify-center font-bold text-white">
                                        ENTREPRENEUR CODE
                                    </div>
                                    <div className="h-12 bg-white text-2xl w-60 rounded text-black flex items-center text-center justify-center">
                                        {formData.aadhaarNumber}
                                    </div>
                                </div>
                                <div className="pr-[200px] text-2xl text-center text-white">
                                    <h1 className="text-4xl font-bold">{formData.name}</h1>
                                    <h1 className="uppercase text-xl">{formData.post}</h1>
                                </div>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <div className="h-48 mt-4 ml-8 text-black rounded-sm p-[2px] w-48 bg-white">
                                    <Image
                                        src={imagePreview || "/placeholder.svg?height=224&width=192"}
                                        alt="ID Photo"
                                        width={192}
                                        height={224}
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </div>
                                <div className="h-64 rounded-tl-2xl p-12 text-black rounded-bl-2xl bg-white ml-12 w-[600px]">
                                    <h1 className="text-2xl">S/o : {formData.s_o}</h1>
                                    <h1 className="text-2xl">Mobile : {formData.contactNumber}</h1>
                                    <h1 className="text-2xl">Valid Upto : {formData.expiryDate}</h1>
                                    <h1 className="text-2xl">Address : {formData.address}</h1>
                                    <h1 className="text-2xl">Working Area : {formData.workingArea}</h1>
                                </div>
                            </div>
                            <div className="mt-4 w-full text-center text-2xl mb-4 font-light text-white">
                                <h1>JAIVIK HABITAT FARMER HORTICULTUTRE PVT.LTD</h1>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <Button onClick={downloadPDF}>Download ID Card as PDF</Button>
                        </div>
                    </div>
                )}
            </SignedIn>
            <SignedOut>
                <Card className="p-8 text-center">
                    <CardContent>
                        <p className="text-gray-700">Please log in to access the ID card generator.</p>
                    </CardContent>
                </Card>
            </SignedOut>
        </div>
    )
}

export default Page