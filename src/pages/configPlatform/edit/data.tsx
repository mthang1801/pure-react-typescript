import { Switch } from "antd";
import SvgConfig from "src/assets/svg/SvgConfig";
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

export const columnsData = ({ openModalConfigCallback, handleChangeStatus }: any) => {
	return [
		{
			title: "STT",
			dataIndex: "seller",
			key: "seller",
			render: (seller: string, record: any, index: number) => {
				return <div>{index + 1}</div>;
			}
		},
		{
			title: "Loại dữ liệu",
			dataIndex: "data_type",
			key: "data_type",
			render: (data_type: string, record: any, index: number) => {
				return <div>{record?.cron_function?.data_type?.data_type}</div>;
			}
		},
		{
			title: "Trạng thái hoạt động",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						{status ? <div className="statusA">Hoạt động</div> : <div className="statusD">Ngừng hoạt động</div>}
					</div>
				);
			}
		},
		{
			title: "Thời gian chạy/lần",
			dataIndex: "description",
			key: "description",
			render: (description: string, record: any, index: number) => {
				return <div>{record?.scheduler?.description}</div>;
			}
		},
		{
			title: "Ngày bắt đầu chạy",
			dataIndex: "start_at",
			key: "start_at",
			render: (start_at: any, record: any, index: number) => {
				return <div>{ISO8601Formats(start_at)}</div>;
			}
		},
		{
			title: "Ngày chạy mới nhất",
			dataIndex: "last_run_at",
			key: "last_run_at",
			render: (last_run_at: any, record: any, index: number) => {
				return <div>{last_run_at ? ISO8601Formats(last_run_at) : "-"}</div>;
			}
		},
		{
			title: "Ngày ngừng hoạt động",
			dataIndex: "stop_at",
			key: "stop_at",
			render: (stop_at: any, record: any, index: number) => {
				return <div>{ISO8601Formats(stop_at)}</div>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",

			render: (status: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch checked={record?.status} onChange={(e: any) => handleChangeStatus(e, record)} />
					</div>
				);
			}
		},

		{
			title: "Thiết lập",
			dataIndex: "user_id",
			key: "user_id",
			align: "center",

			render: (text: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<div className="borderIcon" onClick={() => openModalConfigCallback(record)}>
							<SvgConfig />
						</div>
					</div>
				);
			}
		}
	];
};
