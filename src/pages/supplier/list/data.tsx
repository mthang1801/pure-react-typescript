import { Switch } from "antd";
import colors from "src/utils/colors";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertDatetime, convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ changeStatus, editRecord, features }: any) => {
	return [
		{
			title: "Mã nhà cung cấp",
			dataIndex: "supplier_code",
			key: "supplier_code",
			render: (supplier_code: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__SUPPLIER__VIEW_DETAIL") ? (
					<div onClick={() => editRecord(record)} style={{ color: "#40BAFF", cursor: "pointer" }}>
						{supplier_code}
					</div>
				) : (
					<div>{supplier_code}</div>
				);
			}
		},
		{
			title: "Tên nhà cung cấp",
			dataIndex: "supplier_name",
			key: "supplier_name",
			render: (supplier_name: string, record: any, index: number) => {
				return <div>{supplier_name}</div>;
			}
		},

		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record: any, index: number) => {
				return <a href={`tel:${record?.phone}`}>{record?.phone}</a>;
			}
		},
		{
			title: "Công nợ (vnđ)",
			dataIndex: "debt",
			key: "debt",
			align: "right",

			render: (debt: string, record: any, index: number) => {
				return <div>{debt && convertNumberWithCommas(debt)}</div>;
			}
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: any, record: any, index: number) => {
				return <div>{ISO8601Formats(createdAt)}</div>;
			}
		},
		{
			title: "Ngày cập nhật",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: any, record: any, index: number) => {
				return <div>{ISO8601Formats(updatedAt)}</div>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						<Switch
							disabled={!features.includes("MODULE_PRODUCTS__SUPPLIER__UPDATE")}
							checked={status}
							onChange={(e: any) => changeStatus(e, record)}
						/>
					</div>
				);
			}
		}
	];
};
