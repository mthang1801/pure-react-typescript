import { convertNumberWithCommas, convertNumberWithDotChange } from "src/utils/helpers/functions/textUtils";

export const columnsData = () => {
	return [
		{
			title: "Trạng thái",
			dataIndex: "forControlStatusName",
			key: "forControlStatusName",
			align: "center",
			render: (forControlStatusName: string, record: any, index: number) => {
				return (
					<div style={{ height: "43px", display: "flex", alignItems: "center", justifyContent: "center" }}>
						{forControlStatusName}
					</div>
				);
			}
		},
		{
			title: "Số đơn",
			dataIndex: "billCount",
			key: "billCount",
			align: "right",
			render: (billCount: string, record: any, index: number) => {
				return <div>{convertNumberWithDotChange(billCount)}</div>;
			}
		},

		{
			title: "Tiền thu hộ (vnđ)",
			dataIndex: "COD",
			key: "COD",
			align: "right",
			render: (COD: string, record: any, index: number) => {
				return <div>{convertNumberWithCommas(COD)}</div>;
			}
		},

		{
			title: "Tiền trả ĐVVC (vnđ)",
			dataIndex: "shippingFee",
			key: "shippingFee",
			align: "right",
			render: (shippingFee: string, record: any, index: number) => {
				return <div>{convertNumberWithCommas(shippingFee)}</div>;
			}
		}
	];
};
