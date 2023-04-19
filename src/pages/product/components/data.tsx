import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Image, InputNumber } from "antd";
import { SortableHandle } from "react-sortable-hoc";
import SvgBin from "src/assets/svg/SvgBin";
import DIcon from "src/components/icons/DIcon";
import { API_URL_CDN } from "src/services/api/config";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsHistoryData = () => {
	return [
		{
			title: "Hành động",
			dataIndex: "log_type_name",
			key: "log_type_name",
			render: (log_type_name: string, record: any, index: number) => {
				return (
					<div>
						{log_type_name} - {record?.module_name}{" "}
					</div>
				);
			}
		},
		{
			title: "Người thực hiện",
			dataIndex: "handled_name",
			key: "handled_name",

			render: (handled_name: string, record: any, index: number) => {
				return <div>{handled_name}</div>;
			}
		},
		{
			title: "Ngày cập nhật",
			dataIndex: "updatedAt",
			key: "updatedAt",
			align: "right",
			render: (updatedAt: any, record: any, index: number) => {
				return <div>{ISO8601Formats(updatedAt)}</div>;
			}
		}
	];
};

export const DragHandle = SortableHandle(({ active }: any) => (
	<div style={{ cursor: "grab" }}>
		<DIcon icon="sixDot" />
	</div>
));

