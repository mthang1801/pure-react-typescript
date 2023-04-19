import { Form } from "antd";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertDatetime, convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";
import { Container } from "../styles/CreateCustomer.styles";

const CustomerPurchaseInfo = ({ form, customer }: any) => {
	console.log("customer", customer);
	return (
		<div>
			<h4 className="customers__edit__body__title">Thông tin khách hàng</h4>
			<div className="customers__edit__body__right-side__purchase">
				<label className="customers__edit__body__right-side__purchase__label">Tổng tiền mua hàng (vnđ)</label>
				<div className="customers__edit__body__right-side__purchase__value">
					{customer.total_money_purchased_amount ? convertNumberWithCommas(customer.total_money_purchased_amount) : 0}
				</div>
			</div>
			<div className="customers__edit__body__right-side__purchase">
				<label className="customers__edit__body__right-side__purchase__label">Số lần mua hàng</label>
				<div className="customers__edit__body__right-side__purchase__value">
					{customer.total_orders_purchased_amount ? convertNumberWithCommas(customer.total_orders_purchased_amount) : 0}
				</div>
			</div>

			<div className="customers__edit__body__right-side__purchase__date">
				<label className="customers__edit__body__right-side__purchase__label">Ngày mua gần nhất</label>
				<div className="customers__edit__body__right-side__purchase__value">
					{customer.last_purchased_amount ? ISO8601Formats(customer.last_purchased_amount) : "-"}
				</div>
			</div>
		</div>
	);
};

export default CustomerPurchaseInfo;
