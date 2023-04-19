import { Image, Popover, Switch } from "antd";
import { Link } from "react-router-dom";
import NoImage from "src/assets/images/no-image.jpg";
import DIcon from "src/components/icons/DIcon";
import { PRODUCT_LEVEL } from "src/constants";
import { API_URL_CDN } from "src/services/api/config";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertNumberWithCommas, convertNumberWithDot } from "src/utils/helpers/functions/textUtils";

export const columnsData = () => {
	const productLevelContent = (label: string) => <div className="p-3">{label}</div>;

	return [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			render: (id: string, record: any, index: number) => {
				return <div className="text-center">{record?.id}</div>;
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
							style={{ height: "40px", width: "auto", objectFit: "cover" }}
							alt={record?.thumbnail}
							src={record?.thumbnail ? `${API_URL_CDN}${record?.thumbnail}` : NoImage}
						/>
					</div>
				);
			}
		},
		// {
		// 	title: "Cấp bậc SP",
		// 	dataIndex: "product_level",
		// 	key: "product_level",
		// 	width: "8%",
		// 	render: (product_level: string, record: any, index: number) => {
		// 		const productLevel: any = PRODUCT_LEVEL.find((item) => item.product_level === product_level);
		// 		return (
		// 			<div className="flex justify-center relative">
		// 				<Popover placement="top" content={productLevelContent(productLevel.label)} trigger="click">
		// 					<DIcon icon={productLevel.icon} />
		// 				</Popover>
		// 			</div>
		// 		);
		// 	}
		// },
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<Link
							to={() => ({
								pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
							})}
						>
							{record?.product_name}
						</Link>
						<div style={{ fontSize: "12px" }}>
							<p style={{ margin: "0" }}>SKU:&nbsp;{record?.sku}</p>
							<p style={{ margin: "0" }}>Barcode:&nbsp;{record?.barcode}</p>
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
					<div style={{ textAlign: "right" }}>
						{record?.retail_price ? convertNumberWithCommas(record?.retail_price?.toString()) : "-"}
					</div>
				);
			}
		},
		{
			title: "Giá niêm yết (vnđ)",
			dataIndex: "wholesale_price",
			key: "wholesale_price",
			align: "right",
			render: (wholesale_price: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "right" }}>
						{record?.wholesale_price ? convertNumberWithCommas(record?.wholesale_price?.toString()) : "-"}
					</div>
				);
			}
		},
		{
			title: "Tồn thực",
			dataIndex: "qty",
			key: "qty",
			align: "right",
			render: (qty: string, record: any, index: number) => {
				return (
					<div style={{ textAlign: "right" }}>{record?.qty ? convertNumberWithDot(record?.qty?.toString()) : "-"}</div>
				);
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
						{record?.virtual_stock_quantity ? convertNumberWithDot(record?.virtual_stock_quantity?.toString()) : "-"}
					</div>
				);
			}
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date, record: any, index: number) => {
				return <div>{ISO8601Formats(record?.createdAt)}</div>;
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
