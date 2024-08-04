import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Trash2 } from "lucide-react"
import { InputState } from "@/enums";

import { createFormValidationStatus, getInitFormElementState } from "@/formUtils";

function getFormUpdater(immerUpdater, formKeys) {
	return (val) => {
		immerUpdater(formData => {
			//get reference to the nested object that holds the data 
			let keyObject = formKeys.slice(0, -1)
				.reduce((acc, d) => {
					return acc[d]
				}, formData)
			let finalKey = formKeys[formKeys.length - 1]
			//form model element
			let formModelEl = keyObject[finalKey]
			formModelEl.val = val
			setFormElementValidationStatus(formModelEl)
		})
	}
}

function setFormElementValidationStatus(formModelEl) {
	const validationStatus = formModelEl.validationFunctions
		.map((d) => {
			return d(formModelEl.val)
		})

	const invalidStatus = validationStatus.find(d => d.status === InputState.INVALID)

	if (invalidStatus) {
		formModelEl.valid = invalidStatus
	} else {
		formModelEl.valid = createFormValidationStatus(InputState.VALID)
	}
}

function getTextInputUpdater(immerUpdater, formKeys) {
	const updaterFunction = getFormUpdater(immerUpdater, formKeys)
	return (e) => { updaterFunction(e.target.value) }
}

enum InputType {
	TEXT,
	SELECT
}

function getAddressSectionUpdaters(updateFormData, prefix) {
	return [
		{ key: "name", type: InputType.TEXT },
		{ key: "email", type: InputType.TEXT },
		{ key: "country", type: InputType.SELECT },
		{ key: "city", type: InputType.TEXT },
		{ key: "postalCode", type: InputType.TEXT },
		{ key: "streetAddress", type: InputType.TEXT }
	]
		.reduce((acc, d) => {
			let handler;
			if (d.type === InputType.TEXT) {
				handler = getTextInputUpdater(
					updateFormData,
					[...prefix, d.key])
			} else if (d.type === InputType.SELECT) {
				handler = getFormUpdater(updateFormData, [...prefix, d.key])
			}
			acc[d.key] = handler
			return acc
		}, {})
}

function addRow(updateFormData) {
	updateFormData(
		draft => {
			draft.items.push({
				key: crypto.randomUUID(),
				name: getInitFormElementState(),
				qty: getInitFormElementState(),
				price: getInitFormElementState(),
			})
		}
	)
}

function removeRow(updateFormData, key) {
	updateFormData(
		draft => {
			console.log(key)
			draft.items = draft.items.filter(d => d.key != key)
		}
	)
}

function getRowTextHandler(updateFormData, rowKey, dataKey) {
	return (val) => {
		updateFormData(
			draft => {
				const index = draft.items.findIndex((d) => d.key === rowKey);
				draft.items[index][dataKey].val = val
				setFormElementValidationStatus(draft.items[index][dataKey])
			}
		)
	}
}

export default function Form({ formData, updateFormData }) {

	const fromAddressUpdaters = getAddressSectionUpdaters(updateFormData, ["fromAddress"]);
	const toAddressUpdaters = getAddressSectionUpdaters(updateFormData, ["toAddress"]);

	return (
		<div className="border-[1px] border-[#D0D5DD] rounded-3xl p-6 flex flex-col flex-grow-[1]
		flex-shrink-[1] basis-[0] gap-8">
			<AddressSection billRolePrefix="Company" billHeading="Bill From"
				addressData={formData.fromAddress}
				addressUpdaters={fromAddressUpdaters} />
			<AddressSection billRolePrefix="Client's" billHeading="Bill To"
				addressData={formData.toAddress}
				addressUpdaters={toAddressUpdaters} />
			<div className="grid grid-cols-2 grid-flow-row gap-4">
				<div className="col-start-1 col-span-1 row-start-1">
					<TextInput label="Invoice Date"
						updateFunction={getTextInputUpdater(updateFormData, ['invoiceDate'])}
						val={formData.invoiceDate.val}
						error={formData.invoiceDate.valid.message}
					/>
				</div>
				<div className="col-start-2 col-span-1 row-start-1">
					<SelectInput
						label="Payment Terms"
						options={
							[
								'Net 10 Days',
								'Net 20 Days',
								'Net 30 Days'
							]
						}
						updateFunction={getFormUpdater(updateFormData, ['paymentTerms'])}
						val={formData.paymentTerms.val}
						error={formData.paymentTerms.valid.message}
					/>
				</div>
				<div className="col-start-1 col-span-2 row-start-2">
					<TextInput
						label="Project Description"
						updateFunction={getTextInputUpdater(updateFormData, ['projectDesc'])}
						val={formData.projectDesc.val}
						error={formData.projectDesc.valid.message}
					/>
				</div>
			</div>
			<ItemsList
				addRow={addRow.bind(null, updateFormData)}
				items={formData.items}
				removeRow={removeRow.bind(null, updateFormData)}
				formData={formData}
				updateFormData={updateFormData}
			/>
		</div>
	)
}

