import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Popover, Switch, Table } from "antd";
import { Link } from "react-router-dom";
import { SortableHandle } from "react-sortable-hoc";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgSixDots from "src/assets/svg/SvgSixDots";
import DIcon from "src/components/icons/DIcon";

import { API_URL_CDN } from "src/services/api/config";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";

const DragHandle = SortableHandle(({ active }: any) => <SvgSixDots style={{ transform: "scale(0.7)" }} />);
export const columnsFunctsData = ({
	onChangeStatus,
	onOpenImageOverlay,
	onViewFunctDetail,
	onOpenModalEdit,
	onOpenModalCreateFunctChild
}: any) => {
	return [
		{
			title: "",
			dataIndex: "id",
			key: "id",
			width: "4%",
			align: "center",

			render: (index: string, record: any, i: number) =>
				record.level === 0 ? (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<DragHandle />{" "}
					</div>
				) : null
		},
		{
			title: "Display name",
			dataIndex: "funct_name",
			key: "funct_name",
			width: "auto",
			render: (funct_name: string, record: any, index: number) => {
				return <div>{funct_name}</div>;
			}
		},

		{
			title: "Functiton code",
			dataIndex: "funct_code",
			key: "funct_code",
			width: "auto",
			render: (funct_code: string, record: any, index: number) => {
				return <div>{funct_code}</div>;
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
				return <div></div>;
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
			width: "10%",
			render: (action: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Popover
							placement="left"
							content={
								<div className="moduleFunctions_edit__list__item__popover">
									<div
										onClick={() => onViewFunctDetail(record)}
										className="moduleFunctions_edit__list__item__popover__item"
									>
										<EyeOutlined />
										<Link
											to={`${routerNames.MODULE_FUNCTIONS_EDIT}/${record.id}`}
											style={{ color: "inherit", marginLeft: "10px" }}
										>
											Xem chi tiết
										</Link>
									</div>
									<div
										onClick={() => onOpenModalEdit(record)}
										className="moduleFunctions_edit__list__item__popover__item"
									>
										<EditOutlined />
										<span>Chỉnh sửa</span>
									</div>
								</div>
							}
							trigger="click"
						>
							<div
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
								<SvgConfig style={{ transform: "scale(0.7)" }} fill="rgb(212,212,212)" />
							</div>
						</Popover>
					</div>
				);
			}
		}
	];
};

export const provincesList = [
	{ label: "Thành phố Cần Thơ", value: 92 },
	{ label: "Thành phố Hồ Chí Minh", value: 79 },
	{ label: "Long An", value: 80 },
	{ label: "Tiền Giang", value: 82 },
	{ label: "Trà Vinh", value: 84 },
	{ label: "An Giang", value: 89 }
];

export const districtsList = [
	{ label: "Quận Ninh Kiều", value: 916 },
	{ label: "Quận Ô Môn", value: 917 },
	{ label: "Quận Bình Thuỷ", value: 918 },
	{ label: "Quận Cái Răng", value: 919 },
	{ label: "Quận Thốt Nốt", value: 923 },
	{ label: "Huyện Vĩnh Thạnh", value: 924 }
];

export const wardsList = [
	{ label: "Phường Xuất Hóa", value: 22733 },
	{ label: "Xã Bằng Thành", value: 22734 },
	{ label: "Xã Nhạn Môn", value: 22735 },
	{ label: "Xã Bộc Bố", value: 22736 },
	{ label: "Xã Công Bằng", value: 22737 },
	{ label: "Xã Giáo Hiệu", value: 22738 }
];
