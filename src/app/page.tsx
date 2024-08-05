"use client"

import { Button } from "@/components/ui/button"
import Form from "@/components/Form"
import Preview from "@/components/Preview"
import { useImmer } from "use-immer";
import { InputState } from "@/enums";
import {
  getInitFormElementState,
  validateEmail,
  setFormElementValidationStatus,
  FormModelElemTypes,
  createFormModelElement,
  checkFormQuestionValid
} from "@/formUtils"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"


function getInitialFormModel() {
  return createFormModelElement({
    fromAddress: createFormModelElement({
      name: getInitFormElementState(),
      email: getInitFormElementState([validateEmail]),
      country: getInitFormElementState(),
      city: getInitFormElementState(),
      postalCode: getInitFormElementState(),
      streetAddress: getInitFormElementState()
    }, FormModelElemTypes.FORM_SECTION),
    toAddress: createFormModelElement({
      name: getInitFormElementState(),
      email: getInitFormElementState(),
      country: getInitFormElementState(),
      city: getInitFormElementState(),
      postalCode: getInitFormElementState(),
      streetAddress: getInitFormElementState()
    }, FormModelElemTypes.FORM_SECTION),
    invoiceDate: getInitFormElementState(),
    projectDesc: getInitFormElementState(),
    paymentTerms: getInitFormElementState(),
    items: createFormModelElement({}, FormModelElemTypes.FORM_SECTION)
  }, FormModelElemTypes.FORM_SECTION)
}

function updateFormValidModel(data) {
  if (data.formModelElemType == FormModelElemTypes.QUESTION) {
    setFormElementValidationStatus(data)
  } else if (data.formModelElemType == FormModelElemTypes.FORM_SECTION) {
    Object.keys(data)
      .filter(d => data[d].formModelElemType !== undefined)
      .map(
        d => updateFormValidModel(data[d])
      )
      .every(d => d)
  }
  //console.log(data)
  //throw Error('checkFormValid called with no Form Elem Type')
}

function checkFormValid(data) {
  console.log(data)
  if (data.formModelElemType == FormModelElemTypes.QUESTION) {
    return checkFormQuestionValid(data)
  } else if (data.formModelElemType == FormModelElemTypes.FORM_SECTION) {
    return Object.keys(data)
      .filter(d => data[d].formModelElemType !== undefined)
      .map(
        d => checkFormValid(data[d])
      )
      .every(d => d)
  }
  //console.log(data)
  throw Error('checkFormValid called with no Form Elem Type')
}

window.checkFormValid = checkFormValid

export default function Home() {

  const [formData, updateFormData] = useImmer(getInitialFormModel())
  window.formData = formData;
  const [savingForm, setSavingForm] = useState(false)
  const { toast } = useToast()

  const checkValid = () => {
    updateFormData(draft => updateFormValidModel(draft))

  };

  const saveForm = () => {
    updateFormData(draft => updateFormValidModel(draft))

    const valid = checkFormValid(formData)
    console.log(valid)
    if (valid) {
      setSavingForm(true)
      setTimeout(() => {
        setSavingForm(false)
        toast({
          title: "Form Saved Successfully",
          duration: 3000
        })
      }, 3000)
    } else {
      toast({
        title: "Errors in Form",
        duration: 3000
      })
    }
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
          <Button disabled={savingForm} onClick={saveForm} className="bg-[#7F56D9]">
            {savingForm ?
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              :
              <></>
            }
            Save
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <Form updateFormData={updateFormData} formData={formData} />
        <Preview formData={formData} />
      </div>
    </main>
  );
}
