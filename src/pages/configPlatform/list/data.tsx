import { Popover, Switch } from "antd";
import { Link } from "react-router-dom";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgIconThreedot2 from "src/assets/svg/SvgIconThreedot2";
import SvgIconThreedot3 from "src/assets/svg/SvgIconThreedot3";
import SvgIconThreedot4 from "src/assets/svg/SvgIconThreedot4";
import SvgLock from "src/assets/svg/SvgLock";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";
import SvgSetting from "src/assets/svg/SvgSetting";
import SvgSuppliers from "src/assets/svg/SvgSuppliers";
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

export const columnsData = ({ openConnect, onChangeStatus }: any) => {
	return [
		{
			title: "eCom platform",
			dataIndex: "platform_name",
			key: "platform_name",
			render: (platform_name: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center" }}>
						{record?.platform?.platform_name}&nbsp;&nbsp;
						<SvgPaymentComplete style={{ transform: "scale(0.7)" }} />
					</div>
				);
			}
		},

		{
			title: "Người khoá",
			dataIndex: "locked_by",
			key: "locked_by",
			render: (locked_by: string, record: any, index: number) => {
				return record?.locked ? <div>{locked_by}</div> : <div>-</div>;
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
			title: "Trạng thái khoá",
			dataIndex: "locked",
			key: "locked",
			align: "center",

			render: (text: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch
							onChange={(e: any) => onChangeStatus(e, record, 1)}
							checked={record?.locked}
							checkedChildren={<SvgUnLock style={{ transform: "scale(0.4)" }} fill={colors.neutral_color_1_1} />}
							unCheckedChildren={<SvgLock style={{ transform: "scale(0.4)" }} fill={colors.neutral_color_1_3} />}
						/>
					</div>
				);
			}
		},
		{
			title: "TT hoạt động",
			dataIndex: "user_id",
			key: "user_id",
			align: "center",
			render: (text: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch
							disabled={!record?.locked}
							checked={record?.status}
							onChange={(e: any) => onChangeStatus(e, record, 2)}
						/>
					</div>
				);
			}
		},
		{
			title: "Thao tác",
			dataIndex: "user_id",
			key: "user_id",
			align: "center",

			render: (text: string, record: any, index: number) => {
				return (
					<>
						<Popover content={() => content({ record, openConnect })} style={{ width: "300px" }}>
							<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
								<SvgIconThreedot4 style={{ transform: "scale(1.4)" }} />
							</div>
						</Popover>
					</>
				);
			}
		}
	];
};

const content = ({ record, openConnect }: any) => {
	return (
		<div style={{ padding: "16px" }}>
			<Link
				to={`${routerNames.PLATFORM_EDIT}/${record.platform_id}`}
				style={{ color: "#000", display: "flex", alignItems: "center" }}
			>
				{" "}
				<SvgConfig style={{ transform: "scale(0.7)" }} />
				&nbsp;Thiết lập
			</Link>
			<div
				onClick={() => {
					if (record.status) {
						openConnect();
					}
				}}
				style={{
					cursor: record.status ? "pointer" : "not-allowed",
					marginTop: "8px",
					display: "flex",
					alignItems: "center"
				}}
			>
				<SvgSuppliers style={{ transform: "scale(0.7)" }} />
				&nbsp;Kết nối
			</div>
		</div>
	);
};
