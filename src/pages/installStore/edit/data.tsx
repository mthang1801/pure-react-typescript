import { Switch } from "antd";
import SvgBin from "src/assets/svg/SvgBin";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

export const columnsData = ({ deleteProduct }: any) => {
	return [
		{
			title: "SKU",
			dataIndex: "sku",
			key: "sku",
			render: (sku: string, record: any, index: number) => {
				return <div>{sku}</div>;
			}
		},
		{
			title: "Sản phẩm",
			dataIndex: "product",
			key: "product",
			render: (product: string, record: any, index: number) => {
				return <div>{product}</div>;
			}
		},

		{
			title: "Số lượng",
			dataIndex: "qty",
			key: "qty",
			align: "right",

			render: (qty: string, record: any, index: number) => {
				return <div>{qty}</div>;
			}
		},
		{
			title: "Đơn giá (vnđ)",
			dataIndex: "price",
			key: "price",
			align: "right",

			render: (price: string, record: any, index: number) => {
				return <div>{price && convertNumberWithCommas(price.toString())}</div>;
			}
		},
		{
			title: "Tổng tiền (vnđ)",
			dataIndex: "qty",
			key: "qty",
			align: "right",
			render: (qty: string, record: any, index: number) => {
				return (
					<div>
						{record.qty &&
							record.price &&
							convertNumberWithCommas((Number(record.price) * Number(record.qty)).toString())}
					</div>
				);
			}
		}
	];
};
