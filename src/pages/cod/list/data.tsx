import { Switch } from "antd";
import { Link } from "react-router-dom";
import SvgPaymentComplete from "src/assets/svg/SvgPaymentComplete";
import colors from "src/utils/colors";
import routerNames from "src/utils/data/routerName";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = () => {
	return [
		{
			title: "Mã phiếu",
			dataIndex: "bill_code",
			key: "bill_code",
			render: (bill_code: string, record: any, index: number) => {
				return <Link to={`${routerNames.COD_EDIT}/${record.id}`}>{bill_code}</Link>;
			}
		},
		{
			title: "Đối tác vận chuyển",
			dataIndex: "shipping_unit",
			key: "shipping_unit",
			render: (shipping_unit: any, record: any, index: number) => {
				return <div>{shipping_unit?.shipping_unit}</div>;
			}
		},

		{
			title: "TT đối soát",
			dataIndex: "for_control_status",
			key: "for_control_status",
			align: "center",
			render: (for_control_status: any, record: any, index: number) => {
				return (
					<div
						style={{
							color: "#fff",
							background:
								for_control_status === 1 ? "rgb(0,117,164)" : for_control_status === 2 ? "#38c173" : "rgb(225,43,48)",
							borderRadius: "16px",
							padding: "0px 9px",
							textAlign: "center",
							minWidth: "140px",
							display: "inline-block"
						}}
					>
						{for_control_status === 1 ? "Đang đối soát " : for_control_status === 2 ? "Đã đối soát" : "Đã huỷ"}
					</div>
				);
			}
		},
		{
			title: "TT thanh toán",
			dataIndex: "payment_status",
			key: "payment_status",
			align: "center",

			render: (payment_status: any, record: any, index: number) => {
				return (
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						{payment_status === 1 ? (
							<div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #000" }} />
						) : (
							<SvgPaymentComplete />
						)}{" "}
					</div>
				);
			}
		},
		{
			title: "SL vận đơn",
			dataIndex: "quantity",
			key: "quantity",
			align: "right",
			render: (quantity: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{quantity}</div>;
			}
		},
		{
			title: "Tiền COD (vnđ)",
			dataIndex: "cod",
			key: "cod",
			align: "right",
			render: (cod: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{cod ? convertNumberWithCommas(cod) : "-"}</div>;
			}
		},
		{
			title: "Tiền cước (vnđ)",
			dataIndex: "shipping_fee",
			key: "shipping_fee",
			align: "right",
			render: (shipping_fee: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{shipping_fee ? convertNumberWithCommas(shipping_fee) : "-"}</div>;
			}
		},
		{
			title: "Công nợ (vnđ)",
			dataIndex: "total_amount",
			key: "total_amount",
			align: "right",
			render: (total_amount: string, record: any, index: number) => {
				return <div style={{ textAlign: "right" }}>{total_amount ? convertNumberWithCommas(total_amount) : "-"}</div>;
			}
		},
		{
			title: "Ngày đối soát",
			dataIndex: "verified_at",
			key: "verified_at",
			render: (verified_at: any, record: any, index: number) => {
				return <div>{verified_at ? ISO8601Formats(verified_at) : "-"}</div>;
			}
		}
	];
};
