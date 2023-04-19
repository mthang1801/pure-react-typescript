import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, InputNumber, Popover, Switch, Table } from "antd";
import { Link } from "react-router-dom";
import { SortableHandle } from "react-sortable-hoc";
import SvgConfig from "src/assets/svg/SvgConfig";
import SvgSixDots from "src/assets/svg/SvgSixDots";
import DIcon from "src/components/icons/DIcon";
import NoImage from "src/assets/images/no-image.jpg";
import { API_URL_CDN } from "src/services/api/config";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";

const DragHandle = SortableHandle(({ active }: any) => <SvgSixDots style={{ transform: "scale(0.7)" }} />);
export const columnsCate = ({ editStatus, changeIndex, arrayIndex, features }: any) => {
	return [
		Table.EXPAND_COLUMN,
		{
			title: "Vị trí",
			dataIndex: "category_index",
			key: "category_index",
			align: "left",
			render: (product_count: string, record: any, index: number) => {
				return (
					<InputNumber
						onChange={(e) => changeIndex(e, record)}
						className="defaultInputNumberLeft"
						defaultValue={record?.category_index}
						min={0}
					/>
				);
			}
		},
		{
			title: "Danh mục",
			dataIndex: "category_name",
			key: "category_name",
			className: "expandCategory",
			render: (category_name: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__CATEGORIES__VIEW_DETAIL") ? (
					<>
						<>
							<Image
								src={record?.category_image ? `${API_URL_CDN}${record?.category_image}` : NoImage}
								alt="category"
								style={{ width: "40px", height: "40px", objectFit: "cover" }}
							/>
							&nbsp;
						</>

						<Link to={`${routerNames.CATEGORIES_EDIT}/${record.category_id}`}>{category_name}</Link>
					</>
				) : (
					<div>
						<>
							<Image
								src={record?.category_image ? `${API_URL_CDN}${record?.category_image}` : NoImage}
								alt="category"
								style={{ width: "40px", height: "40px", objectFit: "cover" }}
							/>
							&nbsp;
						</>
						{category_name}
					</div>
				);
			}
		},

		{
			title: "URL",
			dataIndex: "url",
			key: "url",
			render: (url: string, record: any, index: number) => {
				return <div>{url}</div>;
			}
		},
		{
			title: "Số lượng sản phẩm",
			dataIndex: "product_count",
			key: "product_count",
			align: "right",
			render: (product_count: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{product_count}</div>;
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
							disabled={!features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE")}
							checked={status}
							onChange={(e: any) => editStatus(e, record)}
						/>
					</div>
				);
			}
		}
	];
};

export const columnsCate2 = ({ editStatus, changeIndex, arrayIndex, features }: any) => {
	return [
		Table.EXPAND_COLUMN,

		{
			title: "Danh mục",
			dataIndex: "category_name",
			key: "category_name",
			className: "expandCategory",
			render: (category_name: string, record: any, index: number) => {
				return features.includes("MODULE_PRODUCTS__CATEGORIES__VIEW_DETAIL") ? (
					<>
						<>
							<Image
								src={record?.category_image ? `${API_URL_CDN}${record?.category_image}` : NoImage}
								alt="category"
								style={{ width: "40px", height: "40px", objectFit: "cover" }}
							/>
							&nbsp;
						</>

						<Link to={`${routerNames.CATEGORIES_EDIT}/${record.id}`}>{category_name}</Link>
					</>
				) : (
					<div>
						<>
							<Image
								src={record?.category_image ? `${API_URL_CDN}${record?.category_image}` : NoImage}
								alt="category"
								style={{ width: "40px", height: "40px", objectFit: "cover" }}
							/>
							&nbsp;
						</>
						{category_name}
					</div>
				);
			}
		},

		{
			title: "URL",
			dataIndex: "url",
			key: "url",
			render: (url: string, record: any, index: number) => {
				return <div>{url}</div>;
			}
		},
		{
			title: "Số lượng sản phẩm",
			dataIndex: "product_count",
			key: "product_count",
			align: "right",
			render: (product_count: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{product_count}</div>;
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
							disabled={!features.includes("MODULE_PRODUCTS__CATEGORIES__UPDATE")}
							checked={status}
							onChange={(e: any) => editStatus(e, record)}
						/>
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
