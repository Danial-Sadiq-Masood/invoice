"use client"

import { Button } from "@/components/ui/button"
import Form from "@/components/Form"
import Preview from "@/components/Preview"
import { useImmer } from "use-immer";
import { InputState } from "@/enums";
import { getInitFormElementState, validateEmail } from "@/formUtils"
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

function getInitialFormModel() {
  return {
    fromAddress: {
      name: getInitFormElementState(),
      email: getInitFormElementState([validateEmail]),
      country: getInitFormElementState(),
      city: getInitFormElementState(),
      postalCode: getInitFormElementState(),
      streetAddress: getInitFormElementState()
    },
    toAddress: {
      name: getInitFormElementState(),
      email: getInitFormElementState(),
      country: getInitFormElementState(),
      city: getInitFormElementState(),
      postalCode: getInitFormElementState(),
      streetAddress: getInitFormElementState()
    },
    invoiceDate: getInitFormElementState(),
    projectDesc: getInitFormElementState(),
    paymentTerms: getInitFormElementState(),
    items: []
  }
}

function checkFormValid(data) {
  
}

export default function Home() {

  const [formData, updateFormData] = useImmer(getInitialFormModel())
  const [savingForm, updateSavingForm] = useState(false)
  const { toast } = useToast()

  const saveForm = () => {

  }

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
          <Button variant="outline"
            onClick={() => {
              updateFormData(
                draft =>
                  draft = Object.assign(draft, getInitialFormModel())
              )
            }}
          >
            Reset
          </Button>
          <Button className="bg-[#7F56D9]">Save</Button>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <Form updateFormData={updateFormData} formData={formData} />
        <Preview formData={formData} />
      </div>
    </main>
  );
}
