/* eslint-disable */
import { Switch, Popconfirm, Image } from "antd";
import moment from "moment";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import routerNames from "src/utils/data/routerName";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import colors from "src/utils/colors";
import infinity from "src/assets/images/infinity.png";
import { convertNumberWithCommas, convertNumberWithDot } from "src/utils/helpers/functions/textUtils";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
export const columnsData = ({ handleChangeStatus }: any) => {
	return [
		{
			title: "Mã",
			dataIndex: "program_code",
			key: "program_code",
			render: (program_code: string, record: any, index: number) => {
				return <Link to={`sale-manage/edit/${record.id}`}>{program_code}</Link>;
			}
		},
		{
			title: "Tên đợt phát hành",
			dataIndex: "program_name",
			key: "program_name",
			render: (program_name: string, record: any, index: number) => <span>{program_name}</span>
		},
		{
			title: "Thời gian bắt đầu",
			dataIndex: "start_date",
			key: "start_date",
			render: (start_date: any, record: any, index: number) => (
				<span>{start_date ? ISO8601Formats(start_date) : "-"}</span>
			)
		},
		{
			title: "Thời gian kết thúc",
			dataIndex: "end_date",
			key: "end_date",
			render: (end_date: any, record: any, index: number) => <span>{end_date ? ISO8601Formats(end_date) : "-"}</span>
		},

		{
			title: "Còn lại",
			dataIndex: "remaining_use_quantity",
			key: "remaining_use_quantity",
			align: "right",

			render: (remaining_use_quantity: string, record: any, index: number) => (
				<span>
					{record?.max_use_quantity ? (
						remaining_use_quantity ? (
							convertNumberWithDot(remaining_use_quantity)
						) : (
							0
						)
					) : (
						<Image src={infinity} alt="" width="20px" height="20px" placeholder={false} preview={false} />
					)}
				</span>
			)
		},
		{
			title: "Tổng giá trị KM",
			dataIndex: "total_promotion_price",
			key: "total_promotion_price",
			align: "right",
			render: (total_promotion_price: string, record: any, index: number) => (
				<span>{total_promotion_price ? convertNumberWithCommas(total_promotion_price) : 0}</span>
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
