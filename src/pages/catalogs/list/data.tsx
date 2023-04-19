import { Switch } from "antd";
import { Link } from "react-router-dom";
import { SortableHandle } from "react-sortable-hoc";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgLock from "src/assets/svg/SvgLock";
import SvgSixDots from "src/assets/svg/SvgSixDots";
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
const DragHandle = SortableHandle(({ active }: any) => <SvgSixDots style={{ transform: "scale(0.7)" }} />);
export const columnsData = ({ editRecord, editStatus, features }: any) => {
	return [
		{
			title: "",
			dataIndex: "id",
			key: "id",
			width: "4%",
			align: "center",

			render: (index: string, record: any, i: number) => (
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<DragHandle />{" "}
				</div>
			)
		},
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__CATALOGS__VIEW_DETAIL") ? (
					<div onClick={() => editRecord(record)} style={{ color: "#40BAFF", cursor: "pointer" }}>
						{id}
					</div>
				) : (
					<div>{id}</div>
				);
			}
		},
		{
			title: "Tên ngành hàng",
			dataIndex: "catalog_name",
			key: "catalog_name",
			render: (catalog_name: string, record: any, index: number) => {
				return <div>{catalog_name}</div>;
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
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch
							checked={status}
							disabled={!features.includes("MODULE_PRODUCTS__CATALOGS__UPDATE")}
							onChange={(e: any) => editStatus(e, record)}
						/>
					</div>
				);
			}
		}
	];
};
