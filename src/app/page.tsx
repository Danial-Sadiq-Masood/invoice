"use client"

import { Button } from "@/components/ui/button"
import Form from "@/components/Form"
import Preview from "@/components/Preview"
import { useState } from "react";
import { useImmer } from "use-immer";

export default function Home() {

  const [formData, updateFormData] = useImmer({
    fromAddress: {
      name: "",
      email: "",
      country: "",
      city: "",
      postalCode: "",
      streetAddress: ""
    },
    toAddress: {
      name: "",
      email: "",
      country: "",
      city: "",
      postalCode: "",
      streetAddress: ""
    },
    invoiceDate : "",
    projectDesc : "",
    paymentTerms : "",
    items : []
  })

  return (
    <main className="px-8 py-6 flex flex-col gap-8">
      {/*Header CComponent*/}
      <div className="flex w-full">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium">
            New Invoice
          </h1>
          <p className="font-normal text-base text-[#667085]">
            Create new invoice for your customers
          </p>
        </div>
        <div className="flex gap-[12px] ml-auto">
          <Button variant="outline">Reset</Button>
          <Button className="bg-[#7F56D9]">Save</Button>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <Form updateFormData={updateFormData} formData={formData}/>
        <Preview formData={formData}/>
      </div>
    </main>
  );
}
