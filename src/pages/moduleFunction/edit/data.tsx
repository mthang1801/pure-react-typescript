import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Popover, Row, Switch, Table, TableColumnsType } from "antd";
import { SortableHandle } from "react-sortable-hoc";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgSixDots from "src/assets/svg/SvgSixDots";
import DIcon from "src/components/icons/DIcon";
import { API_URL_CDN } from "src/services/api/config";
import { ISO8601Formats } from "src/utils/helpers/functions/date";

interface DataType {
	key: React.Key;
	name: string;
	platform: string;
	version: string;
	upgradeNum: number;
	creator: string;
	createdAt: string;
}

interface ExpandedDataType {
	key: React.Key;
	funct_name: string;
	funct_code: string;
	api_route: string;
	ui_route: string;
	ui_icon: string;
	status: boolean;
}

const DragHandle = SortableHandle(({ active }: any) => <SvgSixDots style={{ transform: "scale(0.7)" }} />);

export const columnsData = ({
	onViewFunctDetail,
	onAddActions,
	onOpenImageOverlay,
	handleChangeStatusWebsite,
	onChangeStatus
}: any) => {
	return [
		{
			title: "",
			dataIndex: "id",
			key: "id",
			width: "4%",
			align: "center",

			render: (index: string, record: any, i: number) =>
				record.level < 2 ? (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<DragHandle />{" "}
					</div>
				) : null
		},

		{
			title: "",
			dataIndex: "",
			key: "",
			width: "4%",
			align: "center"
		},
		Table.EXPAND_COLUMN,
		{
			title: "Display name",
			dataIndex: "funct_name",
			key: "funct_name",
			width: "16%",
			render: (funct_name: string, record: any, index: number) => {
				return <div>{funct_name}</div>;
			}
		},
		{
			title: "Function code",
			dataIndex: "funct_code",
			key: "funct_code",
			width: "14%",
			render: (funct_code: string, record: any, index: number) => {
				return <div>{funct_code}</div>;
			}
		},
		{
			title: "API Route",
			dataIndex: "api_route",
			key: "api_route",
			width: "14%",
			render: (api_route: string, record: any, index: number) => {
				return <div>{api_route}</div>;
			}
		},
		{
			title: "UI Web Route",
			dataIndex: "ui_route",
			key: "ui_route",
			width: "15%",
			render: (ui_route: string, record: any, index: number) => {
				return <div>{ui_route}</div>;
			}
		},
		{
			title: "UI Mobile Route",
			dataIndex: "ui_route",
			key: "ui_route",
			width: "15%",
			render: (ui_route: string, record: any, index: number) => {
				return <div>{ui_route}</div>;
			}
		},
		{
			title: "Icon Web",
			dataIndex: "ui_icon",
			key: "ui_icon",
			width: "5%",
			render: (ui_icon: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "center" }}>
						{ui_icon ? (
							<img
								src={`${API_URL_CDN}/${ui_icon}`}
								style={{ maxWidth: "36px", objectFit: "cover", cursor: "pointer" }}
								onClick={() => onOpenImageOverlay(ui_icon)}
							/>
						) : null}
					</div>
				);
			}
		},
		{
			title: "Icon Mobile",
			dataIndex: "ui_icon",
			key: "ui_icon",
			width: "5%",
			render: (ui_icon: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "center" }}>
						{ui_icon ? (
							<img
								src={`${API_URL_CDN}/${ui_icon}`}
								style={{ maxWidth: "36px", objectFit: "cover", cursor: "pointer" }}
								onClick={() => onOpenImageOverlay(ui_icon)}
							/>
						) : null}
					</div>
				);
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			width: "10%",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch
							checked={status}
							onChange={(value: boolean) => {
								onChangeStatus(record, value);
							}}
						></Switch>
					</div>
				);
			}
		},

		{
			title: "Thiết lập",
			dataIndex: "action",
			key: "action",
			align: "center",
			width: "5%",
			render: (action: string, record: any, index: number) => {
				return (
					<Popover
						placement="left"
						content={
							<div className="moduleFunctions_edit__list__item__popover">
								<div
									onClick={() => onViewFunctDetail(record)}
									className="moduleFunctions_edit__list__item__popover__item"
								>
									<EditOutlined />
									<span>Chỉnh sửa</span>
								</div>
								{record.level === 1 && (
									<div onClick={() => onAddActions(record)} className="moduleFunctions_edit__list__item__popover__item">
										<PlusOutlined />
										<span>Thêm action </span>
									</div>
								)}
							</div>
						}
						trigger="click"
					>
						<div style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
							<SvgConfig style={{ transform: "scale(0.7)" }} />
						</div>
					</Popover>
				);
			}
		}
	];
};

export const expandedRowRender = ({ record, onOpenEditActionModal }: any) => {
	const columns: TableColumnsType<ExpandedDataType> = [
		{
			dataIndex: "funct_name",
			key: "funct_name",
			width: "16%",
			render: (funct_name: string, record: any, index: number) => {
				return <div>{funct_name}</div>;
			}
		},
		{
			dataIndex: "funct_code",
			key: "funct_code",
			width: "16%",
			render: (funct_code: string, record: any, index: number) => {
				return <div>{funct_code}</div>;
			}
		},
		{
			dataIndex: "api_route",
			key: "api_route",
			width: "16%",
			render: (api_route: string, record: any, index: number) => {
				return <div>{api_route}</div>;
			}
		},
		{
			dataIndex: "ui_route",
			key: "ui_route",
			width: "16%",
			render: (ui_route: string, record: any, index: number) => {
				return <div>{ui_route}</div>;
			}
		},
		{
			dataIndex: "ui_icon",
			key: "ui_icon",
			width: "5%",
			render: (ui_icon: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "center" }}>
						{ui_icon ? (
							<img src={`${API_URL_CDN}/${ui_icon}`} style={{ maxWidth: "30px", objectFit: "cover" }} />
						) : null}
					</div>
				);
			}
		},
		{
			dataIndex: "status",
			key: "status",
			align: "center",
			width: "5%",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch checked={status}></Switch>
					</div>
				);
			}
		},
		{
			dataIndex: "display_on_website",
			key: "display_on_website",
			align: "center",
			width: "5%",
			render: (display_on_website: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch checked={display_on_website}></Switch>
					</div>
				);
			}
		},
		{
			dataIndex: "createdAt",
			key: "createdAt",
			width: "10%",
			render: (createdAt: Date, record: any, index: number) => {
				return <div style={{ textAlign: "center" }}>{ISO8601Formats(createdAt)}</div>;
			}
		},
		{
			dataIndex: "action",
			key: "action",
			align: "center",
			width: "5.1%",
			render: (action: string, record: any, index: number) => {
				return (
					<Popover
						placement="left"
						content={
							<div className="moduleFunctions_edit__list__item__popover">
								<div
									onClick={() => onOpenEditActionModal(record)}
									className="moduleFunctions_edit__list__item__popover__item"
								>
									<EditOutlined />
									<span>Chỉnh sửa</span>
								</div>
							</div>
						}
						trigger="click"
					>
						<div style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
							<SvgConfig style={{ transform: "scale(0.7)" }} />
						</div>
					</Popover>
				);
			}
		}
	];

	return (
		<Table
			rowKey="index"
			bordered
			columns={[...columns]}
			dataSource={record ? [...record] : []}
			pagination={false}
			showHeader={false}
			style={{ marginLeft: "58px" }}
			sticky={false}
		/>
	);
};

export enum TypeModalEnum {
	"CREATE" = "CREATE",
	"EDIT" = "EDIT"
}
