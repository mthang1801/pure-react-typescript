import { Image, Input, InputNumber, Popover, Switch } from "antd";
import NoImage from "src/assets/images/no-image.jpg";
import SvgBin from "src/assets/svg/SvgBin";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgIcon3Dot from "src/assets/svg/SvgIcon3Dot";
import SvgIconCancel from "src/assets/svg/SvgIconCancel";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";
import { API_URL_CDN } from "src/services/api/config";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsCoupon = ({ editCallback, changeStatusCouponCode, removeCouponCode }: any) => {
	return [
		{
			title: "Mã coupon",
			dataIndex: "coupon_detail_code",
			key: "coupon_detail_code",
			render: (coupon_detail_code: string, record: any, index: number) => {
				return <div>{coupon_detail_code}</div>;
			}
		},
		{
			title: "Ngày tạo",
			dataIndex: "shipping_unit",
			key: "shipping_unit",
			render: (shipping_unit: string, record: any, index: number) => {
				return <div>{"-"}</div>;
			}
		},
		{
			title: "Đã dùng",
			dataIndex: "used",
			key: "used",
			align: "right",
			render: (used: string, record: any, index: number) => {
				return <div>{"-"}</div>;
			}
		},
		{
			title: "Còn lại",
			dataIndex: "remain",
			key: "remain",
			align: "right",
			render: (remain: string, record: any, index: number) => {
				return <div>{remain && convertNumberWithCommas(remain)}</div>;
			}
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: any, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						<Switch checked={status} onChange={(e: any) => changeStatusCouponCode(e, record)} />
					</div>
				);
			}
		},
		{
			title: "Thao tác",
			dataIndex: "shipping_unit_id",
			key: "shipping_unit_id",
			align: "center",

			render: (shipping_unit_id: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<div
							onClick={() => removeCouponCode(record)}
							style={{
								border: "1px solid rgb(212,212,212)",
								borderRadius: "2px",
								width: "24px",
								height: "24px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer"
							}}
						>
							<SvgBin fill="rgb(212,212,212)" style={{ transform: "scale(0.8)" }} />
						</div>
					</div>
				);
			}
		}
	];
};

export const columnsListProduct = ({ editCallback, changeStatus }: any) => {
	return [
		{
			title: "Ảnh",
			dataIndex: "thumbnail",
			key: "thumbnail",
			render: (thumbnail: string, record: any, index: number) => {
				return (
					<Image
						style={{ height: "80px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
						alt={record?.thumbnail}
						src={thumbnail ? `${API_URL_CDN}${record?.thumbnail}` : NoImage}
						preview={{ className: "modalImage" }}
					/>
				);
			}
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<div>{product_name}</div>
						<div style={{ fontSize: "12px" }}>
							<p style={{ margin: "0" }}>SKU:&nbsp;{record.sku}</p>
							<p style={{ margin: "0" }}>Barcode:&nbsp;{record.barcode}</p>
						</div>
					</>
				);
			}
		}
	];
};

