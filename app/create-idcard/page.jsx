"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { Download, User, MapPin, Phone, Calendar, CreditCard, Briefcase, Home } from "lucide-react"

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    s_o: "",
    nameOrSo: "",
    post: "",
    workingArea: "",
    aadhaarNumber: "",
    contactNumber: "",
    address: "",
    dateOfJoining: "",
    expiryDate: "",
    image: null,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const idCardRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }))
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
      const pdf = new jsPDF("l", "mm", [297, 210])
      pdf.addImage(canvas, "PNG", 0, 0, 297, 210)
      pdf.save(`${formData.name}-id-card.pdf`)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ID Card Generator</h1>
          <p className="text-gray-600">Create professional ID cards for Jaivik Habitat</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-36 items-start">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6" />
                Employee Information
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Fill in the details to generate your ID card
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Designation
                    </Label>
                    <Input
                      id="post"
                      type="text"
                      name="post"
                      required
                      placeholder="Enter your designation"
                      value={formData.post}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nameOrSo" className="text-sm font-semibold text-gray-700">
                      Relation Type
                    </Label>
                    <Input
                      id="nameOrSo"
                      type="text"
                      name="nameOrSo"
                      required
                      placeholder="S/o, D/o, W/o"
                      value={formData.nameOrSo}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_o" className="text-sm font-semibold text-gray-700">
                      Guardian Name
                    </Label>
                    <Input
                      id="s_o"
                      type="text"
                      name="s_o"
                      required
                      placeholder="Enter guardian's name"
                      value={formData.s_o}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="workingArea"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Working Area
                    </Label>
                    <Input
                      id="workingArea"
                      type="text"
                      name="workingArea"
                      required
                      placeholder="Enter working area"
                      value={formData.workingArea}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="aadhaarNumber"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Aadhaar Number
                    </Label>
                    <Input
                      id="aadhaarNumber"
                      type="text"
                      name="aadhaarNumber"
                      required
                      placeholder="Enter Aadhaar number"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    required
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactNumber"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Contact Number
                    </Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      name="contactNumber"
                      required
                      placeholder="Enter contact number"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="dateOfJoining"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Date of Joining
                    </Label>
                    <Input
                      id="dateOfJoining"
                      type="date"
                      name="dateOfJoining"
                      required
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-semibold text-gray-700">
                    Profile Photo
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Generate ID Card
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ID Card Preview - Keeping Original Design */}
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
                                    </span><br />
                                    <span>MARKETING BY </span><br />
                                    <span className="text-xl tracking-tight font-['Dm sans'] text-green-800 font-bold">JIGAR ORGRANIC FARMER PRODUCER COMPANY LIMITED</span>
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
                                    <h1 className="text-2xl">{formData.nameOrSo} : {formData.s_o}</h1>
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
        </div>
      </div>
    </div>
  )
}

export default Page
