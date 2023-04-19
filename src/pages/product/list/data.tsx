import { Image, Popover, Switch } from "antd";
import { Link } from "react-router-dom";
import NoImage from "src/assets/images/no-image.jpg";
import DIcon from "src/components/icons/DIcon";
import { PRODUCT_LEVEL } from "src/constants";
import { API_URL_CDN } from "src/services/api/config";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import {
	convertNumberWithCommas,
	convertNumberWithDot,
	convertNumberWithDotChange
} from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ changeStatus, features }: any) => {
	const productLevelContent = (label: string) => <div className="p-3">{label}</div>;

	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			render: (id: string, record: any, index: number) => {
				return <div className="text-center">{id}</div>;
			}
		},
		{
			title: "Hình ảnh",
			dataIndex: "thumbnail",
			key: "thumbnail",
			render: (thumbnail: string, record: any, index: number) => {
				return (
					<div className="w-full flex justify-center">
						<Image
							style={{ height: "80px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
							alt={record?.thumbnail}
							src={thumbnail ? `${API_URL_CDN}${record?.thumbnail}` : NoImage}
							preview={{ className: "modalImage" }}
						/>
					</div>
				);
			}
		},
		{
			title: "Cấp bậc",
			dataIndex: "product_level",
			key: "product_level",
			width: "8%",
			align: "center",
			render: (product_level: string, record: any, index: number) => {
				const productLevel: any = PRODUCT_LEVEL.find((item) => item.product_level === product_level);
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Popover placement="top" content={productLevelContent(productLevel.label)} trigger="click">
							<DIcon icon={productLevel.icon} />
						</Popover>
					</div>
				);
			}
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			width: "auto",
			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						{features.includes("MODULE_PRODUCTS__LIST__VIEW_DETAIL") ? (
							<Link
								to={() => ({
									pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
								})}
							>
								{product_name}
							</Link>
						) : (
							<div> {product_name}</div>
						)}

						<div style={{ fontSize: "12px" }}>
							<p style={{ margin: "0" }}>SKU:&nbsp;{record.sku}</p>
							<p style={{ margin: "0" }}>Barcode:&nbsp;{record.barcode}</p>
						</div>
					</>
				);
			}
		},
		{
			title: "Giá bán (vnđ)",
			dataIndex: "retail_price",
			key: "retail_price",
			align: "right",
			render: (retail_price: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "right" }}>{retail_price && convertNumberWithCommas(retail_price.toString())}</div>
				);
			}
		},
		{
			title: "Giá niêm yết (vnđ)",
			dataIndex: "import_price",
			key: "import_price",
			align: "right",
			render: (import_price: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "right" }}>{import_price && convertNumberWithCommas(import_price.toString())}</div>
				);
			}
		},
		{
			title: "Tồn thực",
			dataIndex: "stock_quantity",
			key: "stock_quantity",
			align: "right",
			render: (stock_quantity: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{stock_quantity ? convertNumberWithDot(stock_quantity) : "-"}</div>;
			}
		},
		{
			title: "Tồn khả dụng",
			dataIndex: "virtual_stock_quantity",
			key: "virtual_stock_quantity",
			align: "right",
			render: (virtual_stock_quantity: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "right" }}>
						{virtual_stock_quantity ? convertNumberWithDot(virtual_stock_quantity) : "-"}
					</div>
				);
			}
		},
		// {
		// 	title: "Ngày tạo",
		// 	dataIndex: "createdAt",
		// 	key: "createdAt",
		// 	render: (createdAt: Date, record: any, index: number) => {
		// 		return <div>{ISO8601Formats(createdAt)}</div>;
		// 	}
		// },
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				console.log("1", features.includes("MODULE_PRODUCTS__LIST__UPDATE"));
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						<Switch
							checked={status}
							onChange={(e: any) => changeStatus(e, record)}
							disabled={!features.includes("MODULE_PRODUCTS__LIST__UPDATE")}
						/>
					</div>
				);
			}
		}
	];
};

export const defaultSearchFilter = {
	q: undefined,
	status: undefined,
	product_status: undefined,
	page: 1,
	limit: 10
};
