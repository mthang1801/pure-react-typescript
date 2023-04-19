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

export const columnsData = ({ editRecord, editStatus }: any) => {
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id: string, record: any, index: number) => {
				return (
					<div onClick={() => editRecord(record)} style={{ color: "#40BAFF", cursor: "pointer" }}>
						{id}
					</div>
				);
			}
		},
		{
			title: "Interval",
			dataIndex: "scheduler_interval",
			key: "scheduler_interval",
			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{scheduler_interval}</div>;
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
			render: (status: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch checked={status} onChange={(e: any) => editStatus(e, record)} />
					</div>
				);
			}
		}
	];
};