export const columnsChildrenProductsData = ({
	pushThumbnail,
	removeChildrenProduct,
	setValueCallback,
	deleteImageCallback,
	visibleImageCallback
}: any) => {
	return [
		{
			title: "",
			dataIndex: "sort",
			width: 30,
			className: "drag-visible",
			render: () => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<DragHandle />
					</div>
				);
			}
		},
		{
			title: "Thumbnail",
			dataIndex: "thumbnail",
			key: "thumbnail",
			render: (thumbnail: string, record: any, index: number) => {
				return thumbnail.length > 0 ? (
					<div className="thumbnailImage">
						<div className="thumbnailImage__overplay">
							<div style={{ margin: "0 10px" }} onClick={() => visibleImageCallback(thumbnail)}>
								<EyeOutlined color="#fff" />
							</div>
							<div style={{ margin: "0 10px" }} onClick={() => deleteImageCallback(record.index)}>
								<DeleteOutlined />
							</div>
						</div>
						<img src={`${API_URL_CDN}/${thumbnail}`} alt={thumbnail} />
					</div>
				) : (
					<div style={{ border: "1px dotted #000", borderRadius: "5px", width: "100px", height: "100px" }}>
						<label
							htmlFor={`uploadThumbnail${index}`}
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "12px"
							}}
						>
							Upload ảnh
						</label>
						<input
							type="file"
							id={`uploadThumbnail${index}`}
							style={{ display: "none" }}
							onChange={(e: any) => pushThumbnail(e, record.index)}
						/>
					</div>
				);
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product_name",
			key: "product_name",

			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<div>
							<span style={{ color: "rgb(142,142,142)" }}>Tên sản phẩm:</span> {product_name}-{record.value}
						</div>
						<div>
							<span style={{ color: "rgb(142,142,142)" }}>SKU:</span> {record.sku}
						</div>
						<div>
							<span style={{ color: "rgb(142,142,142)" }}>Barcode:</span> {record.barcode}
						</div>
					</>
				);
			}
		},

		{
			title: "Giá bán lẻ",
			dataIndex: "retail_price",
			key: "retail_price",
			align: "right",
			render: (retail_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={retail_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("retail_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},
		{
			title: "Giá bán sỉ",
			dataIndex: "wholesale_price",
			key: "wholesale_price",
			align: "right",
			render: (wholesale_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={wholesale_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("wholesale_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},
		{
			title: "Giá nhập hàng",
			dataIndex: "import_price",
			key: "import_price",
			align: "right",
			render: (import_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={import_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("import_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},
		{
			title: "Giá thu lại",
			dataIndex: "return_price",
			key: "return_price",
			align: "right",

			render: (return_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={return_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("return_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},

		{
			title: "Thao tác",
			dataIndex: "",
			key: "",
			align: "center",
			render: (desc: string, record: any, index: number) => {
				return (
					<div onClick={() => removeChildrenProduct(record.index)}>
						<SvgBin fill="#000" />
					</div>
				);
			}
		}
	];
};

export const columnsChildrenProductsDataEdit = ({
	pushThumbnail,
	removeChildrenProduct,
	setValueCallback,
	deleteImageCallback,
	visibleImageCallback
}: any) => {
	return [
		{
			title: "",
			dataIndex: "sort",
			width: 30,
			className: "drag-visible",
			render: () => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<DragHandle />
					</div>
				);
			}
		},
		{
			title: "Thumbnail",
			dataIndex: "thumbnail",
			key: "thumbnail",
			render: (thumbnail: string, record: any, index: number) => {
				return thumbnail.length > 0 ? (
					<div className="thumbnailImage">
						<div className="thumbnailImage__overplay">
							<div style={{ margin: "0 10px" }} onClick={() => visibleImageCallback(thumbnail)}>
								<EyeOutlined color="#fff" />
							</div>
							<div style={{ margin: "0 10px" }} onClick={() => deleteImageCallback(record.index)}>
								<DeleteOutlined />
							</div>
						</div>
						<img src={`${API_URL_CDN}/${thumbnail}`} alt={thumbnail} />
					</div>
				) : (
					<div style={{ border: "1px dotted #000", borderRadius: "5px", width: "100px", height: "100px" }}>
						<label
							htmlFor={`uploadThumbnail${index}`}
							style={{
								display: "flex",
								width: "100%",
								height: "100%",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "12px"
							}}
						>
							Upload ảnh
						</label>
						<input
							type="file"
							id={`uploadThumbnail${index}`}
							style={{ display: "none" }}
							onChange={(e: any) => pushThumbnail(e, record.index)}
						/>
					</div>
				);
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product_name",
			key: "product_name",

			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<div>
							<span style={{ color: "rgb(142,142,142)" }}>Tên sản phẩm:</span> {product_name}-{record.value}
						</div>
						<div>
							<span style={{ color: "rgb(142,142,142)" }}>SKU:</span> {record.sku}
						</div>
						<div>
							<span style={{ color: "rgb(142,142,142)" }}>Barcode:</span> {record.barcode}
						</div>
					</>
				);
			}
		},

		{
			title: "Giá bán lẻ",
			dataIndex: "retail_price",
			key: "retail_price",
			align: "right",
			render: (retail_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={retail_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("retail_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},
		{
			title: "Giá bán sỉ",
			dataIndex: "wholesale_price",
			key: "wholesale_price",
			align: "right",
			render: (wholesale_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={wholesale_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("wholesale_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},
		{
			title: "Giá nhập hàng",
			dataIndex: "import_price",
			key: "import_price",
			align: "right",
			render: (import_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={import_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("import_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		},
		{
			title: "Giá thu lại",
			dataIndex: "return_price",
			key: "return_price",
			align: "right",

			render: (return_price: number, record: any, index: number) => {
				return (
					<InputNumber
						className="defaultInputNumber"
						min={0}
						max={10000000000}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						value={return_price}
						onBlur={(e: any) =>
							Number(e.target.value.replace(/(,*)/g, ""))
								? setValueCallback("return_price", e.target.value.replace(/(,*)/g, ""), record.index)
								: e.preventDefault()
						}
					/>
				);
			}
		}
	];
};
export const columnsGroupData = () => {
	return [
		{
			title: "Ảnh",
			dataIndex: "scheduler_id",
			key: "scheduler_id",
			render: (scheduler_id: string, record: any, index: number) => {
				return <div>{scheduler_id}</div>;
			}
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "scheduler_interval",
			key: "scheduler_interval",

			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{scheduler_interval}</div>;
			}
		},
		{
			title: "Tên giá trị",
			dataIndex: "desc",
			key: "desc",
			align: "right",
			render: (desc: string, record: any, index: number) => {
				return <div>{desc}</div>;
			}
		},
		{
			title: "Tồn kho",
			dataIndex: "scheduler_id",
			key: "scheduler_id",
			align: "right",
			render: (scheduler_id: string, record: any, index: number) => {
				return <div>{scheduler_id}</div>;
			}
		},
		{
			title: "Giá bán",
			dataIndex: "scheduler_interval",
			key: "scheduler_interval",
			align: "right",
			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{scheduler_interval}</div>;
			}
		},
		{
			title: "Thao tác",
			dataIndex: "desc",
			key: "desc",
			align: "center",
			render: (desc: string, record: any, index: number) => {
				return <div>{desc}</div>;
			}
		}
	];
};

export const columnsChildData = () => {
	return [
		{
			title: "Ảnh",
			dataIndex: "scheduler_id",
			key: "scheduler_id",
			render: (scheduler_id: string, record: any, index: number) => {
				return <div>{scheduler_id}</div>;
			}
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "scheduler_interval",
			key: "scheduler_interval",

			render: (scheduler_interval: string, record: any, index: number) => {
				return <div>{scheduler_interval}</div>;
			}
		},
		{
			title: "Đơn giá (vnđ)",
			dataIndex: "desc",
			key: "desc",
			align: "right",
			render: (desc: string, record: any, index: number) => {
				return <div>{desc}</div>;
			}
		},
		{
			title: "Số lượng",
			dataIndex: "scheduler_id",
			key: "scheduler_id",
			align: "right",
			render: (scheduler_id: string, record: any, index: number) => {
				return <div>{scheduler_id}</div>;
			}
		},

		{
			title: "Trạng thái",
			dataIndex: "desc",
			key: "desc",
			align: "center",
			render: (desc: string, record: any, index: number) => {
				return <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{desc}</div>;
			}
		}
	];
};
