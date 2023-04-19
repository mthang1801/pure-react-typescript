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
import { convertDatetime, convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ features }: any) => {
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
			title: "Mã đơn",
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => {
				return features.includes("MODULES_ORDER__ORDERS__VIEW_DETAIL") ? (
					<div>
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.ORDERS_EDIT}/${record?.id}`
							})}
							style={{ color: colors.neutral_color_1_4, display: "flex" }}
						>
							Mã đơn hàng:&nbsp; <span style={{ color: colors.accent_color_5_2 }}>{record?.order_code}</span>
						</Link>

						<div>
							<span style={{ color: colors.neutral_color_1_4 }}>Sàn:&nbsp;</span>
							{record?.platform_name}
						</div>
					</div>
				) : (
					<div>
						Mã đơn hàng:&nbsp; <span>{record?.order_code}</span>
						<div>
							<span style={{ color: colors.neutral_color_1_4 }}>Sàn:&nbsp;</span>
							{record?.platform_name}
						</div>
					</div>
				);
			}
		},
		{
			title: "Khách hàng",
			dataIndex: "platform",
			key: "platform",
			render: (platform: string, record: any, index: number) => {
				return (
					<div>
						<div>
							<span style={{ color: colors.neutral_color_1_4 }}>Tên:&nbsp;</span>
							{record?.b_fullname}
						</div>

						<a href={`tel:${record?.b_phone}`}>
							<span style={{ color: colors.neutral_color_1_4 }}>SĐT:&nbsp;</span>
							{record?.b_phone}
						</a>
					</div>
				);
			}
		},
		{
			title: "Trạng thái đơn hàng",
			dataIndex: "order_status_id",
			key: "order_status_id",
			align: "center",
			render: (order_status_id: string, record: any, index: number) => {
				return (
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						className={checkColor(order_status_id)}
					>
						{totalStatus.find((x: any) => x.value === order_status_id)?.label}
					</div>
				);
			}
		},
		{
			title: "Trạng thái thanh toán",
			dataIndex: "payment_status",
			key: "payment_status",
			align: "center",
			render: (payment_status: any, record: any, index: number) => {
				return (
					<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
						{payment_status == "3" ? <SvgPaymentComplete /> : <SvgPayment />}
					</div>
				);
			}
		},
		{
			title: "Ngày tạo đơn",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date, record: any, index: number) => {
				return <div>{ISO8601Formats(createdAt)}</div>;
			}
		},
		{
			title: "Tổng tiền (vnd)",
			dataIndex: "final_total_money_amount",
			key: "final_total_money_amount",
			align: "right",
			render: (final_total_money_amount: string, record: any, index: number) => {
				return <div>{final_total_money_amount ? convertNumberWithCommas(final_total_money_amount) : 0}</div>;
			}
		}
	];
};

export const columnsChildData = () => {
	return [
		{
			title: "STT",
			dataIndex: "product_id",
			key: "product_id",
			align: "center",
			render: (product_id: string, record: any, index: number) => {
				return <div>{index + 1}</div>;
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return (
					<div>
						{
							<Link
								to={(location) => ({
									...location,
									pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
								})}
								style={{ color: colors.accent_color_5_2, display: "flex" }}
							>
								{product_name}
							</Link>
						}
					</div>
				);
			}
		},
		{
			title: "Số lượng",
			dataIndex: "quantity",
			key: "quantity",
			align: "right",
			render: (quantity: string, record: any, index: number) => {
				return <div>{quantity}</div>;
			}
		},
		{
			title: "Đơn giá (vnđ)",
			dataIndex: "price",
			key: "price",
			align: "right",

			render: (price: string, record: any, index: number) => {
				return <div>{convertNumberWithCommas(price.toString())}</div>;
			}
		},
		{
			title: "Chiết khấu (vnđ)",
			dataIndex: "discount",
			key: "discount",
			align: "right",

			render: (discount: string, record: any, index: number) => {
				return <div>{discount}</div>;
			}
		},
		{
			title: "Tổng tiền (vnd)",
			dataIndex: "total_money_amount",
			key: "total_money_amount",
			align: "right",

			render: (total_money_amount: string, record: any, index: number) => {
				return <div>{total_money_amount ? convertNumberWithCommas(total_money_amount.toString()) : ""}</div>;
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
