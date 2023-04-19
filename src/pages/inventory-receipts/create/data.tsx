import { InputNumber, Switch } from "antd";
import { Link } from "react-router-dom";
import SvgBin from "src/assets/svg/SvgBin";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import {
	AttributeFilterTypeEnum,
	AttributeFilterTypeVietnameseEnum,
	AttributePurposeEnum,
	AttributePurposeVietnameseEnum,
	AttributeTypeEnum,
	AttributeTypeVietnameseEnum
} from "src/constants/enum";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { getKeyByValue } from "src/utils/helpers/functions/utils";

export const columnsData = () => {
	return [
		{
			title: "Sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<Link
							to={() => ({
								pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
							})}
						>
							{product_name}
						</Link>
						<div style={{ fontSize: "12px", display: "flex" }}>
							<p style={{ margin: "0" }}>SKU:&nbsp;{record.sku}</p>&nbsp;-&nbsp;
							<p style={{ margin: "0" }}>Barcode:&nbsp;{record.barcode}</p>
						</div>
					</>
				);
			}
		},
		{
			title: "Tồn",
			dataIndex: "id",
			key: "id",
			align: "right",
			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{record?.warehouse?.warehouse_name}</div>;
			}
		}
	];
};
export const columnsDataCheck = ({ changeRealQty, removeProduct }: any) => {
	return [
		{
			title: "STT",
			dataIndex: "id",
			key: "id",
			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{index + 1}</div>;
			}
		},
		{
			title: "SKU",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return <p style={{ margin: "0" }}>SKU:&nbsp;{record.sku}</p>;
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<Link
							to={() => ({
								pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
							})}
						>
							{product_name}
						</Link>
					</>
				);
			}
		},
		{
			title: "Đơn vị",
			dataIndex: "unit",
			key: "unit",
			align: "right",
			render: (unit: any, record: any, index: number) => {
				return <div>{unit?.unit}</div>;
			}
		},
		{
			title: "Tồn kho",
			dataIndex: "qty_in_stock",
			key: "qty_in_stock",
			align: "right",
			render: (qty_in_stock: string, record: any, index: number) => {
				return <div>{qty_in_stock}</div>;
			}
		},
		{
			title: "Tồn kho thực tế",
			dataIndex: "real_qty_in_stock",
			key: "real_qty_in_stock",
			align: "right",
			render: (real_qty_in_stock: string, record: any, index: number) => {
				return (
					<InputNumber
						defaultValue={real_qty_in_stock}
						placeholder="Nhập khối lượng thực tế"
						min={"0"}
						max={"10000"}
						className="defaultInputNumber"
						onBlur={(e: any) => {
							if (e.target.value <= 10000) {
								changeRealQty(e.target.value, record);
							} else {
								changeRealQty(10000, record);
							}
						}}
					/>
				);
			}
		},
		{
			title: "Chệnh lệch",
			dataIndex: "differential",
			key: "differential",
			align: "right",
			render: (differential: string, record: any, index: number) => {
				return <div>{differential}</div>;
			}
		},
		{
			title: "",
			dataIndex: "",
			align: "center",
			render: (differential: string, record: any, index: number) => {
				return (
					<div
						style={{
							cursor: "pointer",
							border: "1px solid rgb(212,212,212)",
							borderRadius: "2px",
							width: "30px",
							height: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
						onClick={() => removeProduct(record)}
					>
						<SvgBin style={{ transform: "scale(0.7)" }} fill="rgb(212,212,212)" />
					</div>
				);
			}
		}
	];
};
