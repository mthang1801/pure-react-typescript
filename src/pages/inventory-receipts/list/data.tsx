import { Switch } from "antd";
import { Link } from "react-router-dom";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgIconEdit from "src/assets/svg/SvgIconEdit";
import {
	AttributeFilterTypeEnum,
	AttributeFilterTypeVietnameseEnum,
	AttributePurposeEnum,
	AttributePurposeVietnameseEnum,
	AttributeTypeEnum,
	AttributeTypeVietnameseEnum
} from "src/constants/enum";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { getKeyByValue } from "src/utils/helpers/functions/utils";

export const columnsData = ({ features }: any) => {
	return [
		{
			title: "Mã phiếu",
			dataIndex: "id",
			key: "id",
			render: (id: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__CHECK__VIEW_DETAIL") ? (
					<Link
						to={() => ({
							pathname: `${routerNames.INVENTORY_RECEIPTS_EDIT}/${record?.id}`
						})}
					>
						{record?.id}
					</Link>
				) : (
					<div>{record?.id}</div>
				);
			}
		},
		{
			title: "Kho hàng",
			dataIndex: "id",
			key: "id",
			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{record?.warehouse?.warehouse_name}</div>;
			}
		},

		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						{status === 1 ? (
							<div className="processStatus">Đang kiểm hàng</div>
						) : status === 2 ? (
							<div className="completeStatus">Đã kiểm hàng</div>
						) : (
							<div className="cancelStatus">Đã hủy</div>
						)}
					</div>
				);
			}
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: any, record: any, index: number) => {
				return <div>{createdAt ? ISO8601Formats(createdAt) : "-"}</div>;
			}
		},
		{
			title: "Ngày kiểm",
			dataIndex: "inventory_at",
			key: "inventory_at",
			render: (inventory_at: any, record: any, index: number) => {
				return <div>{inventory_at ? ISO8601Formats(inventory_at) : "-"}</div>;
			}
		},
		{
			title: "Ngày cân bằng",
			dataIndex: "balance_at",
			key: "balance_at",
			render: (balance_at: any, record: any, index: number) => {
				return <div>{balance_at ? ISO8601Formats(balance_at) : "-"}</div>;
			}
		},
		{
			title: "Ghi chú",
			dataIndex: "note",
			key: "note",
			render: (note: string, record: any, index: number) => {
				return <div>{note ? note : "-"}</div>;
			}
		}
	];
};

export const attributesListColumns = (props: any) => {
	const { onChangeStatus } = props;
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			render: (id: any, record: any, index: number) => {
				return (
					<div style={{ textAlign: "center" }}>
						<Link
							to={(location) => ({
								...location,
								pathname: `${routerNames.FEATURES_EDIT}/${record.id}`,
								state: record
							})}
						>
							{id}
						</Link>
					</div>
				);
			}
		},
		{
			title: "Tên thuộc tính",
			dataIndex: "attribute_name",
			key: "attribute_name"
		},
		{
			title: "Mã thuộc tính",
			dataIndex: "attribute_code",
			key: "attribute_code",
			width: "calc(20% - 30px)",
			render: (attribute_code: boolean, record: any, index: number) => {
				return <div>{attribute_code}</div>;
			}
		},
		{
			title: "Loại thuộc tính",
			dataIndex: "attribute_type",
			key: "attribute_type",
			render: (attribute_type: string) => <div>{getKeyByValue(AttributeTypeVietnameseEnum, attribute_type)}</div>
		},
		{
			title: "Kiểu filter",
			dataIndex: "filter_type",
			key: "filter_type",
			render: (filter_type: string) => <div>{getKeyByValue(AttributeFilterTypeVietnameseEnum, filter_type)}</div>
		},
		{
			title: "Danh mục",
			dataIndex: "purposes",
			key: "purposes",
			render: (purposes: string) => <div></div>
		},

		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch defaultChecked={status} onChange={(checked) => onChangeStatus(record.id, checked)} />
					</div>
				);
			}
		}
	];
};
