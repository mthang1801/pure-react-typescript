import { Switch } from "antd";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgLock from "src/assets/svg/SvgLock";
import SvgUnLock from "src/assets/svg/SvgUnLock";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertDatetime } from "src/utils/helpers/functions/textUtils";

export const dataPlatform = [
	{
		id: 1,
		seller: "Cửa hàng Gấu Bông Béo",
		platform: "Lazada",
		status: "A",
		statusLock: "D",
		lockedBy: "Admin",
		created_at: "02/08/2022 14:56",
		updated_at: "02/08/2022 14:56"
	},
	{
		id: 2,
		seller: "Cửa hàng Gấu Bông Béo",
		platform: "Lazada",
		status: "D",
		statusLock: "A",
		lockedBy: "",
		created_at: "02/08/2022 14:56",
		updated_at: "02/08/2022 14:56"
	},
	{
		id: 3,
		seller: "Cửa hàng Gấu Bông Béo",
		platform: "Lazada",
		status: "A",
		statusLock: "D",
		lockedBy: "Admin",
		created_at: "02/08/2022 14:56",
		updated_at: "02/08/2022 14:56"
	},
	{
		id: 4,
		seller: "Cửa hàng Gấu Bông Béo",
		platform: "Lazada",
		status: "A",
		statusLock: "A",
		lockedBy: "",
		created_at: "02/08/2022 14:56",
		updated_at: "02/08/2022 14:56"
	},
	{
		id: 5,
		seller: "Cửa hàng Gấu Bông Béo",
		platform: "Lazada",
		status: "D",
		statusLock: "A",
		lockedBy: "",
		created_at: "02/08/2022 14:56",
		updated_at: "02/08/2022 14:56"
	}
];

export const columnsData = ({ onChangeStatus, openEdit }: any) => {
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id: string, record: any, index: number) => {
				return (
					<div onClick={() => openEdit(record)} style={{ color: "#40BAFF", cursor: "pointer" }}>
						{id}
					</div>
				);
			}
		},
		{
			title: "Tên sàn",
			dataIndex: "platform_name",
			key: "platform_name",
			render: (platform_name: string, record: any, index: number) => {
				return <div>{record?.platform?.platform_name}</div>;
			}
		},
		{
			title: "Chức năng",
			dataIndex: "function_name",
			key: "function_name",
			render: (function_name: string, record: any, index: number) => {
				return <div>{record?.data_type?.data_type}</div>;
			}
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			render: (description: string, record: any, index: number) => {
				return <div>{description}</div>;
			}
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date, record: any, index: number) => {
				return <div>{ISO8601Formats(createdAt)}</div>;
			}
		},
		{
			title: "Ngày cập nhật",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: Date, record: any, index: number) => {
				return <div>{ISO8601Formats(updatedAt)}</div>;
			}
		},

		{
			title: "TT hoạt động",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch checked={record?.status} onChange={(checked) => onChangeStatus(record, checked)} />
					</div>
				);
			}
		}
	];
};
