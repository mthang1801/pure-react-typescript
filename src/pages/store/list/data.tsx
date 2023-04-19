import { Switch } from "antd";
import { Link } from "react-router-dom";
import routerNames from "src/utils/data/routerName";
import { getAddressString } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ changeStatus, editRecord, features }: any) => {
	return [
		{
			title: "Mã kho",
			dataIndex: "warehouse_code",
			key: "warehouse_code",
			render: (warehouse_code: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__STORES__VIEW_DETAIL") ? (
					<div onClick={() => editRecord(record)} style={{ color: "#40BAFF", cursor: "pointer" }}>
						{warehouse_code}
					</div>
				) : (
					<div>{warehouse_code}</div>
				);
			}
		},
		{
			title: "Tên kho",
			dataIndex: "warehouse_name",
			key: "warehouse_name",
			render: (warehouse_name: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__STORES__VIEW_DETAIL") ? (
					<Link
						to={() => ({
							pathname: `${routerNames.STORE_EDIT}/${record?.id}`
						})}
					>
						{warehouse_name}
					</Link>
				) : (
					<div>{warehouse_name}</div>
				);
			}
		},

		{
			title: "Địa chỉ kho",
			dataIndex: "full_address",
			key: "full_address",
			render: (full_address: string, record: any, index: number) => {
				return (
					<div>
						{getAddressString(record?.address, record?.ward_name, record?.district_name, record?.province_name)}
					</div>
				);
			}
		},
		{
			title: "Toạ độ",
			dataIndex: "created_at",
			key: "created_at",
			render: (created_at: string, record: any, index: number) => {
				return (
					<>
						<div>Kinh độ:&nbsp;{record?.longitude}</div>
						<div>Vĩ độ:&nbsp;{record?.latitude}</div>
					</>
				);
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
			title: "Tồn kho",
			dataIndex: "qty_in_stock",
			key: "qty_in_stock",
			align: "right",
			render: (qty_in_stock: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{qty_in_stock}</div>;
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
							disabled={!features.includes("MODULE_PRODUCTS__STORES__UPDATE")}
							checked={status}
							onChange={(e: any) => changeStatus(e, record)}
						/>
					</div>
				);
			}
		}
	];
};
