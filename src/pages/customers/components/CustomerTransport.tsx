import { CheckCircleFilled, DeleteFilled, PlusCircleOutlined } from "@ant-design/icons";
import SvgEdit from "src/assets/svg/SvgEdit";
import { joinIntoAddress } from "src/utils/helpers/functions/textUtils";

const CustomerTransport = ({
	transportFormsList,
	setOpenTransportModal,
	onEditTransportItem,
	setIsEdit,
	onRemoveTransportItem
}: any) => {
	const onOpenTransportModal = () => {
		setIsEdit(false);
		setOpenTransportModal(true);
	};
	const onEditTransport = (id: any) => {
		setIsEdit(true);
		onEditTransportItem(id);
	};
	return (
		<>
			<h4 className="customers__edit__body__title" style={{ marginTop: "8px" }}>
				Địa chỉ giao hàng
			</h4>
			<div className="customers__edit__body__right-side__button" onClick={onOpenTransportModal}>
				<PlusCircleOutlined />
				<span style={{ marginLeft: "6px" }}>Thêm địa chỉ nhận hàng</span>
			</div>
			{transportFormsList?.length
				? transportFormsList.map((shippingInfo: any) => (
						<div
							className="customers__edit__body__right-side__transport"
							key={shippingInfo.id}
							onDoubleClick={() => onEditTransport(shippingInfo.id)}
						>
							<div className="customers__edit__body__right-side__transport__item">
								<div>
									<div>
										<span className="customers__edit__body__right-side__transport__item__fullname">
											{shippingInfo.fullname}
										</span>
										<span className="customers__edit__body__right-side__transport__item__text">
											| {shippingInfo.phone}
										</span>
										{shippingInfo.default === true ? (
											<span className="customers__edit__body__right-side__transport__item__default">
												<CheckCircleFilled />
												<span>Địa chỉ mặc định</span>
											</span>
										) : null}
									</div>
									<div className="customers__edit__body__right-side__transport__item__text">
										{shippingInfo?.address}
									</div>
									<div className="customers__edit__body__right-side__transport__item__text">
										{joinIntoAddress(shippingInfo.province_name, shippingInfo.district_name, shippingInfo.ward_name)}
									</div>
								</div>
								<div className="customers__edit__body__right-side__transport__item__button-groups">
									<div
										className="customers__edit__body__right-side__transport__item__button-item"
										onClick={() => onEditTransport(shippingInfo?.id)}
									>
										<SvgEdit style={{ transform: "scale(0.7)" }} fill="#2980B0" />
									</div>
									{/* <div
										onClick={() => onRemoveTransportItem(shippingInfo.id)}
										style={{
											color: "#ADB4BB",
											fontSize: "20px",
											marginBottom: "8px",
											marginLeft: "5px",
											cursor: "pointer"
										}}
									>
										<DeleteFilled />
									</div> */}
								</div>
							</div>
						</div>
				  ))
				: null}
		</>
	);
};
export default CustomerTransport;
