import moment from "moment";
import { Link } from "react-router-dom";
import SvgDashboard from "src/assets/svg/SvgDashboard";
import SvgDashboard1 from "src/assets/svg/SvgDashboard1";
import SvgDashboard2 from "src/assets/svg/SvgDashboard2";
import SvgDashboard3 from "src/assets/svg/SvgDashboard3";
import routerNames from "src/utils/data/routerName";
import { numberWithCommas } from "src/utils/helpers/functions/textUtils";

export const dataTop = [
	{
		svg: <SvgDashboard1 />,
		value: `${numberWithCommas("305900000")} đ`,
		label: "Tổng doanh thu trong ngày"
	},
	{
		svg: <SvgDashboard2 />,
		value: 92,
		label: "Tổng khách hàng trong ngày"
	},
	{
		svg: <SvgDashboard3 />,
		value: 36,
		label: "Tổng đơn hàng trong ngày"
	}
];

const getColorStatus = (status: any) => {
	switch (status) {
		case "F":
			return { css: "fail", label: "Không thành công" };
		case "A":
			return { css: "new", label: "Mới" };
		case "B":
			return { css: "success", label: "Thành công" };
		case "C":
			return { css: "loading", label: "Đang xử lý" };
		case "D":
			return { css: "shipping", label: "Đang giao" };
		case "E":
			return { css: "boxing", label: "Đang đóng gói" };
		case "G":
			return { css: "paid", label: "Đã thanh toán" };
		case "H":
			return { css: "cancel", label: "Đã huỷ" };
	}
};
export const columnsLeft = (props: any) => {
	return [
		{
			title: "Cửa hàng",
			dataIndex: "store_location_id",
			key: "store_location_id",
			render: (store_location_id: string, record: any, index: number) => {
				return <span className="text-Blue_2">{store_location_id}</span>;
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product",
			key: "product",
			render: (product: string, record: any, index: number) => {
				return <div className="dashboard-product">{product}</div>;
			}
		},
		{
			title: "Số lượng",
			dataIndex: "amount",
			key: "amount",
			render: (amount: string, record: any, index: number) => {
				return <span>{amount}</span>;
			}
		}
	];
};

export const columnsRight = (props: any) => {
	return [
		{
			title: "Mã đơn hàng",
			dataIndex: "order_code",
			key: "order_code",
			render: (order_code: string, record: any, index: number) => {
				return <span className="text-Blue_2">{order_code}</span>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "order_status",
			key: "order_status",
			align: "center",
			render: (order_status: string, record: any, index: number) => {
				return (
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						className={`order-status ${getColorStatus(order_status)?.css}`}
					>
						{getColorStatus(order_status)?.label}
					</div>
				);
			}
		},
		{
			title: "Tổng tiền",
			dataIndex: "order_totalPrice",
			key: "order_totalPrice",
			render: (order_totalPrice: string, record: any, index: number) => {
				return <span>{`${numberWithCommas(order_totalPrice)} đ`}</span>;
			}
		},
		{
			title: "Người phụ trách",
			dataIndex: "order_employee",
			key: "order_employee",
			render: (order_employee: string, record: any, index: number) => {
				return <span>{order_employee}</span>;
			}
		},
		{
			title: "Thời gian",
			dataIndex: "order_time",
			key: "order_time",
			render: (order_time: string, record: any, index: number) => {
				return <span>{order_time}</span>;
			}
		}
	];
};

export const mainFilter = [
	{ label: "Năm trước", value: 1 },
	{ label: "Năm nay", value: 2 },
	{ label: "Năm sau", value: 3 }
];

export const subFilter = [
	{ label: "Hôm nay", value: 1 },
	{ label: "Tuần này", value: 2 },
	{ label: "Tháng này", value: 3 },
	{ label: "Năm nay", value: 4 }
];
export const dataSource = [
	{
		store_location_id: "CH003",
		product: "iPhone 13 Pro Max",
		amount: "19"
	},
	{
		store_location_id: "CH004",
		product: "Samsung S22",
		amount: "35"
	},
	{
		store_location_id: "CH005",
		product: "iPhone 12 Pro Max",
		amount: "52"
	},
	{
		store_location_id: "CH006",
		product: "Oppo Reno 7",
		amount: "2"
	},
	{
		store_location_id: "CH001",
		product: "Latop MSI-Z99",
		amount: "5"
	},
	{
		store_location_id: "CH009",
		product: "iPhone 10",
		amount: "15"
	},
	{
		store_location_id: "CH011",
		product: "iPhone 13 Pro Max",
		amount: "11"
	},
	{
		store_location_id: "CH023",
		product: "iPhone 13 Pro Max",
		amount: "19"
	},
	{
		store_location_id: "CH014",
		product: "Samsung S22",
		amount: "35"
	},
	{
		store_location_id: "CH015",
		product: "iPhone 12 Pro Max",
		amount: "52"
	}
];

export const dataSourceRight = [
	{
		order_id: 1,
		order_code: 30000953,

		order_status: "A",
		order_totalPrice: 12000000,
		order_employee: "Nguyễn Thị Mỹ Hạnh Phúc",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 2,
		order_code: 30000954,

		order_status: "B",
		order_totalPrice: 20000000,
		order_employee: "Nguyễn Thị Anh",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 3,
		order_code: 30000955,

		order_status: "C",
		order_totalPrice: 51000000,
		order_employee: "Trần Kiều Ân",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 4,
		order_code: 30000956,

		order_status: "D",
		order_totalPrice: 3000000,
		order_employee: "Nguyễn Thị My",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 5,
		order_code: 30000957,

		order_status: "E",
		order_totalPrice: 19000000,
		order_employee: "Bùi Tuấn Tú",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 6,
		order_code: 30000958,

		order_status: "F",
		order_totalPrice: 9000000,
		order_employee: "Lại Là Ân",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 7,
		order_code: 30000959,

		order_status: "G",
		order_totalPrice: 18000000,
		order_employee: "Ân Nữa Nè",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 8,
		order_code: 30000960,
		order_status: "H",
		order_totalPrice: 12000000,
		order_employee: "Nguyễn Thị Mỹ Hạnh Phúc",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 9,
		order_code: 30000961,

		order_status: "A",
		order_totalPrice: 12000000,
		order_employee: "Nguyễn Thị Mỹ Hạnh Phúc",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	},
	{
		order_id: 10,
		order_code: 30000962,

		order_status: "B",
		order_totalPrice: 12000000,
		order_employee: "Nguyễn Thị Mỹ Hạnh Phúc",
		order_time: moment(new Date()).format("HH:mm DD-MM-YYYY")
	}
];
