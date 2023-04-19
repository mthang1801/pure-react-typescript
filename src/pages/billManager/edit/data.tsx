import { Switch } from "antd";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgLock from "src/assets/svg/SvgLock";
import SvgPayment from "src/assets/svg/SvgPayment";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";
import SvgUnLock from "src/assets/svg/SvgUnLock";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertNumberWithCommas, convertNumberWithDotChange } from "src/utils/helpers/functions/textUtils";

export const columnsData = () => {
	return [
		{
			title: "Mã đơn",
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => {
				return (
					<div>
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.ORDERS}/${record?.order_id}`
							})}
							style={{ color: colors.neutral_color_1_4, display: "flex" }}
						>
							Mã đơn hàng:&nbsp; <span style={{ color: colors.accent_color_5_2 }}>{record.order_code}</span>
						</Link>

						<div>
							<span style={{ color: colors.neutral_color_1_4 }}>Sàn:&nbsp;</span>
							{record.platform}
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
							{record.customer_name}
						</div>

						<div>
							<span style={{ color: colors.neutral_color_1_4 }}>SĐT:&nbsp;</span>
							{record.customer_phone}
						</div>
					</div>
				);
			}
		},
		{
			title: "Trạng thái đơn hàng",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						{status === "A" ? <div className="statusA">Đã hoàn thành</div> : <div className="statusD">Mới</div>}
					</div>
				);
			}
		},
		{
			title: "Trạng thái thanh toán",
			dataIndex: "payment_status",
			key: "payment_status",
			align: "center",
			render: (payment_status: string, record: any, index: number) => {
				return payment_status === "A" ? <SvgPaymentComplete /> : <SvgPayment />;
			}
		},
		{
			title: "Ngày tạo đơn",
			dataIndex: "created_at",
			key: "created_at",
			render: (created_at: string, record: any, index: number) => {
				return <div>{created_at}</div>;
			}
		},
		{
			title: "Tổng tiền (vnd)",
			dataIndex: "total",
			key: "total",
			render: (total: string, record: any, index: number) => {
				return <div>{convertNumberWithCommas(total)}</div>;
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
			render: (product_id: string, record: any, index: number) => {
				return <div>{product_id}</div>;
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product",
			key: "product",
			render: (product: string, record: any, index: number) => {
				return <div>{product}</div>;
			}
		},
		{
			title: "Số lượng",
			dataIndex: "qty",
			key: "qty",
			align: "right",
			render: (qty: string, record: any, index: number) => {
				return <div>{qty}</div>;
			}
		},
		{
			title: "Đơn giá",
			dataIndex: "price",
			key: "price",
			align: "right",

			render: (price: string, record: any, index: number) => {
				return <div>{price}</div>;
			}
		},
		{
			title: "Chiết khấu (%)",
			dataIndex: "sale",
			key: "sale",
			align: "right",

			render: (sale: string, record: any, index: number) => {
				return <div>{sale}</div>;
			}
		},
		{
			title: "Tổng tiền (vnd)",
			dataIndex: "total",
			key: "total",
			align: "right",

			render: (total: string, record: any, index: number) => {
				return <div>{total}</div>;
			}
		}
	];
};

export const columnsHistory = () => {
	return [
		{
			title: "Thời gian",
			dataIndex: "payment_status",
			key: "payment_status",
			align: "center",
			render: (payment_status: string, record: any, index: number) => {
				return <div></div>;
			}
		},
		{
			title: "Người thao tác",
			dataIndex: "created_at",
			key: "created_at",
			render: (created_at: string, record: any, index: number) => {
				return <div></div>;
			}
		},
		{
			title: "Thao tác",
			dataIndex: "total",
			key: "total",
			render: (total: string, record: any, index: number) => {
				return <div></div>;
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

export const columnsDataInfo = () => {
	return [
		{
			title: (
				<div style={{ display: "flex", alignItems: "center" }}>
					Thông tin giao hàng&nbsp;
					<SvgEdit style={{ transform: "scale(0.7)" }} />
				</div>
			),
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => {
				return (
					<div>
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.ORDERS}/${record?.order_id}`
							})}
							style={{ color: colors.neutral_color_1_4, display: "flex" }}
						>
							Mã đơn hàng:&nbsp; <span style={{ color: colors.accent_color_5_2 }}>{record.order_code}</span>
						</Link>

						<div>
							<span style={{ color: colors.neutral_color_1_4 }}>Sàn:&nbsp;</span>
							{record.platform}
						</div>
					</div>
				);
			}
		},
		{
			title: null,
			dataIndex: "description",
			key: "description",
			render: (description: string, record: any, index: number) => {
				return <div>{description}</div>;
			}
		}
	];
};

export const columnsDataProducts = () => {
	return [
		{
			title: "STT",
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => {
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
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.PRODUCT_EDIT}/${record?.product_id}`
							})}
							style={{ color: colors.neutral_color_1_4, display: "flex" }}
						>
							<span style={{ color: colors.accent_color_5_2 }}>{record.product_name}</span>
						</Link>
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
				return <div>{quantity ? convertNumberWithDotChange(quantity) : "-"}</div>;
			}
		},
		{
			title: "Đơn giá (vnđ)",
			dataIndex: "price",
			key: "price",
			align: "right",
			render: (price: string, record: any, index: number) => {
				return <div>{price ? convertNumberWithCommas(price) : "-"}</div>;
			}
		},
		{
			title: "Chiết khấu (vnđ)",
			dataIndex: "discount",
			key: "discount",
			align: "right",
			render: (discount: string, record: any, index: number) => {
				return <div>{discount ? convertNumberWithCommas(discount) : "-"}</div>;
			}
		},
		{
			title: "Thành tiền (vnđ)",
			dataIndex: "total_money_amount",
			key: "total_money_amount",
			align: "right",
			render: (total_money_amount: string, record: any, index: number) => {
				return <div>{total_money_amount && convertNumberWithCommas(total_money_amount)}</div>;
			}
		}
	];
};

export const columnsDataLog = () => {
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
						{delivery_status_name?.split("-")[0]}
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
						{delivery_status_name.split("-")[0]}
					</div>
				);
			}
		},
		{
			title: "Thời gian",
			dataIndex: "updatedAt",
			key: "updatedAt",

			render: (updatedAt: any, record: any, index: number) => {
				return <div>{ISO8601Formats(updatedAt)}</div>;
			}
		},
		{
			title: "Lý do",
			dataIndex: "description",
			key: "description",
			render: (description: string, record: any, index: number) => {
				return <div>{description ? description : "-"}</div>;
			}
		}
	];
};
