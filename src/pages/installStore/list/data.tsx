import { Switch } from "antd";
import { Link } from "react-router-dom";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertDatetime, convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ features }: any) => {
	return [
		{
			title: "Mã",
			dataIndex: "id",
			key: "id",
			render: (id: string, record: any, index: number) => {
				return !features.includes("MODULE_PRODUCTS__INSTALLSTORE__VIEW_DETAIL") ? (
					<div>{id}</div>
				) : (
					<Link
						to={(location) => ({
							...location,
							pathname: `${routerNames.INSTALL_STORE_EDIT}/${record?.id}`
						})}
						style={{ color: "#40BAFF", cursor: "pointer" }}
					>
						{id}
					</Link>
				);
			}
		},
		{
			title: "Nhà cung cấp",
			dataIndex: "supplier",
			key: "supplier",
			render: (supplier: any, record: any, index: number) => {
				return <div>{supplier?.supplier_name}</div>;
			}
		},

		{
			title: "Tổng tiền (vnđ)",
			dataIndex: "total_amount",
			key: "total_amount",
			align: "right",
			render: (total_amount: string, record: any, index: number) => {
				return <div>{total_amount && convertNumberWithCommas(total_amount)}</div>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "transaction_status",
			key: "transaction_status",
			align: "center",
			render: (transaction_status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						{transaction_status === 1 ? (
							<div className="completeStatus" style={{ background: "rgb(0,117,164)" }}>
								Đang giao dịch
							</div>
						) : (
							<div className="completeStatus">Đã hoàn thành</div>
						)}
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
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						{payment_status === 1 ? (
							<div className="uncompleteStatus">Chưa thanh toán</div>
						) : (
							<div className="completeStatus">Đã thanh toán</div>
						)}
					</div>
				);
			}
		},
		{
			title: "Trạng thái nhập kho",
			dataIndex: "input_status",
			key: "input_status",
			align: "center",
			render: (input_status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						{input_status === 1 ? (
							<div className="uncompleteStatus">Chưa nhập kho</div>
						) : (
							<div className="completeStatus">Đã nhập kho</div>
						)}
					</div>
				);
			}
		},
		{
			title: "Người nhập",
			dataIndex: "input_by",
			key: "input_by",
			render: (input_by: string, record: any, index: number) => {
				return <div>{input_by}</div>;
			}
		},
		{
			title: "Ngày tạo phiếu",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date, record: any, index: number) => {
				return <div>{ISO8601Formats(createdAt)}</div>;
			}
		}
	];
};

export const data = [
	{
		code: "1",
		supplier: "Chổi chà nhà làm",
		total: "800000",
		status: "A",
		statusPayment: "A",
		statusImport: "A",
		importBy: "Admin",
		importAt: "12/12/2022 12:12:12"
	}
];
