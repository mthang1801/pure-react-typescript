import { Switch } from "antd";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgLock from "src/assets/svg/SvgLock";
import SvgPayment from "src/assets/svg/SvgPayment";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";
import SvgUnLock from "src/assets/svg/SvgUnLock";
import { totalStatus } from "src/constants";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = () => {
	const checkColor = (value: any) => {
		switch (value) {
			case 1 || 2:
				return "statusOrder1";
			case 3 || 4:
				return "statusOrder2";
			case 5 || 6:
				return "statusOrder3";
			case 7 || 8:
				return "statusOrder4";
			case 9 || 10:
				return "statusOrder5";
			default:
				return "statusOrder1";
		}
	};
	return [
		{
			title: "Mã vận đơn",
			dataIndex: "delivery_code",
			key: "delivery_code",
			render: (delivery_code: string, record: any, index: number) => {
				return (
					<Link
						to={(location) => ({
							...location,
							pathname: `${routerNames.BILL_EDIT}/${record?.delivery_code}`
						})}
						style={{ color: colors.neutral_color_1_4, display: "flex" }}
					>
						&nbsp; <span style={{ color: colors.accent_color_5_2 }}>{record?.delivery_code}</span>
					</Link>
				);
			}
		},
		{
			title: "Người nhận",
			dataIndex: "s_fullname",
			key: "s_fullname",
			render: (s_fullname: string, record: any, index: number) => {
				return <div>{s_fullname}</div>;
			}
		},
		{
			title: "Số điện thoại",
			dataIndex: "s_phone",
			key: "s_phone",
			render: (s_phone: string, record: any, index: number) => {
				return <span>{s_phone}</span>;
			}
		},
		{
			title: "Ngày đóng gói",
			dataIndex: "packaged_at",
			key: "packaged_at",
			render: (packaged_at: any, record: any, index: number) => {
				return <div>{ISO8601Formats(packaged_at)}</div>;
			}
		},
		{
			title: "Trạng thái vận chuyển",
			dataIndex: "order_status_name",
			key: "order_status_name",
			align: "center",
			render: (order_status_name: string, record: any, index: number) => {
				return (
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						className={checkColor(record?.delivery_status_id)}
					>
						{order_status_name?.split("-")[0]}
					</div>
				);
			}
		},
		{
			title: "Tiền cước (vnd)",
			dataIndex: "shipping_fee",
			key: "shipping_fee",
			align: "right",
			render: (shipping_fee: string, record: any, index: number) => {
				return <div>{shipping_fee ? convertNumberWithCommas(shipping_fee) : "-"}</div>;
			}
		},
		{
			title: "Thu hộ COD (vnd)",
			dataIndex: "cod",
			key: "cod",
			align: "right",
			render: (cod: string, record: any, index: number) => {
				return <div>{cod ? convertNumberWithCommas(cod) : "-"}</div>;
			}
		}
	];
};

export const columnsChildData = () => {
	const checkColor = (value: any) => {
		switch (value) {
			case 1 || 2:
				return "statusOrder1";
			case 3 || 4:
				return "statusOrder2";
			case 5 || 6:
				return "statusOrder3";
			case 7 || 8:
				return "statusOrder4";
			case 9 || 10:
				return "statusOrder5";
			default:
				return "statusOrder1";
		}
	};
	return [
		{
			title: "Tỉnh đến",
			dataIndex: "current_location",
			key: "current_location",
			render: (current_location: string, record: any, index: number) => {
				return <div>{current_location}</div>;
			}
		},
		{
			title: "Trạng thái 3PL",
			dataIndex: "delivery_status_name",
			key: "delivery_status_name",
			align: "center",
			render: (delivery_status_name: string, record: any, index: number) => {
				return (
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						className={checkColor(record?.delivery_status_id)}
					>
						{delivery_status_name ? delivery_status_name?.split("-")[0] : "-"}
					</div>
				);
			}
		},
		{
			title: "Thời gian TT 3PL",
			dataIndex: "delivery_push_at",
			key: "delivery_push_at",
			render: (delivery_push_at: any, record: any, index: number) => {
				return <div>{delivery_push_at ? ISO8601Formats(delivery_push_at) : "-"}</div>;
			}
		},
		{
			title: "Trạng thái vận đơn",
			dataIndex: "delivery_status_name",
			key: "delivery_status_name",
			align: "center",
			render: (delivery_status_name: string, record: any, index: number) => {
				return (
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						className={checkColor(record?.delivery_status_id)}
					>
						{delivery_status_name ? delivery_status_name?.split("-")[0] : "-"}
					</div>
				);
			}
		},
		{
			title: "Lý do",
			dataIndex: "description",
			key: "description",
			render: (description: string, record: any, index: number) => {
				return <div>{description ? description : "-"}</div>;
			}
		},
		{
			title: "Thời gian",
			dataIndex: "updatedAt",
			key: "updatedAt",

			render: (updatedAt: any, record: any, index: number) => {
				return <div>{ISO8601Formats(updatedAt)}</div>;
			}
		}
	];
};

export const dataOrders = [
	{
		order_code: "GAUBONG",
		id: 1,
		order_id: 4,

		seller: "Cửa hàng Gấu Bông Béo",
		customer_name: "Nhất Tín",
		customer_phone: "0392649291",
		platform: "Lazada",
		status: "A",
		payment_status: "D",
		lockedBy: "Admin",
		created_at: "02/08/2022 14:56",
		total: "1000000",
		orderItems: [
			{
				product_id: 1,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 2,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 3,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 4,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			}
		]
	},
	{
		order_code: "GAUBONG1",
		order_id: 3,

		id: 2,
		seller: "Cửa hàng Gấu Bông Béo",
		customer_name: "Nhất Tín",
		customer_phone: "0392649291",

		platform: "Lazada",
		status: "D",
		payment_status: "A",
		lockedBy: "",
		created_at: "02/08/2022 14:56",
		total: "1000000",
		orderItems: [
			{
				product_id: 1,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 2,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 3,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 4,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			}
		]
	},
	{
		order_code: "GAUBONG2",
		order_id: 2,

		id: 3,
		seller: "Cửa hàng Gấu Bông Béo",
		customer_name: "Nhất Tín",
		customer_phone: "0392649291",

		platform: "Lazada",
		status: "A",
		payment_status: "D",
		lockedBy: "Admin",
		created_at: "02/08/2022 14:56",
		total: "1000000",
		orderItems: [
			{
				product_id: 1,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 2,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 3,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 4,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			}
		]
	},
	{
		order_code: "GAUBONG3",
		order_id: 1,
		id: 4,
		seller: "Cửa hàng Gấu Bông Béo",
		customer_name: "Nhất Tín",
		customer_phone: "0392649291",

		platform: "Lazada",
		status: "A",
		payment_status: "A",
		lockedBy: "",
		created_at: "02/08/2022 14:56",
		total: "1000000",
		orderItems: [
			{
				product_id: 1,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 2,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 3,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 4,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			}
		]
	},
	{
		order_code: "GAUBONG4",
		order_id: 5,

		id: 5,
		seller: "Cửa hàng Gấu Bông Béo",
		customer_name: "Nhất Tín",
		customer_phone: "0392649291",

		platform: "Lazada",
		status: "D",
		payment_status: "A",
		lockedBy: "",
		created_at: "02/08/2022 14:56",
		total: "1000000",
		orderItems: [
			{
				product_id: 1,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 2,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 3,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			},
			{
				product_id: 4,
				product: "Gấu mèo mắt thâm",
				qty: 2,
				price: 100000,
				sale: 0,
				total: 200000
			}
		]
	}
];
