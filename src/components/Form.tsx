
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";

export default function Form({ }) {
	return (
		<div className="border-[1px] border-[#D0D5DD] rounded-3xl p-6 flex flex-col flex-grow-[1]
		flex-shrink-[1] flex-basis-1 gap-8">
			<AddressSection billRolePrefix="Company" billHeading="Bill From" />
			<AddressSection billRolePrefix="Client's" billHeading="Bill To" />
			<div className="grid grid-cols-2 grid-flow-row gap-4">
				<div className="col-start-1 col-span-1 row-start-1">
					<TextInput label="Invoice Date" />
				</div>
				<div className="col-start-2 col-span-1 row-start-1">
					<TextInput label="Payment Terms" />
				</div>
				<div className="col-start-1 col-span-2 row-start-2">
					<TextInput label="Project Description" />
				</div>
			</div>
			<ItemsList />
		</div>
	)
}

function TextInput({
	label,
	type = "text",
	placeHolder = ""
}) {
	return (
		<div className="grid w-full items-center gap-1.5">
			<Label>{label}</Label>
			<Input type={type} placeholder={placeHolder} />
		</div>
	);
}

function AddressSection({
	billRolePrefix,
	billHeading
}) {

	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-semibold text-2xl">
				{billHeading}
			</h1>
			<div className="grid grid-cols-6 grid-flow-row gap-4">
				<div className="col-start-1 col-span-3 row-start-1">
					<TextInput label={`${billRolePrefix} Name`} />
				</div>
				<div className="col-start-4 col-span-3 row-start-1">
					<TextInput label={`${billRolePrefix} Email`} type="email" />
				</div>
				<div className="col-start-1 col-span-2 row-start-2">
					<TextInput label="Country" />
				</div>
				<div className="col-start-3 col-span-2 row-start-2">
					<TextInput label="City" />
				</div>
				<div className="col-start-5 col-span-2 row-start-2">
					<TextInput label="Postal Code" />
				</div>
				<div className="col-start-1 col-span-6 row-start-3">
					<TextInput label="Street Address" />
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