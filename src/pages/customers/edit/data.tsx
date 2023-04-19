import { Tag } from "antd";
import { Link } from "react-router-dom";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertDatetime, convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

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
			title: "Mã đơn hàng",
			dataIndex: "order_code",
			key: "order_code",
			render: (order_code: string, record: any, index: number) => {
				return (
					<Link
						to={(location) => ({
							...location,
							pathname: `${routerNames.ORDERS_EDIT}/${record?.id}`
						})}
						style={{ color: "#40BAFF", cursor: "pointer" }}
					>
						{order_code}
					</Link>
				);
			}
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: any, record: any, index: number) => {
				return <div>{createdAt ? ISO8601Formats(createdAt) : "-"}</div>;
			}
		},
		{
			title: "SL sản phẩm",
			dataIndex: "total_quantity",
			key: "total_quantity",
			align: "right",
			render: (total_quantity: string, record: any, index: number) => {
				return <div>{total_quantity}</div>;
			}
		},

		{
			title: "Tổng tiền",
			dataIndex: "final_total_money_amount",
			key: "final_total_money_amount",
			align: "right",
			render: (final_total_money_amount: string, record: any, index: number) => {
				return <div>{final_total_money_amount ? convertNumberWithCommas(final_total_money_amount) : "-"}</div>;
			}
		},

		{
			title: "Trạng thái",
			dataIndex: "order_status_name",
			key: "order_status_name",
			align: "center",
			render: (order_status_name: any, record: any, index: number) => {
				return (
					<div
						style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						className={checkColor(record?.order_status_id)}
					>
						{order_status_name}
					</div>
				);
			}
		}
	];
};

export const data = [
	{
		code: "100011",
		amount: 5,
		supplier: "Chổi chà nhà làm",
		total: "800000",
		status: "A",
		statusPayment: "1",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	},
	{
		code: "100012",
		amount: 10,
		supplier: "Chổi chà nhà làm",
		total: "12000000",
		status: "A",
		statusPayment: "2",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	},
	{
		code: "100013",
		amount: 3,
		supplier: "Chổi chà nhà làm",
		total: "6300000",
		status: "A",
		statusPayment: "2",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	},
	{
		code: "100014",
		amount: 1,
		supplier: "Chổi chà nhà làm",
		total: "42500000",
		status: "A",
		statusPayment: "2",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	},
	{
		code: "100015",
		amount: 4,
		supplier: "Chổi chà nhà làm",
		total: "800000",
		status: "A",
		statusPayment: "2",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	}
];

export const defaultValues = {
	customer: null,
	openTransportModal: false,
	currentTransport: null,
	defaultFormNo: 0,
	transportFormsList: [],
	isEdit: false
};
