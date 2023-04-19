/* eslint-disable */
import { Switch, Popconfirm } from "antd";
import moment from "moment";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import routerNames from "src/utils/data/routerName";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import colors from "src/utils/colors";
import { convertNumberWithCommas, convertNumberWithDot } from "src/utils/helpers/functions/textUtils";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
export const columnsData = ({ handleChangeStatus }: any) => {
	return [
		{
			title: "Mã",
			dataIndex: "coupon_code",
			key: "coupon_code",
			render: (coupon_code: string, record: any, index: number) => {
				return <Link to={`coupon/edit/${record.id}`}>{coupon_code}</Link>;
			}
		},
		{
			title: "Tên đợt phát hành",
			dataIndex: "coupon_name",
			key: "coupon_name",
			render: (coupon_name: string, record: any, index: number) => <span>{coupon_name}</span>
		},
		{
			title: "Thời gian bắt đầu",
			dataIndex: "start_at",
			key: "start_at",
			render: (start_at: any, record: any, index: number) => <span>{start_at ? ISO8601Formats(start_at) : "-"}</span>
		},
		{
			title: "Thời gian kết thúc",
			dataIndex: "end_at",
			key: "end_at",
			render: (end_at: any, record: any, index: number) => <span>{end_at ? ISO8601Formats(end_at) : "-"}</span>
		},
		{
			title: "Số lượng mã",
			dataIndex: "number_of_codes",
			key: "number_of_codes",
			align: "right",
			render: (number_of_codes: string, record: any, index: number) => (
				<span>{number_of_codes ? convertNumberWithDot(number_of_codes) : "-"}</span>
			)
		},
		{
			title: "Giá trị KM",
			dataIndex: "discount_amount",
			key: "discount_amount",
			align: "right",
			render: (discount_amount: string, record: any, index: number) => (
				<span>
					{discount_amount ? convertNumberWithCommas(discount_amount) : "-"}
					{record?.discount_type === 1 && "%"}
				</span>
			)
		},
		{
			title: "Tối đa",
			dataIndex: "max_discount_amount",
			key: "max_discount_amount",
			align: "right",
			render: (max_discount_amount: string, record: any, index: number) => (
				<span>{max_discount_amount ? convertNumberWithDot(max_discount_amount) : max_discount_amount}</span>
			)
		},
		{
			title: "Tổng giá trị KM",
			dataIndex: "total_discount_amount",
			key: "total_discount_amount",
			align: "right",
			render: (total_discount_amount: string, record: any, index: number) => (
				<span>{total_discount_amount ? convertNumberWithDot(total_discount_amount) : total_discount_amount}</span>
			)
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",

			render: (status: any, record: any, index: number) => (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#fff",
						height: "22px",
						padding: "4px 9px",
						borderRadius: "16px",
						background:
							status === 1
								? "rgb(64,192,118)"
								: status === 2
								? "rgb(47,129,174)"
								: status === 3
								? "rgb(139,107,39)"
								: "rgb(128,138,148)"
					}}
				>
					{status === 1 ? "Chưa kích hoạt" : status === 2 ? "Hoạt động" : status === 3 ? "Tạm dừng" : "Ngừng hoạt động"}
				</div>
			)
		}

		// {
		// 	title: "Thiết lập",
		// 	dataIndex: "status",
		// 	key: "status",
		// 	align: "center",
		// 	render: (status: any, record: any, index: number) => {
		// 		return (
		// 			<div style={{ display: "flex", justifyContent: "center" }}>
		// 				<Link to={`/packages/edit/${record.id}`} className="borderIcon">
		// 					<SvgConfig />
		// 				</Link>
		// 			</div>
		// 		);
		// 	}
		// }
	];
};
const content = (props: any, record: any) => (
	<div className="px-1" style={{ width: 200 }}>
		{/* <button
      onClick={() => props.btnOpenUpdatePassword(record)}
      className='flex items-center justify-start my-1'>
      <DIcon icon="lock" />
      <p className='text-14 px-2'>Đổi mật khẩu</p>
    </button> */}
		<button onClick={() => props.btnOpenModal(record)} className="flex items-center justify-start my-1">
			<SvgIconEdit style={{ transform: "scale(0.8)" }} />
			<p className="text-14 px-2">Chỉnh sửa</p>
		</button>
	</div>
);

export const selectOptions = {
	name: "name",
	value: "value"
};

export const dataOptionsOnline = [
	{ name: "Hiển thị", value: "A" },
	{ name: "Ẩn", value: "D" }
];

export const defaultFilter = {
	status: undefined,
	q: "",
	currentPage: 1,
	sizePage: 10,
	isDispatch: false
};

export const dataDefault = [
	{
		id: "QL00000001",
		roles_name: "Admin",
		created_at: 1651167240000,
		updated_at: 1651167240000,
		status: "A"
	},
	{
		id: "QL00000002",
		roles_name: "Care hàng",
		created_at: 1651167240000,
		updated_at: 1651167240000,
		status: "A"
	}
];
