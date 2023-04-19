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

export const columnsData = ({ changeStatus, features }: any) => {
	return [
		{
			title: "ID",
			dataIndex: "scheduler_id",
			key: "scheduler_id",
			render: (scheduler_id: string, record: any, index: number) => {
				return <div style={{ color: "#40BAFF" }}>{scheduler_id}</div>;
			}
		},
		{
			title: "Features code",
			dataIndex: "scheduler_interval",
			key: "scheduler_interval",
			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{scheduler_interval}</div>;
			}
		},

		{
			title: "Features name",
			dataIndex: "desc",
			key: "desc",
			render: (desc: string, record: any, index: number) => {
				return <div>{desc}</div>;
			}
		},
		{
			title: "Danh mục",
			dataIndex: "created_at",
			key: "created_at",
			render: (created_at: string, record: any, index: number) => {
				return <div>{created_at}</div>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: string, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						<Switch checked={true} onChange={(e: any) => changeStatus(e, record)} />
					</div>
				);
			}
		}
	];
};

export const attributesListColumns = (props: any) => {
	const { onChangeStatus, features } = props;
	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			render: (id: any, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__FEATURES__VIEW_DETAIL") ? (
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
				) : (
					<div style={{ textAlign: "center" }}>{id}</div>
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
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Switch
							disabled={!features.includes("MODULE_PRODUCTS__FEATURES__UPDATE")}
							defaultChecked={status}
							onChange={(checked) => onChangeStatus(record.id, checked)}
						/>
					</div>
				);
			}
		}
	];
};
