/* eslint-disable */
import { Switch, Popconfirm } from "antd";
import moment from "moment";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import routerNames from "src/utils/data/routerName";
import { typePropsColumn } from "./interfaces";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import colors from "src/utils/colors";
import { getAddressString } from "src/utils/helpers/functions/textUtils";
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
			title: "Tên người dùng",
			dataIndex: "fullname",
			key: "fullname",
			render: (fullname: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">{fullname}</span>
			)
		},
		{
			title: "SĐT",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record: any, index: number) => <a href={`tel:${record?.phone}`}>{record?.phone}</a>
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (email: string, record: any, index: number) => <span className="text-neutral_color_1_2">{email}</span>
		},
		{
			title: "Vai trò",
			dataIndex: "role_name",
			key: "role_name",
			render: (role_name: string, record: any, index: number) => <span>{record?.userRole?.role?.role_name}</span>
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">
					{createdAt ? moment(createdAt).format("DD/MM/YYYY HH:mm:ss") : "-"}
				</span>
			)
		},
		{
			title: "Ngày đăng nhập cuối",
			dataIndex: "last_login_at",
			key: "last_login_at",
			render: (last_login_at: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">
					{last_login_at ? moment(last_login_at).format("DD/MM/YYYY HH:mm:ss") : "-"}
				</span>
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
		}
	];
};

export const columnsData2 = ({ btnOpenModal, handleChangeReasonStatus, openRecord, roles }: any) => {
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
			title: "Seller",
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => <span>{record?.seller?.seller_name}</span>
		},
		{
			title: "Tên người dùng",
			dataIndex: "fullname",
			key: "fullname",
			render: (fullname: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">{fullname}</span>
			)
		},
		{
			title: "SĐT",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record: any, index: number) => <a href={`tel:${record?.phone}`}>{record?.phone}</a>
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (email: string, record: any, index: number) => <span className="text-neutral_color_1_2">{email}</span>
		},

		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">
					{createdAt ? moment(createdAt).format("DD/MM/YYYY HH:mm:ss") : "-"}
				</span>
			)
		},
		{
			title: "Ngày đăng nhập cuối",
			dataIndex: "last_login_at",
			key: "last_login_at",
			render: (last_login_at: string, record: any, index: number) => (
				<span className="text-neutral_color_1_2">
					{last_login_at ? moment(last_login_at).format("DD/MM/YYYY HH:mm:ss") : "-"}
				</span>
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
		}
	];
};

export const columnsDataWarehouse = ({ handleChangeStatusWarehouse }: any) => {
	return [
		{
			title: "Tên kho",
			dataIndex: "warehouse_name",
			key: "warehouse_name",
			render: (warehouse_name: string, record: any, index: number) => {
				return <span>{warehouse_name}</span>;
			}
		},
		{
			title: "Địa chỉ",
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => (
				<span>
					{getAddressString(record?.address, record?.ward_name, record?.district_name, record?.province_name)}
				</span>
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
							onChange={(e: any) => handleChangeStatusWarehouse(record, e)}
							// disabled={roles.find((x: any) => x === "update-user-group") ? false : true}
						/>
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
