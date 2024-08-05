
export default function Preview({ formData }) {
	const subTotal = Object.values(formData.items)
		.filter(d => d.formModelElemType !== undefined)
		.reduce((acc, d) => acc + (d.price.val * d.qty.val), 0);

	const total = 1.1 * subTotal

	return (
		<div className="bg-[#F5F5F5] rounded-3xl p-6 flex flex-col flex-grow-[1] flex-shrink-[1] basis-[0] gap-8">
			<h1 className="font-semibold text-2xl">
				Preview
			</h1>
			<div className="rounded-2xl p-6 bg-white shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.03)] flex flex-col text-lg">
				<div className="border-b-[1px] border-b-[#EAECF0] pb-4">
					<h2 className="font-semibold">
						New Invoice
					</h2>
				</div>
				<div className="grid grid-cols-2 grid-flow-row pt-4">
					<div className="flex flex-col col-start-1 col-span-1">
						<h2 className="text-[#76787D]">
							Invoice Date
						</h2>
						<h2 className="min-h-[1lh]">
							{formData.invoiceDate.val}
						</h2>
					</div>
					<div className="flex flex-col col-start-2 col-span-1 row-start-1">
						<h2 className="text-[#76787D]">
							Payment Terms
						</h2>
						<h2 className="min-h-[1lh]">
							{formData.paymentTerms.val}
						</h2>
					</div>
					<div className="flex flex-col col-start-1 col-span-1 row-start-2">
						<h2 className="text-[#76787D]">
							Billed From
						</h2>
						<h2 className="min-h-[1lh]">
							{formData.fromAddress.name.val}
						</h2>
					</div>
					<div className="flex flex-col col-start-2 col-span-1 row-start-2">
						<h2 className="text-[#76787D]">
							Billed To
						</h2>
						<h2 className="min-h-[1lh]">
							{formData.toAddress.name.val}
						</h2>
					</div>
					<div className="flex flex-col col-start-1 col-span-2 row-start-3">
						<h2 className="text-[#76787D]">
							Project Description
						</h2>
						<h2 className="min-h-[1lh]">
							{formData.projectDesc.val}
						</h2>
					</div>
					<div className="flex col-start-1 col-span-2 row-start-4">
						<div className="flex flex-col w-full">
							<div className="flex bg-[#F5F5F5] gap-2 p-2 rounded-[4px] border-b-[1px] border-[#EAECF0]">
								<div className="flex-1 basis-1">
									Item
								</div>
								<div className="flex-1 basis-1">
									Qty.
								</div>
								<div className="flex-1 basis-1">
									Price
								</div>
								<div className="flex-1 basis-2">
									Total Amount
								</div>
							</div>
							{Object.values(formData.items)
								.filter(d => d.formModelElemType !== undefined)
								.map(
									d => (
										<ItemRow
											qty={d.qty.val}
											name={d.name.val}
											price={d.price.val}
										/>)
								)
							}
						</div>
					</div>
					<div className="flex col-start-2 col-span-1 row-start-5 pt-8">
						<div className="flex flex-col w-full font-semibold gap-2">
							<div className="flex justify-between text-base">
								<h2>Subtotal</h2>
								<h2>$ {isNaN(subTotal) ? 0 : subTotal}</h2>
							</div>
							<div className="flex justify-between text-base">
								<h2>Tax</h2>
								<h2>10%</h2>
							</div>
							<div className="flex justify-between text-xl">
								<h1>Total</h1>
								<h1>$ {isNaN(total) ? '0.00' : Number(total).toFixed(2)}</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ItemRow({
	name,
	qty,
	price
}) {
	const total = qty * price;

	return (
		<div className="flex gap-2 p-2">
			<div className="flex-1 basis-1" style={{overflowWrap : 'anywhere'}}>
				{name}
			</div>
			<div className="flex-1 basis-1" style={{overflowWrap : 'anywhere'}}>
				{qty}
			</div>
			<div className="flex-1 basis-1" style={{overflowWrap : 'anywhere'}}>
				$ {price}
			</div>
			<div className="flex-1 basis-2 text-right" style={{overflowWrap : 'anywhere'}}>
				{isNaN(total) ? '' : total}
			</div>
		</div>
	)
}

