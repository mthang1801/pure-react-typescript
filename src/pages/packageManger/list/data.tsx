/* eslint-disable */
import { Switch, Popconfirm } from "antd";
import moment from "moment";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import routerNames from "src/utils/data/routerName";
import { typePropsColumn } from "./interfaces";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import colors from "src/utils/colors";
import {
	convertNumberWithCommas,
	convertNumberWithDot,
	convertNumberWithDotChange
} from "src/utils/helpers/functions/textUtils";
export const columnsData = ({ handleChangeStatus }: any) => {
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id: string, record: any, index: number) => {
				return <span>{id}</span>;
			}
		},
		{
			title: "Gói dịch vụ",
			dataIndex: "service_name",
			key: "service_name",
			render: (service_name: string, record: any, index: number) => <span>{service_name}</span>
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			render: (description: string, record: any, index: number) => <span>{description}</span>
		},
		{
			title: "Giá dịch vụ",
			dataIndex: "price",
			key: "price",
			align: "right",
			render: (price: string, record: any, index: number) => <span>{convertNumberWithCommas(price)}</span>
		},
		{
			title: "SL Seller đang sử dụng",
			dataIndex: "number_users_using",
			key: "number_users_using",
			align: "right",
			render: (number_users_using: string, record: any, index: number) => (
				<span>{number_users_using && convertNumberWithDotChange(number_users_using)}</span>
			)
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",

			render: (status: any, record: any, index: number) => (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Switch
						checked={status}
						onChange={() => handleChangeStatus(record)}
						// disabled={roles.find((x: any) => x === "update-user-group") ? false : true}
					/>
				</div>
			)
		},

		{
			title: "Thiết lập",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Link to={`/packages/edit/${record.id}`} className="borderIcon">
							<SvgConfig />
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
