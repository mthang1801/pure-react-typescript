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
import { convertNumberWithCommas, getAddressString } from "src/utils/helpers/functions/textUtils";
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
						<div>{record?.order_code}</div>
						<div>
							{record?.s_phone} - {record?.s_fullname}
						</div>
						<div style={{ color: "rgb(156,156,156)", fontSize: "12px" }}>
							{getAddressString(record?.s_address, record?.s_ward, record?.s_district, record?.s_province)}
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
				return (
					<>
						<div>Thu hộ (vnđ):</div>
						<div style={{ color: "red" }}>{record?.cod ? convertNumberWithCommas(record?.cod) : "-"}đ</div>
					</>
				);
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
			title: "Mã vận đơn",
			dataIndex: "delivery_code",
			key: "delivery_code",
			render: (delivery_code: string, record: any, index: number) => {
				return <>{delivery_code}</>;
			}
		},
		{
			title: "Mã đơn hàng",
			dataIndex: "order_code",
			key: "order_code",
			render: (order_code: string, record: any, index: number) => {
				return <>{order_code}</>;
			}
		},
		{
			title: "Thu hộ COD (vnđ)",
			dataIndex: "cod",
			key: "cod",
			align: "right",
			render: (cod: any, record: any, index: number) => {
				return <div>{cod ? convertNumberWithCommas(cod) : "0"}</div>;
			}
		},
		{
			title: "Tiền cước (vnđ)",
			dataIndex: "shipping_fee",
			key: "shipping_fee",
			align: "right",
			render: (shipping_fee: string, record: any, index: number) => {
				return <div>{shipping_fee ? convertNumberWithCommas(shipping_fee) : "0"}</div>;
			}
		},
		{
			title: "Phí thu hộ COD (vnđ)",
			dataIndex: "delivery_cod_fee",
			key: "delivery_cod_fee",
			align: "right",
			render: (delivery_cod_fee: string, record: any, index: number) => {
				return <div>{delivery_cod_fee ? convertNumberWithCommas(delivery_cod_fee) : "0"}</div>;
			}
		},
		{
			title: "Công nợ (vnđ)",
			dataIndex: "debit_amount",
			key: "debit_amount",
			align: "right",
			render: (debit_amount: string, record: any, index: number) => {
				return <div>{debit_amount && convertNumberWithCommas(debit_amount?.toString())}</div>;
			}
		},
		{
			title: "Người trả cước",
			dataIndex: "delivery_payment_method_name",
			key: "delivery_payment_method_name",
			render: (delivery_payment_method_name: any, record: any, index: number) => {
				return <div>{delivery_payment_method_name}</div>;
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
