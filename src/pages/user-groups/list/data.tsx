/* eslint-disable */
import { Switch, Popconfirm } from "antd";
import moment from "moment";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import routerNames from "src/utils/data/routerName";
import { typePropsColumn } from "./interfaces";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import colors from "src/utils/colors";
export const columnsData = ({ btnOpenModal, handleChangeReasonStatus, openRecord, roles }: any) => {
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (text: string, record: any, index: number) => {
				return (
					<span style={{ color: colors?.accent_color_5_2, cursor: "pointer" }} onClick={() => openRecord(record)}>
						{text}
					</span>
				);
			}
		},
		{
			title: "Tên nhóm",
			dataIndex: "role_name",
			key: "role_name",
			render: (text: string, record: any, index: number) => <span className="text-neutral_color_1_2">{text}</span>
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
			)
		},
		{
			title: "Ngày cập nhật cuối",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">{moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")}</span>
			)
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch
							checked={status}
							onChange={() => handleChangeReasonStatus(record)}
							// disabled={roles.find((x: any) => x === "update-user-group") ? false : true}
						/>
					</div>
				);
			}
		},

		{
			title: "Thiết lập",
			dataIndex: "action",
			key: "action",
			align: "center",
			render: (action: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.USER_GROUPS}/${record.id}`,
								state: record
							})}
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
						>
							<SvgConfig style={{ transform: "scale(0.8)" }} fill="rgb(212,212,212)" />
						</Link>
					</div>
				);
			}
		}
	];
};
const content = (props: typePropsColumn, record: any) => (
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
