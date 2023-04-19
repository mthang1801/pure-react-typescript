import { InputNumber, Switch } from "antd";
import { Link } from "react-router-dom";
import SvgBin from "src/assets/svg/SvgBin";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgLock from "src/assets/svg/SvgLock";
import SvgPayment from "src/assets/svg/SvgPayment";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";
import SvgUnLock from "src/assets/svg/SvgUnLock";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ removeProduct, setQuantityCallback }: any) => {
	return [
		{
			title: "STT",
			dataIndex: "seller",
			key: "seller",
			align: "center",
			render: (seller: string, record: any, index: number) => {
				return <div>{index + 1}</div>;
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return <Link to={`${routerNames.PRODUCT_EDIT}/${record.product_id}`}>{product_name}</Link>;
			}
		},

		{
			title: "Đơn vị",
			dataIndex: "discount",
			key: "discount",
			align: "right",
			render: (discount: string, record: any, index: number) => {
				return <div></div>;
			}
		},
		{
			title: "Đơn giá (vnđ)",
			dataIndex: "price",
			key: "price",
			align: "right",
			render: (price: string, record: any, index: number) => {
				return <div>{price && convertNumberWithCommas(price.toString())}</div>;
			}
		},
		{
			title: "Số lượng",
			dataIndex: "quantity",
			key: "quantity",
			align: "right",
			render: (quantity: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<span
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "#fff",
								borderRadius: "2px",
								border: "1px solid rgb(212,212,212)",
								width: "20px",
								height: "20px",
								cursor: "pointer"
							}}
							onClick={() => setQuantityCallback(Number(quantity) - 1, record)}
						>
							-
						</span>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "#fff",
								width: "calc(100% - 44px)",
								height: "20px"
							}}
						>
							{quantity}
						</div>
						<span
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "#fff",
								borderRadius: "2px",
								border: "1px solid rgb(212,212,212)",
								width: "20px",
								height: "20px",
								cursor: "pointer"
							}}
							onClick={() => setQuantityCallback(Number(quantity) + 1, record)}
						>
							+
						</span>
					</div>
				);
			}
		},

		{
			title: "Thành tiền (vnđ)",
			dataIndex: "total",
			key: "total",
			align: "right",
			render: (total: string, record: any, index: number) => {
				return (
					<div>
						{record.quantity &&
							record.price &&
							convertNumberWithCommas((Number(record.quantity) * Number(record.price)).toString())}
					</div>
				);
			}
		},
		{
			title: "",
			dataIndex: "",
			key: "",
			align: "center",
			render: (desc: string, record: any, index: number) => {
				return (
					<div
						onClick={() => removeProduct(record)}
						style={{
							border: "1px solid rgb(212,212,212)",
							borderRadius: "2px",
							width: "24px",
							height: "24px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<SvgBin fill="rgb(212,212,212)" style={{ transform: "scale(0.8)" }} />
					</div>
				);
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
