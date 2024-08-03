
export default function Preview({ formData }) {
	return (
		<div className="bg-[#F5F5F5] rounded-3xl p-6 flex flex-col flex-grow-[1] flex-shrink-[1] basis-[0] gap-8">
			<h1 className="font-semibold text-2xl">
				Preview
			</h1>
			<div className="rounded-2xl p-6 bg-white shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.03)] flex flex-col text-lg">
				<div className="border-b-[1px] border-b-[#EAECF0]">
					<h2 className="font-semibold">
						New Invoice
					</h2>
				</div>
				<div className="grid grid-cols-2 grid-flow-row">
					<div className="flex flex-col col-start-1 col-span-1">
						<h2 className="text-[#76787D]">
							Invoice Date
						</h2>
						<h2>
							{formData.invoiceDate}
						</h2>
					</div>
					<div className="flex flex-col col-start-2 col-span-1 row-start-1">
						<h2 className="text-[#76787D]">
							Payment Terms
						</h2>
						<h2>
							{formData.paymentTerms}
						</h2>
					</div>
					<div className="flex flex-col col-start-1 col-span-1 row-start-2">
						<h2 className="text-[#76787D]">
							Billed From
						</h2>
						<h2>
							{formData.fromAddress.name}
						</h2>
					</div>
					<div className="flex flex-col col-start-2 col-span-1 row-start-2">
						<h2 className="text-[#76787D]">
							Billed To
						</h2>
						<h2>
							{formData.toAddress.name}
						</h2>
					</div>
					<div className="flex flex-col col-start-1 col-span-2 row-start-3">
						<h2 className="text-[#76787D]">
							Project Description
						</h2>
						<h2>
							{formData.projectDesc}
						</h2>
					</div>
					<div className="flex col-start-1 col-span-2 row-start-4">
						<div className="flex flex-col w-full">
							<div className="flex bg-[#F5F5F5] gap-6 p-2 rounded-[4px]">
								<div>
									Item
								</div>
								<div>
									Quantity
								</div>
								<div>
									Price
								</div>
								<div className="ml-auto">
									Total Amount
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}