export const columnsApplyProduct = ({ removeAdd, handleChangeValue }: any) => {
	return [
		{
			title: "Ảnh",
			dataIndex: "thumbnail",
			key: "thumbnail",
			render: (thumbnail: string, record: any, index: number) => {
				return (
					<Image
						style={{ height: "80px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
						alt={record?.thumbnail}
						src={thumbnail ? `${API_URL_CDN}${record?.thumbnail}` : NoImage}
						preview={{ className: "modalImage" }}
					/>
				);
			}
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
			render: (product_name: string, record: any, index: number) => {
				return (
					<>
						<div> {product_name}</div>

						<div style={{ fontSize: "12px" }}>
							<p style={{ margin: "0" }}>SKU:&nbsp;{record.sku}</p>
							<p style={{ margin: "0" }}>Barcode:&nbsp;{record.barcode}</p>
						</div>
					</>
				);
			}
		},
		{
			title: "Số lượng SP tối thiểu trong đơn",
			dataIndex: "value",
			key: "value",
			align: "right",
			render: (value: string, record: any, index: number) => {
				return (
					<InputNumber
						min={0}
						max={1000000000}
						defaultValue={0}
						value={value}
						onChange={(e: any) => handleChangeValue(e, record)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
						parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
						className="defaultInputNumber"
					/>
				);
			}
		},
		{
			title: "Thao tác",
			dataIndex: "shipping_unit_id",
			key: "shipping_unit_id",
			align: "center",
			render: (shipping_unit_id: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<div
							onClick={() => removeAdd(record)}
							style={{
								border: "1px solid rgb(212,212,212)",
								borderRadius: "2px",
								width: "24px",
								height: "24px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer"
							}}
						>
							<SvgBin fill="rgb(212,212,212)" style={{ transform: "scale(0.8)" }} />
						</div>
					</div>
				);
			}
		}
	];
};

export const columnsApplyCategory = ({ removeAdd, handleChangeValue }: any) => {
	return [
		{
			title: "Ảnh",
			dataIndex: "category_image",
			key: "category_image",
			align: "center",
			render: (category_image: string, record: any, index: number) => {
				return (
					<Image
						style={{ height: "80px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
						alt={record?.category_image}
						src={category_image ? `${API_URL_CDN}${record?.category_image}` : NoImage}
						preview={{ className: "modalImage" }}
					/>
				);
			}
		},
		{
			title: "Tên danh mục",
			dataIndex: "category_name",
			key: "category_name",
			render: (category_name: string, record: any, index: number) => {
				return <div>{category_name}</div>;
			}
		},
		{
			title: "Số lượng SP tối thiểu trong đơn",
			dataIndex: "value",
			key: "value",
			align: "right",
			render: (value: string, record: any, index: number) => {
				return (
					<InputNumber
						min={0}
						max={1000000000}
						defaultValue={0}
						value={value}
						onChange={(e: any) => handleChangeValue(e, record)}
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
						parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
						className="defaultInputNumber"
					/>
				);
			}
		},
		{
			title: "Thao tác",
			dataIndex: "shipping_unit_id",
			key: "shipping_unit_id",
			align: "center",
			render: (shipping_unit_id: string, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<div
							onClick={() => removeAdd(record)}
							style={{
								border: "1px solid rgb(212,212,212)",
								borderRadius: "2px",
								width: "24px",
								height: "24px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer"
							}}
						>
							<SvgBin fill="rgb(212,212,212)" style={{ transform: "scale(0.8)" }} />
						</div>
					</div>
				);
			}
		}
	];
};

export const columnsData = ({ editCallback, deleteCallback, editInfo }: any) => {
	return [
		{
			title: "Logo",
			dataIndex: "logo",
			key: "logo",
			render: (logo: string, record: any, index: number) => {
				return <Image src={logo} alt="Logo" width="100px" height="100px" />;
			}
		},
		{
			title: "Đơn vị vận chuyển",
			dataIndex: "shipping_unit",
			key: "shipping_unit",
			render: (shipping_unit: string, record: any, index: number) => {
				return <div>{shipping_unit}</div>;
			}
		},
		{
			title: "ID đơn vị vận chuyển",
			dataIndex: "shipping_unit_id",
			key: "shipping_unit_id",
			render: (shipping_unit_id: string, record: any, index: number) => {
				return <div>{shipping_unit_id}</div>;
			}
		},
		{
			title: "Trạng thái kết nối",
			dataIndex: "connect_status",
			key: "connect_status",
			align: "center",
			render: (connect_status: any, record: any, index: number) => {
				return (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%"
						}}
					>
						{connect_status === true ? (
							<div className="defaultButton">
								<SvgPaymentComplete style={{ transform: "scale(0.8)" }} />
								&nbsp;Đã kết nối
							</div>
						) : (
							<div className="searchButton" onClick={() => editCallback(record)}>
								<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
								&nbsp;Kết nối
							</div>
						)}
					</div>
				);
			}
		},
		{
			title: "Thao tác",
			dataIndex: null,
			key: null,
			align: "center",
			render: (status: boolean, record: any, index: number) => {
				return (
					<Popover content={content({ editCallback, record, deleteCallback, editInfo })} trigger="hover">
						<SvgIcon3Dot fill="rgb(212,212,212)" />
					</Popover>
				);
			}
		}
	];
};

const content = ({ editCallback, record, deleteCallback, editInfo }: any) => {
	return (
		<div style={{ padding: "8px" }}>
			{record?.connect_status ? (
				<>
					<p
						style={{ cursor: "pointer", margin: "0", display: "flex", alignItems: "center" }}
						onClick={() => editInfo(record)}
					>
						<span style={{ width: "25px", marginTop: "4px" }}>
							<SvgEdit style={{ transform: "scale(0.6)" }} />
						</span>
						&nbsp;Thông tin kết nối
					</p>
					<p
						style={{ cursor: "pointer", margin: "0", display: "flex", alignItems: "center" }}
						onClick={() => deleteCallback(record)}
					>
						<span style={{ width: "25px", marginTop: "4px" }}>
							<SvgIconCancel style={{ transform: "scale(0.7)" }} />
						</span>
						&nbsp;Ngắt kết nối
					</p>
				</>
			) : (
				<p style={{ cursor: "pointer", margin: "0" }} onClick={() => editCallback(record)}>
					Kết nối
				</p>
			)}
		</div>
	);
};
