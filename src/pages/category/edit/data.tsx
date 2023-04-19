import { Image, Popover, Switch } from "antd";
import { Link } from "react-router-dom";
import NoImage from "src/assets/images/no-image.jpg";
import DIcon from "src/components/icons/DIcon";
import { PRODUCT_LEVEL } from "src/constants";
import { API_URL_CDN } from "src/services/api/config";
import routerNames from "src/utils/data/routerName";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsDataProducts = ({ onChangeStatus }: any) => {
	const productLevelContent = (label: string) => <div className="p-3">{label}</div>;

	return [
		{
			title: "Loại",
			dataIndex: "product_level",
			key: "product_level",
			align: "center",
			render: (product_level: string, record: any, index: number) => {
				const productLevel: any = PRODUCT_LEVEL.find((item) => item?.product_level === product_level);
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Popover placement="top" content={productLevelContent(productLevel?.label)} trigger="click">
							<DIcon icon={productLevel?.icon} />
						</Popover>
					</div>
				);
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
							src={thumbnail ? `${API_URL_CDN}${record?.thumbnail}` : NoImage}
						/>
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
						<Link
							to={() => ({
								pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
							})}
						>
							{product_name}
						</Link>
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
			dataIndex: "wholesale_price",
			key: "wholesale_price",
			align: "right",
			render: (wholesale_price: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{wholesale_price && convertNumberWithCommas(wholesale_price)}</div>;
			}
		},
		{
			title: "Số lượng",
			dataIndex: "stock_quantity",
			key: "stock_quantity",
			align: "right",
			render: (stock_quantity: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{convertNumberWithCommas(stock_quantity)}</div>;
			}
		}
		// {
		// 	title: "Trạng thái",
		// 	dataIndex: "status",
		// 	key: "status",
		// 	align: "center",
		// 	render: (status: boolean, record: any, index: number) => {
		// 		return (
		// 			<div
		// 				style={{
		// 					display: "flex",
		// 					alignItems: "center",
		// 					justifyContent: "center",
		// 					width: "100%"
		// 				}}
		// 			>
		// 				<Switch checked={status} onChange={(e: any) => onChangeStatus(e, record.id)} />
		// 			</div>
		// 		);
		// 	}
		// }
	];
};

export const columnsDataAddProducts = () => {
	return [
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
							src={thumbnail ? `${API_URL_CDN}${record?.thumbnail}` : NoImage}
						/>
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
						<Link
							to={() => ({
								pathname: `${routerNames.PRODUCT_EDIT}/${record?.id}`
							})}
						>
							{product_name}
						</Link>
						<div style={{ fontSize: "12px" }}>
							<p style={{ margin: "0" }}>SKU:&nbsp;{record.sku}</p>
							<p style={{ margin: "0" }}>Barcode:&nbsp;{record.barcode}</p>
						</div>
					</>
				);
			}
		},
		{
			title: "Tồn kho",
			dataIndex: "stock_quantity",
			key: "stock_quantity",
			align: "right",
			render: (stock_quantity: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{convertNumberWithCommas(stock_quantity)}</div>;
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
		}
	];
};
