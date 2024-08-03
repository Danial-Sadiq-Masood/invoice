import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";

function getFormUpdater(immerUpdater, formKeys) {
	return (e) => {
		immerUpdater(formData => {
			//get reference to the nested object that holds the data 
			let keyObject = formKeys.slice(0, -1)
				.reduce((acc, d) => {
					return acc[d]
				}, formData)
			let finalKey = formKeys[formKeys.length - 1]
			keyObject[finalKey] = e.target.value
		})
	}
}

function getAddressSectionUpdaters(updateFormData,prefix){
	return [
		"name",
		"email",
		"country",
		"city",
		"postalCode",
		"streetAddress"
	]
	.reduce((acc,d)=>{
		acc[d] = getFormUpdater(updateFormData, [...prefix, d])
		return acc
	}, {})
}

export default function Form({ formData, updateFormData }) {

	const fromAddressUpdaters = getAddressSectionUpdaters(updateFormData,["fromAddress"]);
	const toAddressUpdaters = getAddressSectionUpdaters(updateFormData,["toAddress"]);

	return (
		<div className="border-[1px] border-[#D0D5DD] rounded-3xl p-6 flex flex-col flex-grow-[1]
		flex-shrink-[1] basis-[0] gap-8">
			<AddressSection billRolePrefix="Company" billHeading="Bill From" 
				addressData={formData.fromAddress} 
				addressUpdaters={fromAddressUpdaters} />
			<AddressSection billRolePrefix="Client's" billHeading="Bill To"
				addressData={formData.toAddress} 
				addressUpdaters={toAddressUpdaters}/>
			<div className="grid grid-cols-2 grid-flow-row gap-4">
				<div className="col-start-1 col-span-1 row-start-1">
					<TextInput label="Invoice Date" 
					updateFunction={getFormUpdater(updateFormData, ['invoiceDate'])}
					val={formData.invoiceDate}/>
				</div>
				<div className="col-start-2 col-span-1 row-start-1">
					<TextInput label="Payment Terms" 
					updateFunction={getFormUpdater(updateFormData, ['paymentTerms'])}
					val={formData.paymentTerms}/>
				</div>
				<div className="col-start-1 col-span-2 row-start-2">
					<TextInput
						label="Project Description"
						updateFunction={getFormUpdater(updateFormData, ['projectDesc'])}
						val={formData.projectDesc}
					/>
				</div>
			</div>
			<ItemsList items={[]} />
		</div>
	)
}

function TextInput({
	label,
	type = "text",
	placeHolder = "",
	val = "",
	updateFunction = (e) => { }
}) {
	return (
		<div className="grid w-full items-center gap-1.5">
			<Label>{label}</Label>
			<Input type={type} placeholder={placeHolder} onChange={updateFunction} value={val} className="shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]"/>
		</div>
	);
}

function AddressSection({
	billRolePrefix,
	billHeading,
	addressUpdaters,
	addressData
	
}) {

	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-semibold text-2xl">
				{billHeading}
			</h1>
			<div className="grid grid-cols-6 grid-flow-row gap-4">
				<div className="col-start-1 col-span-3 row-start-1">
					<TextInput
						label={`${billRolePrefix} Name`}
						updateFunction={addressUpdaters.name}
						val={addressData.name}
					/>
				</div>
				<div className="col-start-4 col-span-3 row-start-1">
					<TextInput label={`${billRolePrefix} Email`} type="email"
						updateFunction={addressUpdaters.email}
						val={addressData.email}
					/>
				</div>
				<div className="col-start-1 col-span-2 row-start-2">
					<TextInput label="Country"
						updateFunction={addressUpdaters.country}
						val={addressData.country} />
				</div>
				<div className="col-start-3 col-span-2 row-start-2">
					<TextInput label="City"
						updateFunction={addressUpdaters.city}
						val={addressData.city} />
				</div>
				<div className="col-start-5 col-span-2 row-start-2">
					<TextInput label="Postal Code"
						updateFunction={addressUpdaters.postalCode}
						val={addressData.postalCode} />
				</div>
				<div className="col-start-1 col-span-6 row-start-3">
					<TextInput label="Street Address"
						updateFunction={addressUpdaters.streetAddress}
						val={addressData.streetAddress} />
				</div>
			</div>
		</div>
	)
}

function ItemsList({ items }) {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">
				Items List
			</h1>
			<div className="flex flex-col gap-4">
				{/*row*/}
				<div className="flex gap-4">
					<div className="basis-0 flex-shrink-[1] flex-grow-[2]">
						<TextInput label="Item Name" />
					</div>
					<div className="basis-0 flex-shrink-[1] flex-grow-[1]">
						<TextInput label="Qty." />
					</div>
					<div className="basis-0 flex-shrink-[1] flex-grow-[1]">
						<TextInput label="Price" />
					</div>
					<div className="basis-0 flex-shrink-[1] flex-grow-[1]">
						<TextInput label="Total" />
					</div>
				</div>
				<div>
					<Button className="bg-[#7F56D9] w-full">Add New Item</Button>
				</div>
			</div>
		</div>
	)
}