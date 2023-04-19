import { Switch } from "antd";
import { Link } from "react-router-dom";
import routerNames from "src/utils/data/routerName";
import { getAddressString } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ changeStatus, editRecord }: any) => {
	return [
		{
			title: "ID",
			dataIndex: "user_id",
			key: "user_id",
			render: (user_id: string, record: any, index: number) => {
				return <div>{user_id}</div>;
			}
		},
		{
			title: "Tên",
			dataIndex: "fullname",
			key: "fullname",
			render: (fullname: string, record: any, index: number) => {
				return <div>{fullname}</div>;
			}
		},

		{
			title: "Vai trò",
			dataIndex: "role_name",
			key: "role_name",
			render: (role_name: string, record: any, index: number) => {
				return <div>{role_name}</div>;
			}
		},
		{
			title: "SĐT",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record: any, index: number) => {
				return <div>{phone}</div>;
			}
		},

		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (email: string, record: any, index: number) => {
				return <div>{email}</div>;
			}
		},

		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						<Switch checked={status} onChange={(e: any) => changeStatus(e, record)} />
					</div>
				);
			}
		}
	];
};