function TextInput({
	label,
	type = "text",
	placeHolder = "",
	val = "",
	updateFunction = (e) => { },
	disabled,
	error = ""
}) {
	return (
		<div className="grid w-full items-center gap-1.5">
			<Label className="text-red-600 min-h-[1lh] text-xs">{error}</Label>
			<Label>{label}</Label>
			<Input type={type} placeholder={placeHolder} onChange={updateFunction}
				disabled={disabled}
				value={val} className="shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]" />
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
						val={addressData.name.val}
						error={addressData.name.valid.message}
					/>

				</div>
				<div className="col-start-4 col-span-3 row-start-1">
					<TextInput label={`${billRolePrefix} Email`} type="email"
						updateFunction={addressUpdaters.email}
						val={addressData.email.val}
						error={addressData.email.valid.message}
					/>
				</div>
				<div className="col-start-1 col-span-2 row-start-2">
					<SelectInput
						label="Country"
						options={
							[
								'USA',
								'Pakistan'
							]
						}
						updateFunction={addressUpdaters.country}
						val={addressData.country.val}
						error={addressData.country.valid.message}
					/>
				</div>
				<div className="col-start-3 col-span-2 row-start-2">
					<TextInput label="City"
						updateFunction={addressUpdaters.city}
						val={addressData.city.val}
						error={addressData.city.valid.message}
					/>
				</div>
				<div className="col-start-5 col-span-2 row-start-2">
					<TextInput label="Postal Code"
						updateFunction={addressUpdaters.postalCode}
						val={addressData.postalCode.val}
						error={addressData.postalCode.valid.message}
					/>
				</div>
				<div className="col-start-1 col-span-6 row-start-3">
					<TextInput label="Street Address"
						updateFunction={addressUpdaters.streetAddress}
						val={addressData.streetAddress.val}
						error={addressData.streetAddress.valid.message}
					/>
				</div>
			</div>
		</div>
	)
}

function ItemsList({ items, addRow, removeRow, formData, updateFormData }) {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">
				Items List
			</h1>
			<div className="flex flex-col gap-4">
				{/*row*/}
				{items.map(d =>
					<ItemRow
						key={d.key}
						id={d.key}
						removeRow={removeRow}
						name={d.name}
						nameHandler={getRowTextHandler(updateFormData, d.key, 'name')}
						qty={d.qty}
						qtyHandler={getRowTextHandler(updateFormData, d.key, 'qty')}
						price={d.price}
						priceHandler={getRowTextHandler(updateFormData, d.key, 'price')}
					/>
				)}
				<div>
					<Button onClick={addRow} className="bg-[#7F56D9] w-full">Add New Item</Button>
				</div>
			</div>
		</div>
	)
}

function ItemRow({
	removeRow,
	id,
	name,
	nameHandler,
	qty,
	qtyHandler,
	price,
	priceHandler
}) {

	let total;

	if (qty.val && price.val) {
		total = qty.val * price.val
	}

	return (
		<div className="flex gap-4">
			<div className="basis-0 flex-shrink-[1] flex-grow-[2]">
				<TextInput label="Item Name"
					updateFunction={(e) => nameHandler(e.target.value)}
					val={name.val}
					error={name.valid.message}
				/>
			</div>
			<div className="basis-0 flex-shrink-[1] flex-grow-[1]">
				<TextInput label="Qty."
					updateFunction={(e) => qtyHandler(e.target.value)}
					val={qty.val}
				/>
			</div>
			<div className="basis-0 flex-shrink-[1] flex-grow-[1]">
				<TextInput label="Price"
					updateFunction={(e) => priceHandler(e.target.value)}
					val={price.val}
				/>
			</div>
			<div className="basis-0 flex-shrink-[1] flex-grow-[1]">
				<TextInput label="Total" val={total} disabled />
			</div>
			<div className="flex items-end">
				<Button onClick={() => removeRow(id)} variant="outline" size="icon">
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}

function SelectInput({
	placeholder = "",
	label,
	options,
	updateFunction,
	val,
	error = ""
}) {
	return (
		<div className="grid w-full items-center gap-1.5">
			<Label className="text-red-500 min-h-[1lh] text-xs">{error}</Label>
			<Label>{label}</Label>
			<Select value={val} onValueChange={updateFunction}>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{
							options.map((d) =>
								<SelectItem value={d}>{d}</SelectItem>
							)
						}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}